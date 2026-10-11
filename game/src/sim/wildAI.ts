// Wildlife behaviour (Spec 04 / gdd/09): state machines per temperament.
import { SPECIES } from './species';
import { applyCC, dealDamage, maxHp, yawTo } from './combat';
import type { Creature } from './types';
import type { World } from './World';

function steer(c: Creature, tx: number, tz: number) {
  const dx = tx - c.pos.x, dz = tz - c.pos.z;
  const d = Math.hypot(dx, dz);
  c.intent.move = d > 0.3 ? { x: dx / d, z: dz / d } : { x: 0, z: 0 };
  return d;
}

function nearestAscendant(w: World, c: Creature, range: number, filter?: (t: Creature) => boolean): Creature | null {
  let best: Creature | null = null, bd = range;
  for (const t of w.creatures) {
    if (t.kind !== 'ascendant' || !t.alive) continue;
    if (filter && !filter(t)) continue;
    const d = w.dist(t.pos, c.pos);
    if (d < bd) { bd = d; best = t; }
  }
  return best;
}

export function updateWild(w: World, c: Creature, dt: number) {
  const sp = SPECIES[c.species!];
  const home = c.homePos!;
  const now = w.time;
  c.wildTimer = (c.wildTimer ?? 0) - dt;
  if (now < c.stunUntil || now < c.transformUntil) { c.intent.move = { x: 0, z: 0 }; return; }
  const fromHome = w.dist2d(c.pos, home);

  // leash: run home, ignore damage, heal to full
  if (c.wildState === 'return') {
    c.wildSpeed = sp.speed * 1.5;
    c.invulnUntil = now + 0.1;
    if (steer(c, home.x, home.z) < 1.5) {
      c.hp = maxHp(c);
      c.wildTarget = null;
      c.wildState = sp.temperament === 'duel' ? 'duel' : 'idle';
    }
    return;
  }
  if (fromHome > sp.leash && c.wildState !== 'burrow') { c.wildState = 'return'; return; }

  const target = c.wildTarget != null ? w.creatures[c.wildTarget] : null;
  const targetValid = !!target && target.alive && w.dist(target.pos, c.pos) < sp.leash + 10;
  if (!targetValid) c.wildTarget = null;

  switch (sp.temperament) {
    case 'skittish': {
      if (c.wildState === 'burrow') {
        c.intent.move = { x: 0, z: 0 };
        if (c.wildTimer! <= 0) c.wildState = 'idle';
        return;
      }
      const threat = nearestAscendant(w, c, sp.aggro);
      if (threat) {
        if (sp.name === 'Gravel Skink' && c.wildTimer! <= -3) { // burrows for 5 s, then needs a breather
          c.wildState = 'burrow'; c.wildTimer = 5; c.invulnUntil = now + 5; c.intent.move = { x: 0, z: 0 };
          return;
        }
        c.wildState = 'flee';
        c.wildSpeed = sp.speed;
        const a = yawTo(threat.pos, c.pos);
        c.intent.move = { x: Math.sin(a), z: Math.cos(a) };
        return;
      }
      break;
    }
    case 'passive': {
      if (targetValid && now - c.lastDamagedAt < 4) {
        c.wildSpeed = sp.speed * 1.4;
        const a = yawTo(target!.pos, c.pos);
        c.intent.move = { x: Math.sin(a), z: Math.cos(a) };
        return;
      }
      break;
    }
    case 'predator': {
      let prey = targetValid ? target : null;
      if (!prey) {
        prey = nearestAscendant(w, c, 40, (t) => t.hp < 0.3 * maxHp(t) && w.dist2d(t.pos, home) < sp.leash);
        if (prey) {
          // the whole pack joins the hunt
          for (const m of w.creatures) if (m.campId === c.campId && m.alive) m.wildTarget = prey.id;
        }
      }
      if (prey) return attack(w, c, prey, dt);
      break;
    }
    case 'territorial': {
      const intruder = targetValid ? target : nearestAscendant(w, c, sp.aggro);
      if (intruder) {
        c.wildTarget = intruder.id;
        // Stonehide Ox charge: 25 m line at 10 m/s, 200 damage + stun 1.0 s, every 10 s
        const d = w.dist(intruder.pos, c.pos);
        if (sp.name === 'Stonehide Ox' && d > 6 && d < 25 && (c.cd.charge ?? 0) <= now) {
          c.cd.charge = now + 10;
          c.cast = { slot: 'Q', t: 0, dir: { x: Math.sin(yawTo(c.pos, intruder.pos)), z: Math.cos(yawTo(c.pos, intruder.pos)) }, hit: new Set() };
        }
        if (c.cast) return charge(w, c, dt);
        return attack(w, c, intruder, dt);
      }
      break;
    }
    case 'duel': {
      if (targetValid) {
        for (const m of w.creatures) if (m.campId === c.campId && m.alive && m.wildTarget == null) m.wildTarget = target!.id;
        return attack(w, c, target!, dt);
      }
      // locked in a duel with the other beetle: face it, shove back and forth
      const rival = w.creatures.find((m) => m.campId === c.campId && m.id !== c.id && m.alive);
      if (rival) {
        c.yaw = yawTo(c.pos, rival.pos);
        const d = w.dist(rival.pos, c.pos);
        c.wildSpeed = 1.2;
        c.intent.move = d > 2.4 ? { x: Math.sin(c.yaw), z: Math.cos(c.yaw) } : { x: 0, z: 0 };
        return;
      }
      break;
    }
  }
  // idle / wander near home
  c.wildSpeed = sp.speed * 0.35;
  if (c.wildTimer! <= 0) {
    c.wildTimer = w.rng.range(2, 6);
    c.wildState = w.rng.next() < 0.5 ? 'idle' : 'wander';
    const a = w.rng.range(-Math.PI, Math.PI), r = w.rng.range(0, 6);
    (c as Creature & { wanderTo?: { x: number; z: number } }).wanderTo = { x: home.x + Math.cos(a) * r, z: home.z + Math.sin(a) * r };
  }
  const to = (c as Creature & { wanderTo?: { x: number; z: number } }).wanderTo;
  if (c.wildState === 'wander' && to && steer(c, to.x, to.z) > 0.5) return;
  c.intent.move = { x: 0, z: 0 };
}

