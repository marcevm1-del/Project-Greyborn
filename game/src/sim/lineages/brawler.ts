// Brawler (Commit pair): diver and bruiser. Spec 02 §2, Spec 03.
import * as R from '../rules';
import { ability } from '../tuning';
import { applyCC, dealDamage, heal, knockback, power, yawTo } from '../combat';
import { dash, dirOf, targetsIn } from './shared';
import { onRollHit, onRollStart, synergyReady } from './synergies';
import type { LineageDef } from './types';

export const Brawler: LineageDef = {
  name: 'Brawler',
  pair: 'Commit',
  sizeMul: { radius: 1, height: 1 },
  basicRange: 2.5,
  immovable: false,
  chargedSlot: 'E', // Haymaker
  ultimates: { Aggression: 'Frenzy', Tactical: 'Shove of the Storm' },

  // chest plate: front 90°, only for 1.0 s after Roll Commit
  weakPointExposed: (w, _src, tgt, off) => w.time < tgt.chestExposedUntil && off <= Math.PI / 4,
  weakPointLit: (c, time) => time < c.chestExposedUntil,

  // Momentum 100: +15% attack speed; Frenzy: +40%
  attackRateMult(w, c) {
    return (c.momentum >= 100 && R.formForLevel(c.level) >= 1 ? 1.15 : 1) * (w.time < c.ultUntil ? 1.4 : 1);
  },

  onDealtDamage(w, src, _tgt, amount) {
    src.momentum = Math.min(100, src.momentum + 5);
    if (w.time < src.ultUntil) heal(w, src, amount * 0.2); // Frenzy: 20% lifesteal, subject to the healing cap
  },

  // Momentum decays 10/s after 3 s out of combat
  tick(w, c, dt) {
    if (w.time - c.lastCombatAt > 3) c.momentum = Math.max(0, c.momentum - 10 * dt);
  },

  cast(w, c, cast, ctx, dt) {
    const { P, scale, r0, now, dmg } = ctx;
    if (cast.slot === 'Q') { // Roll Commit: 8 m in 0.6 s, unstoppable, uppercut stagger 0.5
      c.unstoppableUntil = now + 0.1;
      if (cast.t <= dt + 1e-9) onRollStart(w, c); // Smash & Roll: follow-up to the partner's Slam?
      if (cast.t <= 0.6) { dash(w, c, (8 * scale) / 0.6, dt); return; }
      for (const t of targetsIn(w, c, c.pos.x, c.pos.z, 2.5 * scale + r0, c.yaw, Math.PI / 3)) {
        dealDamage(w, c, t, dmg, { weakPoint: true });
        applyCC(w, c, t, 'stagger', 0.5);
        if (t.alive) onRollHit(w, c, t);
      }
      w.hitStructures(c, ctx.front(r0 + 1), 3 * scale, dmg);
      c.chestExposedUntil = now + 1.0;
      w.emit({ type: 'ability', id: c.id, name: 'Uppercut', pos: { ...c.pos }, yaw: c.yaw, radius: 2.5 * scale });
      ctx.end();
    } else if (cast.slot === 'E') { // Haymaker: hold to charge 0.3–1.5 s (1.3 s at L5)
      const full = (c.level >= 5 ? 1.3 : 1.5) / (c.branch === 'Aggression' ? 1.3 : 1); // Aggression L10: 30% faster
      const held = c.intent.e && cast.t < full;
      c.yaw = c.intent.aimYaw;
      cast.dir = dirOf(c.yaw);
      if (held || cast.t < 0.3) return;
      const k = Math.min(1, (cast.t - 0.3) / (full - 0.3));
      const amount = (50 + 0.6 * P) + ((120 + 1.4 * P) - (50 + 0.6 * P)) * k;
      for (const t of targetsIn(w, c, c.pos.x, c.pos.z, 3 * scale + r0, c.yaw, Math.PI / 4)) {
        dealDamage(w, c, t, amount, { weakPoint: true });
        if (k >= 0.99) knockback(w, c.pos, t, 6 * scale);
      }
      w.hitStructures(c, ctx.front(r0 + 1.5), 3 * scale, amount);
      w.emit({ type: 'ability', id: c.id, name: k >= 0.99 ? 'Haymaker (full)' : 'Haymaker', pos: { ...c.pos }, yaw: c.yaw, radius: 3 * scale });
      c.cd.E = now + (ability('Brawler', 'E').cd ?? 9);
      ctx.end();
    } else { // Grapple: grab a lower-Stage target within 3 m, hold 0.6 s, throw 8 m
      if (cast.carried!.length === 0) {
        const cands = targetsIn(w, c, c.pos.x, c.pos.z, 3 * scale + r0, c.yaw, Math.PI / 3)
          .filter((t) => (t.kind === 'wild' || R.stageForLevel(t.level) < R.stageForLevel(c.level) || R.formForLevel(t.level) < R.formForLevel(c.level))
            && !w.isImmovable(t, true));
        if (!cands.length) { if (cast.t > 0.2) { c.cd.R = now + 2; ctx.end(); } return; }
        const t = cands[0];
        cast.carried!.push(t.id);
        t.grabbedBy = c.id;
        t.cast = null;
        t.channel = null;
        dealDamage(w, c, t, dmg);
      }
      const t = w.creatures[cast.carried![0]];
      if (!t.alive) { ctx.end(); return; }
      if (cast.t < 0.6) {
        t.pos.x = c.pos.x + Math.sin(c.yaw) * (r0 + 0.5); t.pos.z = c.pos.z + Math.cos(c.yaw) * (r0 + 0.5);
        t.pos.y = c.pos.y + R.FORM_HEIGHT[R.formForLevel(c.level)] * 0.6;
        c.yaw = c.intent.aimYaw;
        return;
      }
      t.grabbedBy = null;
      const yaw = c.yaw;
      const dist = 8 * scale;
      t.vel.x = Math.sin(yaw) * dist / 0.8; t.vel.z = Math.cos(yaw) * dist / 0.8; t.vel.y = 6; t.grounded = false;
      t.landingBy = c.id; // +40 damage on landing (Spec 02)
      if (c.branch === 'Tactical') t.landingStagger = 0.5; // Tactical L10: the landing staggers and breaks channels
      ctx.end();
    }
  },

  ult(w, c, _cast, name) {
    if (name === 'Shove of the Storm') { // cone 90°, 10 m, 0.4 s wind-up: knockback 15 m, interrupts channels
      const cast = c.cast!;
      if (cast.t < 0.05) w.emit({ type: 'telegraph', id: c.id, pos: { ...c.pos }, radius: 10, time: 0.4 });
      if (cast.t < 0.4) return;
      const P = power(c);
      for (const t of targetsIn(w, c, c.pos.x, c.pos.z, 10, c.yaw, Math.PI / 4)) {
        dealDamage(w, c, t, 60 + 0.6 * P);
        t.channel = null;
        knockback(w, c.pos, t, 15, 4);
      }
      w.emit({ type: 'ability', id: c.id, name: 'Shove of the Storm', pos: { ...c.pos }, yaw: c.yaw, radius: 10 });
      c.cast = null;
      return;
    }
    // Frenzy: 8 s, +40% attack speed, 20% lifesteal
    c.ultUntil = w.time + 8;
    w.emit({ type: 'ability', id: c.id, name: 'Frenzy', pos: { ...c.pos }, yaw: c.yaw, radius: 4 });
    c.cast = null;
  },

  bot: {
    captureBias: 0,
    useAbilities(w, c, t, d, b) {
      const it = c.intent;
      // Hard: follow the partner Titan's Quake Slam with Roll Commit (Smash & Roll)
      if (b.hard && b.ready('Q') && synergyReady(w, c)) {
        const titan = w.creatures[c.partner!];
        const slammed = !titan.syn.slamChecked && titan.syn.slamTargets.map((id) => w.creatures[id])
          .find((x) => x.alive && w.dist(x.pos, c.pos) < 8 * b.scale);
        if (slammed) { it.aimYaw = yawTo(c.pos, slammed.pos); it.q = true; return; }
      }
      if (b.ready('Q') && t && d > 3 && d < 8 * b.scale) it.q = true;
      else if (b.ready('R') && t && d < 3 * b.scale + w.radius(c) && R.stageForLevel(t.level) < R.stageForLevel(c.level)) it.r = true;
      // Haymaker: hold E for a full charge, then release
      if (c.cast?.slot === 'E') { it.e = w.time < b.holdUntil; }
      else if (b.ready('E') && d < 3 * b.scale + w.radius(c) + 1) { it.e = true; b.holdUntil = w.time + 1.3 + w.rng.next() * 0.3; }
      else it.e = false;
    },
  },
};

