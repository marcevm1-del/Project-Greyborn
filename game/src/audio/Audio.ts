// Procedural audio (WebAudio): every sound is synthesised, positioned in 3D with
// HRTF panners and distance attenuation, and routed through music / sfx buses.
// Side palettes follow gdd/19: Wildborn = wood, rock, breath; Blightborn = glass, chimes.

type Vec = { x: number; y: number; z: number };

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private sfx!: GainNode;
  private music!: GainNode;
  private noise!: AudioBuffer;
  private windGain!: GainNode;
  private musicTimer = 0;
  private intensity = 0;
  private nextNote = 0;
  enabled = true;

  /** Must be called from a user gesture (browser autoplay rules). */
  start() {
    if (this.ctx) { void this.ctx.resume(); return; }
    try {
      this.ctx = new AudioContext();
    } catch {
      this.enabled = false;
      return;
    }
    const c = this.ctx;
    this.master = c.createGain();
    this.sfx = c.createGain();
    this.music = c.createGain();
    const comp = c.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 4;
    this.sfx.connect(this.master); this.music.connect(this.master);
    this.master.connect(comp).connect(c.destination);
    this.noise = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    // ambience: steppe wind (filtered noise with slow gusts)
    const wind = c.createBufferSource();
    wind.buffer = this.noise; wind.loop = true;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 420; bp.Q.value = 0.6;
    this.windGain = c.createGain(); this.windGain.gain.value = 0.05;
    wind.connect(bp).connect(this.windGain).connect(this.sfx);
    wind.start();
    const lfo = c.createOscillator(); lfo.frequency.value = 0.07;
    const lfoGain = c.createGain(); lfoGain.gain.value = 180;
    lfo.connect(lfoGain).connect(bp.frequency); lfo.start();
    this.drone();
  }

  setVolumes(master: number, musicV: number, sfxV: number) {
    if (!this.ctx) return;
    this.master.gain.value = master;
    this.music.gain.value = musicV * 0.6;
    this.sfx.gain.value = sfxV;
  }

  setListener(pos: Vec, forward: Vec) {
    const l = this.ctx?.listener;
    if (!l) return;
    if (l.positionX) {
      l.positionX.value = pos.x; l.positionY.value = pos.y; l.positionZ.value = pos.z;
      l.forwardX.value = forward.x; l.forwardY.value = forward.y; l.forwardZ.value = forward.z;
      l.upX.value = 0; l.upY.value = 1; l.upZ.value = 0;
    } else {
      l.setPosition(pos.x, pos.y, pos.z);
      l.setOrientation(forward.x, forward.y, forward.z, 0, 1, 0);
    }
  }

  setIntensity(v: number) { this.intensity = Math.max(0, Math.min(1, v)); }

  private out(pos: Vec | null, maxDist = 60): AudioNode {
    const c = this.ctx!;
    if (!pos) return this.sfx;
    const p = c.createPanner();
    p.panningModel = 'HRTF';
    p.distanceModel = 'inverse';
    p.refDistance = 4;
    p.maxDistance = maxDist;
    p.rolloffFactor = 1.2;
    p.positionX.value = pos.x; p.positionY.value = pos.y; p.positionZ.value = pos.z;
    p.connect(this.sfx);
    return p;
  }

  private env(g: GainNode, t: number, a: number, peak: number, dec: number) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec);
  }

  private tone(dest: AudioNode, type: OscillatorType, f0: number, f1: number, t: number, dur: number, peak: number) {
    const c = this.ctx!;
    const o = c.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = c.createGain();
    this.env(g, t, 0.005, peak, dur);
    o.connect(g).connect(dest);
    o.start(t); o.stop(t + dur + 0.05);
  }

  private noiseHit(dest: AudioNode, t: number, freq: number, q: number, dur: number, peak: number, type: BiquadFilterType = 'lowpass') {
    const c = this.ctx!;
    const s = c.createBufferSource(); s.buffer = this.noise;
    s.playbackRate.value = 0.8 + Math.random() * 0.4;
    const f = c.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = c.createGain();
    this.env(g, t, 0.003, peak, dur);
    s.connect(f).connect(g).connect(dest);
    s.start(t, Math.random()); s.stop(t + dur + 0.05);
  }

  play(name: string, pos: Vec | null = null, opts: { size?: number; glass?: boolean } = {}) {
    if (!this.ctx || !this.enabled) return;
    const t = this.ctx.currentTime;
    const size = opts.size ?? 1;
    const low = 1 / Math.sqrt(size);
    switch (name) {
      case 'step': {
        const o = this.out(pos, 25 + size * 8);
        this.noiseHit(o, t, 260 * low + 60, 0.7, 0.08 + size * 0.03, 0.18 * Math.min(2, size));
        if (opts.glass && size > 1.5) this.tone(o, 'sine', 900 * low, 880 * low, t, 0.35, 0.02);
        break;
      }
      case 'swing': this.noiseHit(this.out(pos), t, 1800, 0.9, 0.12, 0.12, 'bandpass'); break;
      case 'hit': {
        const o = this.out(pos);
        this.noiseHit(o, t, 900 * low, 0.8, 0.12, 0.35);
        this.tone(o, 'triangle', 160 * low, 60 * low, t, 0.16, 0.3);
        break;
      }
      case 'weak': {
        const o = this.out(pos);
        this.tone(o, 'sine', opts.glass ? 1760 : 1320, opts.glass ? 1700 : 1100, t, 0.25, 0.18);
        this.noiseHit(o, t, 2400, 1.5, 0.08, 0.2, 'bandpass');
        break;
      }
      case 'slam': {
        const o = this.out(pos, 90);
        this.tone(o, 'sine', 90, 32, t, 0.6, 0.7);
        this.noiseHit(o, t, 400, 0.5, 0.5, 0.5);
        break;
      }
      case 'whoosh': this.noiseHit(this.out(pos), t, 700, 0.6, 0.35, 0.22, 'bandpass'); break;
      case 'pickup': {
        const o = this.out(pos, 30);
        this.tone(o, 'sine', 880, 1320, t, 0.12, 0.08);
        this.tone(o, 'sine', 1320, 1760, t + 0.06, 0.12, 0.06);
        break;
      }
      case 'levelup': {
        [523, 659, 784, 1046].forEach((f, i) => this.tone(this.sfx, 'triangle', f, f, t + i * 0.08, 0.35, 0.12));
        break;
      }
      case 'transform': {
        const o = this.out(pos, 120);
        this.tone(o, 'sawtooth', 55, 220, t, 1.4, 0.15);
        this.tone(o, 'sine', 110, 440, t + 0.2, 1.3, 0.2);
        this.noiseHit(o, t + 1.2, 600, 0.5, 0.8, 0.5);
        break;
      }
      case 'capture': {
        const o = this.out(pos, 50);
        if (opts.glass) [1046, 1318, 1568].forEach((f, i) => this.tone(o, 'sine', f, f, t + i * 0.05, 0.6, 0.06));
        else { this.noiseHit(o, t, 300, 3, 0.6, 0.15, 'bandpass'); this.tone(o, 'triangle', 196, 147, t, 0.6, 0.12); }
        break;
      }
      case 'convert': [392, 494, 587, 784, 988].forEach((f, i) => this.tone(this.sfx, 'sine', f, f * 1.01, t + i * 0.07, 0.5, 0.08)); break;
      case 'death': {
        const o = this.out(pos, 70);
        this.tone(o, 'sawtooth', 220 * low, 40, t, 0.9, 0.15);
        this.noiseHit(o, t, 500, 0.5, 0.7, 0.3);
        break;
      }
      case 'evade': this.noiseHit(this.out(pos), t, 1200, 0.8, 0.18, 0.15, 'highpass'); break;
      case 'ui': this.tone(this.sfx, 'sine', 660, 660, t, 0.06, 0.06); break;
      case 'deny': this.tone(this.sfx, 'square', 180, 150, t, 0.12, 0.04); break;
      case 'phase': {
        // Wildborn hear a wooden horn, Blightborn a ringing chime (gdd/06)
        if (opts.glass) [784, 1175, 1568].forEach((f, i) => this.tone(this.sfx, 'sine', f, f, t + i * 0.12, 1.5, 0.08));
        else { this.tone(this.sfx, 'sawtooth', 110, 110, t, 1.6, 0.06); this.tone(this.sfx, 'sine', 220, 218, t, 1.6, 0.1); }
        break;
      }
    }
  }

  /** Generative score: a low drone plus sparse pentatonic plucks; more notes as intensity rises. */
  private drone() {
    const c = this.ctx!;
    [55, 82.4].forEach((f) => {
      const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = f;
      const g = c.createGain(); g.gain.value = 0.05;
      o.connect(g).connect(this.music); o.start();
    });
  }

  tick(dt: number, windiness = 1) {
    if (!this.ctx) return;
    this.windGain.gain.value = 0.035 + windiness * 0.02;
    this.musicTimer += dt;
    if (this.musicTimer < this.nextNote) return;
    const scale = [220, 247, 294, 330, 392, 440, 494, 587];
    const f = scale[Math.floor(Math.random() * scale.length)] * (Math.random() < 0.3 ? 0.5 : 1);
    const t = this.ctx.currentTime;
    this.tone(this.music, 'triangle', f, f, t, 1.8, 0.05 + this.intensity * 0.04);
    this.nextNote = this.musicTimer + (2.6 - this.intensity * 1.8) * (0.6 + Math.random() * 0.8);
  }
}