function attack(w: World, c: Creature, t: Creature, _dt: number) {
  const sp = SPECIES[c.species!];
  const reach = w.radius(c) + w.radius(t) + 1.0;
  const d = w.dist(t.pos, c.pos);
  c.wildSpeed = sp.speed;
  c.wildState = 'attack';
  if (d > reach) { steer(c, t.pos.x, t.pos.z); return; }
  c.intent.move = { x: 0, z: 0 };
  c.yaw = yawTo(c.pos, t.pos);
  if ((c.cd.basic ?? 0) <= w.time && sp.hit > 0) {
    c.cd.basic = w.time + sp.interval;
    w.emit({ type: 'swing', id: c.id, pos: { ...c.pos }, yaw: c.yaw });
    dealDamage(w, c, t, sp.hit * w.phaseMult());
  }
}

function charge(w: World, c: Creature, dt: number) {
  const cast = c.cast!;
  cast.t += dt;
  c.intent.move = { x: cast.dir.x, z: cast.dir.z };
  c.wildSpeed = 10;
  c.yaw = Math.atan2(cast.dir.x, cast.dir.z);
  for (const t of w.creatures) {
    if (t.id === c.id || !t.alive || cast.hit!.has(t.id)) continue;
    if (w.dist(t.pos, c.pos) <= w.radius(c) + w.radius(t) + 0.5) {
      cast.hit!.add(t.id);
      dealDamage(w, c, t, 200 * w.phaseMult());
      applyCC(w, c, t, 'stun', 1.0);
    }
  }
  if (cast.t >= 2.5) c.cast = null;
}
