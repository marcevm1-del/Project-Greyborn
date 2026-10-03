// Keyboard + mouse (pointer lock) + gamepad, mapped through rebindable actions.
import type { Action, Settings } from './Settings';

export class Input {
  private down = new Set<string>();
  private pressed = new Set<string>();   // went down this frame
  lookDX = 0;
  lookDY = 0;
  zoom = 0;
  gamepad: Gamepad | null = null;
  usingGamepad = false;
  private padPrev: boolean[] = [];

  constructor(private canvas: HTMLElement, private settings: () => Settings) {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Tab') e.preventDefault();
      if (!this.down.has(e.code)) this.pressed.add(e.code);
      this.down.add(e.code);
      this.usingGamepad = false;
    });
    window.addEventListener('keyup', (e) => this.down.delete(e.code));
    window.addEventListener('blur', () => this.down.clear());
    canvas.addEventListener('mousedown', (e) => {
      const k = `Mouse${e.button}`;
      if (!this.down.has(k)) this.pressed.add(k);
      this.down.add(k);
      this.usingGamepad = false;
    });
    window.addEventListener('mouseup', (e) => this.down.delete(`Mouse${e.button}`));
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('mousemove', (e) => {
      if (document.pointerLockElement === this.canvas) {
        this.lookDX += e.movementX;
        this.lookDY += e.movementY;
      }
    });
    canvas.addEventListener('wheel', (e) => { this.zoom += Math.sign(e.deltaY); }, { passive: true });
  }

  lockPointer() {
    if (document.pointerLockElement !== this.canvas) this.canvas.requestPointerLock?.()?.catch?.(() => {});
  }
  get locked(): boolean { return document.pointerLockElement === this.canvas; }

  private bound(a: Action): string[] { return this.settings().bindings[a]; }
  held(a: Action): boolean {
    return this.bound(a).some((k) => this.down.has(k)) || this.padHeld(a);
  }
  tapped(a: Action): boolean {
    return this.bound(a).some((k) => this.pressed.has(k)) || this.padTapped(a);
  }

  /** Movement vector in camera space: x = right, y = forward. */
  moveAxes(): { x: number; y: number } {
    let x = 0, y = 0;
    if (this.held('forward')) y += 1;
    if (this.held('back')) y -= 1;
    if (this.held('right')) x += 1;
    if (this.held('left')) x -= 1;
    const p = this.gamepad;
    if (p) {
      const dz = this.settings().gamepadDeadzone;
      const ax = p.axes[0] ?? 0, ay = p.axes[1] ?? 0;
      const m = Math.hypot(ax, ay);
      if (m > dz) {
        const k = (m - dz) / (1 - dz) / m;
        x += ax * k; y -= ay * k;
        this.usingGamepad = true;
      }
    }
    const l = Math.hypot(x, y);
    return l > 1 ? { x: x / l, y: y / l } : { x, y };
  }

  // Standard gamepad mapping: A=0 evade, B=1 interact, X=2 basic, Y=3 ult, LB=4 Q, RB=5 E, LT=6 R, Start=9 pause
  private static PAD: Partial<Record<Action, number>> = { evade: 0, interact: 1, basic: 2, ult: 3, q: 4, e: 5, r: 6, pause: 9, scoreboard: 8 };
  private padHeld(a: Action): boolean {
    const i = Input.PAD[a];
    return i !== undefined && !!this.gamepad?.buttons[i]?.pressed;
  }
  private padTapped(a: Action): boolean {
    const i = Input.PAD[a];
    return i !== undefined && !!this.gamepad?.buttons[i]?.pressed && !this.padPrev[i];
  }

  /** Call once per frame before reading. */
  poll() {
    const pads = navigator.getGamepads?.() ?? [];
    this.gamepad = pads.find((p) => p && p.connected) ?? null;
    if (this.gamepad) {
      const dz = this.settings().gamepadDeadzone;
      const rx = this.gamepad.axes[2] ?? 0, ry = this.gamepad.axes[3] ?? 0;
      if (Math.abs(rx) > dz) { this.lookDX += rx * 14; this.usingGamepad = true; }
      if (Math.abs(ry) > dz) { this.lookDY += ry * 10; this.usingGamepad = true; }
      if (this.gamepad.buttons.some((b) => b.pressed)) this.usingGamepad = true;
    }
  }

  /** Call at the end of each frame. */
  endFrame() {
    this.pressed.clear();
    this.lookDX = this.lookDY = 0;
    this.zoom = 0;
    this.padPrev = this.gamepad ? this.gamepad.buttons.map((b) => b.pressed) : [];
  }

  /** Programmatic input for automated tests. */
  inject(code: string, isDown: boolean) {
    if (isDown) { if (!this.down.has(code)) this.pressed.add(code); this.down.add(code); }
    else this.down.delete(code);
  }
}
