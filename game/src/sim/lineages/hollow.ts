// Hollow (Root & Void pair): zone denial from range. Spec 02 §4, Spec 03.
import { applyCC, dealDamage, maxHp, power, yawTo } from '../combat';
import { ultimateRow } from '../tuning';
import { addZone } from '../fields';
import { heightAt } from '../terrain';
import { groundTarget, pull, targetsIn } from './shared';
import { synergyReady, tryVoidGarden } from './synergies';
import type { Team } from '../map';
import type { LineageDef } from './types';

export const Hollow: LineageDef = {
  name: 'Hollow',
  pair: 'RootVoid',
  sizeMul: { radius: 0.9, height: 1.15 },
  basicRange: 15, // void bolt
  rangedBasic: true,
  silentSteps: true, // Hush
  immovable: false,
  ultimates: { Aggression: 'Collapse', Tactical: 'Event Horizon' },

  // core cavity in the torso: front 120°
  weakPointExposed: (_w, _src, _tgt, off) => off <= Math.PI / 3,
  weakPointLit: () => true,

  cast(w, c, cast, ctx) {
    const { P, scale, now, dmg } = ctx;
    if (cast.slot === 'Q') { // Void Rift: radius 4 m, up to 18 m, 0.3 s to open, 4 s
      const at = groundTarget(w, c, 18);
      const r = 4 * scale * (c.branch === 'Tactical' ? 1.3 : 1);
      addZone(w, {
        kind: 'rift', team: c.team as Team, owner: c.id, pos: at, r, start: now + 0.3, until: now + 0.3 + 4,
        slow: c.level >= 5 ? 0.4 : 0.3, controlLoss: 0.4,
        dps: c.branch === 'Aggression' ? 25 + 0.3 * P : undefined, // Aggression L10
      });
      w.emit({ type: 'ability', id: c.id, name: 'Void Rift', pos: { x: at.x, y: c.pos.y, z: at.z }, yaw: c.yaw, radius: r });
      // Void Garden: the Rift opens on ground the partner Verdant rooted
      const rooted = w.nodes.find((n) => w.nodeOwner[n.id] === c.team && w.nodeRootedBy[n.id] === c.partner && w.dist2d(n.core, at) <= r);
      if (rooted) tryVoidGarden(w, c, at);
      ctx.end();
    } else if (cast.slot === 'E') { // Hollow Step: blink 8 m; passes through units and walls, not terrain
      const len = 8 * scale;
      for (let d = len; d > 0; d -= 0.5) {
        const x = c.pos.x + cast.dir.x * d, z = c.pos.z + cast.dir.z * d;
        if (!w.nav.walkable(x, z)) continue;
        c.pos.x = x; c.pos.z = z; c.pos.y = heightAt(x, z);
        break;
      }
      c.invulnUntil = Math.max(c.invulnUntil, now + 0.1);
      w.emit({ type: 'ability', id: c.id, name: 'Hollow Step', pos: { ...c.pos }, yaw: c.yaw, radius: 0 });
      ctx.end();
    } else { // Null Pulse: 0.3 s wind-up, radius 6 m around self, silence 1.5 s
      const radius = 6 * scale;
      if (!cast.done && cast.t < 0.05) w.emit({ type: 'telegraph', id: c.id, pos: { ...c.pos }, radius, time: 0.3 });
      if (cast.t >= 0.3 && !cast.done) {
        cast.done = true;
        w.emit({ type: 'ability', id: c.id, name: 'Null Pulse impact', pos: { ...c.pos }, yaw: c.yaw, radius });
        for (const t of targetsIn(w, c, c.pos.x, c.pos.z, radius, null, 0)) {
          dealDamage(w, c, t, dmg, { weakPoint: true });
          applyCC(w, c, t, 'silence', 1.5);
        }
      }
      if (cast.t >= 0.45) ctx.end();
    }
  },

  ult(w, c, cast, name, dt) {
    const u = ultimateRow('Hollow', name);
    const P = power(c);
    const collapse = name === 'Collapse';
    const r = collapse ? 6 : 10;
    const delay = collapse ? 1.0 : 0.8;
    if (!cast.pos) {
      cast.pos = groundTarget(w, c, collapse ? 20 : 15);
      w.emit({ type: 'telegraph', id: c.id, pos: { x: cast.pos.x, y: c.pos.y, z: cast.pos.z }, radius: r, time: delay });
    }
    const at = cast.pos;
    if (cast.t < delay) {
      if (collapse) for (const t of targetsIn(w, c, at.x, at.z, r, null, 0)) pull(w, t, at, 4 * dt); // drawn toward the centre
      return;
    }
    w.emit({ type: 'ability', id: c.id, name: `${name} impact`, pos: { x: at.x, y: c.pos.y, z: at.z }, yaw: c.yaw, radius: r });
    const full = (u.base ?? 0) + (u.ratio ?? 0) * P;
    for (const t of targetsIn(w, c, at.x, at.z, r, null, 0)) {
      if (collapse) { // 200 + 2 × P at the centre, falling to 50% at the edge
        dealDamage(w, c, t, full * (1 - 0.5 * Math.min(1, w.dist(t.pos, at) / r)));
      } else { // Event Horizon: everyone pulled to the centre, staggered 0.5 s
        pull(w, t, at, r);
        dealDamage(w, c, t, full);
        applyCC(w, c, t, 'stagger', 0.5);
      }
    }
    c.cast = null;
  },

  bot: {
    captureBias: 0.3,
    useAbilities(w, c, t, d, b) {
      const it = c.intent;
      // Hard: open a Rift on the node the partner Verdant is rooting, so the root completes inside it (Void Garden)
      const v = c.partner !== null ? w.creatures[c.partner] : null;
      if (b.hard && b.ready('Q') && v?.channel?.kind === 'root' && v.channel.node !== undefined && synergyReady(w, c)) {
        const core = w.nodes[v.channel.node].core;
        const dd = w.dist(c.pos, core);
        if (dd > 18 * 0.6 - 4 * b.scale && dd < 18 * 0.6 + 4 * b.scale) { it.aimYaw = yawTo(c.pos, core); it.q = true; return; }
      }
      if (t?.kind !== 'ascendant') { it.q = it.r = it.e = false; return; }
      it.r = b.ready('R') && d < 5.5 * b.scale;
      it.q = !it.r && b.ready('Q') && d < 17;
      // blink away when hurt and the enemy is close
      it.e = !it.r && !it.q && b.ready('E') && c.hp < 0.4 * maxHp(c) && d < 6;
      if (it.e) it.aimYaw = yawTo(t.pos, c.pos);
    },
  },
};
