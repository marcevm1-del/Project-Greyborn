// Titan (Commit pair): juggernaut and front line. Spec 02 §1, Spec 03.
import * as R from '../rules';
import { applyCC, dealDamage, knockback, maxHp, power } from '../combat';
import { ultimateRow } from '../tuning';
import { dash, targetsIn } from './shared';
import type { LineageDef } from './types';

export const Titan: LineageDef = {
  name: 'Titan',
  pair: 'Commit',
  sizeMul: { radius: 1.15, height: 1.3 },
  basicRange: 3,
  immovable: true,
  ultimates: { Aggression: 'Avalanche', Tactical: 'Fortress' },

  // crystal spine on the back: rear 120°
  weakPointExposed: (_w, _src, _tgt, off) => off >= Math.PI - Math.PI / 3,
  weakPointLit: () => true,

  // Immovable: −10% damage from lower-Stage enemies
  damageReduction(_w, tgt, src) {
    if (R.formForLevel(tgt.level) >= 1 && src.kind === 'ascendant' && R.stageForLevel(src.level) < R.stageForLevel(tgt.level)) return 0.1;
    return 0;
  },

  cast(w, c, cast, ctx, dt) {
    const { scale, r0, now, dmg } = ctx;
    if (cast.slot === 'Q') { // Quake Slam: 0.5 s wind-up, radius 5 m, stagger 0.8 s
      const radius = 5 * scale * (c.level >= 5 ? 1.2 : 1);
      if (!cast.done && cast.t < 0.05) w.emit({ type: 'telegraph', id: c.id, pos: { ...c.pos }, radius, time: 0.5 });
      if (cast.t >= 0.5 && !cast.done) {
        cast.done = true;
        w.emit({ type: 'ability', id: c.id, name: 'Quake Slam impact', pos: { ...c.pos }, yaw: c.yaw, radius });
        for (const t of targetsIn(w, c, c.pos.x, c.pos.z, radius, null, 0)) {
          dealDamage(w, c, t, dmg, { weakPoint: true });
          applyCC(w, c, t, 'stagger', 0.8);
        }
        w.hitStructures(c, c.pos, radius, dmg);
      }
      if (cast.t >= 0.75) ctx.end();
    } else if (cast.slot === 'E') { // Bulwark: 3 s, −60% from the front, slowed 30%
      c.bulwarkUntil = now + 3;
      ctx.end();
    } else { // Rampart Charge: 0.3 s wind-up, 1.0 s unstoppable charge 12 m, carries up to 2
      const len = 12 * scale;
      if (cast.t < 0.3) return;
      c.unstoppableUntil = now + 0.1;
      if (cast.t <= 1.3) {
        dash(w, c, len / 1.0, dt);
        for (const t of targetsIn(w, c, c.pos.x, c.pos.z, r0 + 1, null, 0)) {
          if (cast.carried!.length < 2 && !cast.carried!.includes(t.id) && !w.isImmovable(t, false)) cast.carried!.push(t.id);
        }
        for (const id of cast.carried!) {
          const t = w.creatures[id];
          if (t.alive) { t.pos.x = c.pos.x + cast.dir.x * (r0 + w.radius(t)); t.pos.z = c.pos.z + cast.dir.z * (r0 + w.radius(t)); t.cast = null; t.channel = null; }
        }
      } else {
        for (const t of targetsIn(w, c, c.pos.x, c.pos.z, r0 + 2.5, null, 0)) {
          dealDamage(w, c, t, dmg, { weakPoint: true });
          applyCC(w, c, t, 'stagger', 0.3);
        }
        w.hitStructures(c, ctx.front(r0 + 1), r0 + 2.5, dmg);
        ctx.end();
      }
    }
  },

  ult(w, c, cast, name, dt) {
    const u = ultimateRow('Titan', name);
    const P = power(c);
    if (name === 'Fortress') { // 6 s immovable; −50% damage taken; allies in the 120° cone behind take −40%
      c.fortressUntil = w.time + (u.duration ?? 6);
      w.emit({ type: 'ability', id: c.id, name: 'Fortress', pos: { ...c.pos }, yaw: c.yaw, radius: 6 });
      c.cast = null;
      return;
    }
    // Avalanche: 3 s unstoppable roll along a 30 m line
    c.unstoppableUntil = w.time + 0.1;
    dash(w, c, 30 / 3, dt);
    for (const t of targetsIn(w, c, c.pos.x, c.pos.z, w.radius(c) + 1.5, null, 0)) {
      if (cast.hit!.has(t.id)) continue;
      cast.hit!.add(t.id);
      dealDamage(w, c, t, (u.base ?? 100) + (u.ratio ?? 1) * P);
      knockback(w, c.pos, t, 5);
    }
    w.hitStructures(c, c.pos, w.radius(c) + 2, 0, 600 + 3 * P, cast.hit!);
    if (cast.t >= 3) c.cast = null;
  },

  bot: {
    captureBias: 0.2,
    useAbilities(w, c, t, d, b) {
      const it = c.intent;
      if (b.ready('Q') && d < 4.5 * b.scale + w.radius(c)) it.q = true;
      else if (b.ready('R') && t && t.kind === 'ascendant' && d > 4 && d < 11 * b.scale) it.r = true;
      else if (b.ready('E') && c.hp < 0.6 * maxHp(c) && t?.kind === 'ascendant') it.e = true;
      else it.e = false;
    },
  },
};
