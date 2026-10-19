// Verdant (Root & Void pair): territory and sustain. Spec 02 §3, Spec 03;
// Version B changes (audit/GAME_DESIGN_DOCUMENT.md): Sap Draw is an 8 m aura with no SAP
// cost, Overgrowth captures at most 4 nodes.
import * as R from '../rules';
import { applyCC, dealDamage, heal, maxHp, power } from '../combat';
import { econ, ultimateRow } from '../tuning';
import { addZone, inZone } from '../fields';
import { groundTarget, targetsIn } from './shared';
import { tryVoidGarden } from './synergies';
import type { Team } from '../map';
import type { LineageDef } from './types';

export const Verdant: LineageDef = {
  name: 'Verdant',
  pair: 'RootVoid',
  sizeMul: { radius: 1.05, height: 1.1 },
  basicRange: 3,
  immovable: false,
  fastRoot: true, // Deep Root
  ultimates: { Aggression: 'Thornstorm', Tactical: 'Overgrowth' },

  // bloom pod on the shoulder: left and right 90° arcs; from every side while it channels a Root
  weakPointExposed: (_w, _src, tgt, off) => tgt.channel?.kind === 'root' || (off >= Math.PI / 4 && off <= (3 * Math.PI) / 4),
  weakPointLit: () => true,

  tick(w, c, dt) {
    const allies = () => w.creatures.filter((a) => a.kind === 'ascendant' && a.alive && a.team === c.team);
    // Sap Draw: allies within 8 m heal 3% max Health per second
    if (w.time < c.sapDrawUntil) {
      for (const a of allies()) {
        if (w.dist(a.pos, c.pos) <= econ('Sap Draw radius')) heal(w, a, econ('Sap Draw heal per second') * maxHp(a) * dt);
      }
    }
    // Tactical L10: allies standing on the node the Verdant is rooting heal 2% max Health per second
    if (c.branch === 'Tactical' && c.channel?.kind === 'root' && c.channel.node !== undefined) {
      const node = w.nodes[c.channel.node];
      for (const a of allies()) if (w.dist(a.pos, node.core) <= 6) heal(w, a, 0.02 * maxHp(a) * dt);
    }
  },

  onRooted(w, c, node) {
    // Void Garden: the Verdant finished a root inside its partner's Void Rift
    const core = w.nodes[node].core;
    if (w.zones.some((z) => z.kind === 'rift' && z.owner === c.partner && w.time >= z.start && inZone(z, core))) tryVoidGarden(w, c, core);
  },

  cast(w, c, cast, ctx) {
    const { P, scale, now, dmg } = ctx;
    if (cast.slot === 'Q') { // Bramble Wall: 10 m long, up to 15 m away, 0.4 s to grow, 6 s
      const at = groundTarget(w, c, 15);
      const half = (10 * scale) / 2;
      const px = cast.dir.z, pz = -cast.dir.x; // perpendicular to the aim
      w.walls.push({
        id: w.nextFieldId++, team: c.team as Team, owner: c.id,
        a: { x: at.x - px * half, z: at.z - pz * half }, b: { x: at.x + px * half, z: at.z + pz * half },
        hp: dmg, max: dmg, start: now, grow: 0.4, until: now + 0.4 + 6,
      });
      w.emit({ type: 'ability', id: c.id, name: 'Bramble Wall', pos: { x: at.x, y: c.pos.y, z: at.z }, yaw: c.yaw, radius: half });
      ctx.end();
    } else if (cast.slot === 'E') { // Sap Draw: 4 s aura
      c.sapDrawUntil = now + 4;
      w.emit({ type: 'ability', id: c.id, name: 'Sap Draw', pos: { ...c.pos }, yaw: c.yaw, radius: econ('Sap Draw radius') });
      ctx.end();
    } else { // Entangle: radius 3 m, up to 15 m away, 0.6 s delay, root 1.2 s (1.5 s at L5)
      const radius = 3 * scale;
      if (!cast.pos) {
        cast.pos = groundTarget(w, c, 15);
        w.emit({ type: 'telegraph', id: c.id, pos: { x: cast.pos.x, y: c.pos.y, z: cast.pos.z }, radius, time: 0.6 });
      }
      if (cast.t < 0.6) return;
      const at = cast.pos;
      w.emit({ type: 'ability', id: c.id, name: 'Entangle impact', pos: { x: at.x, y: c.pos.y, z: at.z }, yaw: c.yaw, radius });
      for (const t of targetsIn(w, c, at.x, at.z, radius, null, 0)) {
        dealDamage(w, c, t, dmg);
        applyCC(w, c, t, 'root', c.level >= 5 ? 1.5 : 1.2);
      }
      // Aggression L10: thorns hurt the rooted targets every second
      if (c.branch === 'Aggression') {
        addZone(w, { kind: 'thorns', team: c.team as Team, owner: c.id, pos: { ...at }, r: radius + 1, start: now, until: now + 1.6, dps: 15 + 0.2 * P, rootedOnly: true });
      }
      ctx.end();
    }
  },

  ult(w, c, _cast, name) {
    const u = ultimateRow('Verdant', name);
    const team = c.team as Team;
    if (name === 'Overgrowth') { // captures neutral nodes within 15 m, nearest first, at most 4
      const nodes = w.nodes
        .filter((n) => n.hub === null && w.nodeOwner[n.id] === -1 && w.dist2d(n.core, c.pos) <= 15 && !(w.phase === 1 && Math.abs(n.core.x) < 45))
        .sort((a, b) => w.dist2d(a.core, c.pos) - w.dist2d(b.core, c.pos))
        .slice(0, econ('Overgrowth node cap'));
      for (const n of nodes) {
        w.setOwner(n.id, team);
        w.nodeRootedBy[n.id] = c.id;
        w.emit({ type: 'capture', node: n.id, team, by: c.id });
      }
      w.emit({ type: 'ability', id: c.id, name: 'Overgrowth', pos: { ...c.pos }, yaw: c.yaw, radius: 15 });
    } else { // Thornstorm: 6 s aura, radius 5 m, 40 + 0.4 × P per second
      addZone(w, { kind: 'thornstorm', team, owner: c.id, pos: { x: c.pos.x, z: c.pos.z }, r: 5, start: w.time, until: w.time + (u.duration ?? 6), follow: true, dps: (u.base ?? 40) + (u.ratio ?? 0.4) * power(c) });
      w.emit({ type: 'ability', id: c.id, name: 'Thornstorm', pos: { ...c.pos }, yaw: c.yaw, radius: 5 });
    }
    c.cast = null;
  },

  bot: {
    captureBias: 0.5,
    useAbilities(w, c, t, d, b) {
      const it = c.intent;
      const hurtAlly = w.creatures.some((a) => a.kind === 'ascendant' && a.alive && a.team === c.team
        && w.dist(a.pos, c.pos) <= econ('Sap Draw radius') && a.hp < 0.6 * maxHp(a));
      it.e = b.ready('E') && hurtAlly;
      if (t?.kind !== 'ascendant') { it.q = it.r = false; return; }
      it.r = b.ready('R') && d < 14;
      // a wall between us when losing the fight
      it.q = !it.r && b.ready('Q') && c.hp < 0.45 * maxHp(c) && d < 12 && R.formForLevel(c.level) >= 1;
    },
  },
};
