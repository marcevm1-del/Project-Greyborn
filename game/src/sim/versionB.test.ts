// Version B rules (audit/GAME_DESIGN_DOCUMENT.md): Hub Defense by time held, contested
// field conversion, the Hunt finale and Smash & Roll without Synergy tracks.
import { describe, expect, it } from 'vitest';
import * as R from './rules';
import { World } from './World';
import { econ } from './tuning';
import { synergyReady } from './lineages/synergies';
import type { Creature } from './types';

function world(seed = 1) {
  return new World({ playerLineage: null, playerTeam: 0, short: true, seed });
}
function step(w: World, seconds: number) {
  for (let i = 0; i < Math.round(seconds / R.DT); i++) w.step(R.DT);
}
function setLevel(w: World, c: Creature, level: number) {
  w.gainExp(c, R.expToReach(level) - c.exp);
  c.transformUntil = 0;
}
function place(c: Creature, x: number, z: number, yaw = 0) {
  c.pos.x = x; c.pos.z = z; c.yaw = yaw; c.intent.aimYaw = yaw;
}

describe('Hub Defense (D-05)', () => {
  it('rises one level per 45 s held, with +400 Health per level', () => {
    const w = world();
    const hub = w.hubs[0];
    w.setOwner(hub.node, 0, true);
    const hp = hub.hp;
    step(w, 46);
    expect(hub.level).toBe(1);
    expect(hub.hp).toBeGreaterThanOrEqual(Math.min(hp + 400, econ('Hub base Health') + 400) - 1);
    step(w, 45 * 9 + 2);
    expect(hub.level).toBe(10);
  });
});

describe('Field conversion (D-08)', () => {
  it('takes 6 s + 1 s per 50 cores, 25% less per extra ally in the ring', () => {
    const w = world();
    const hub = w.hubs[2];
    const team0 = w.creatures.filter((c) => c.kind === 'ascendant' && c.team === 0);
    const [a, b, c] = team0;
    a.carried = 300;
    for (const x of team0) place(x, 200, 0); // far away
    place(a, hub.pos.x, hub.pos.z);
    expect(w.fieldChannelTime(a, hub)).toBeCloseTo(12);
    place(b, hub.pos.x + 3, hub.pos.z);
    expect(w.fieldChannelTime(a, hub)).toBeCloseTo(9);
    place(c, hub.pos.x - 3, hub.pos.z);
    expect(w.fieldChannelTime(a, hub)).toBeCloseTo(6); // capped at −50%
  });
});

describe('Hunt finale (D-07)', () => {
  it('doubles territory speed in Phase 4', () => {
    const w = world();
    expect(w.territoryMult()).toBe(1);
    w.phase = 4;
    expect(w.territoryMult()).toBe(2);
  });
});

describe('Smash & Roll (D-04)', () => {
  function setup() {
    const w = world(5);
    const titan = w.creatures.find((c) => c.kind === 'ascendant' && c.team === 0 && c.lineage === 'Titan')!;
    const brawler = w.creatures[titan.partner!];
    const enemy = w.creatures.find((c) => c.kind === 'ascendant' && c.team === 1)!;
    for (const c of [titan, brawler, enemy]) setLevel(w, c, 10);
    place(titan, 10, 30, Math.PI);  // facing −z
    place(enemy, 10, 27);
    place(brawler, 10, 36, Math.PI);
    return { w, titan, brawler, enemy };
  }

  it('is ready when both partners are Stage 2+ and within 15 m', () => {
    const { w, titan, brawler } = setup();
    expect(synergyReady(w, titan)).toBe(true);
    place(brawler, 10, 50);
    expect(synergyReady(w, titan)).toBe(false);
  });

  it('launches the Slammed target when the Brawler rolls within 1.5 s', () => {
    const { w, titan, brawler, enemy } = setup();
    titan.intent.q = true;
    w.step(R.DT);
    titan.intent.q = false;
    step(w, 0.6); // Slam impact at 0.5 s
    expect(enemy.staggerUntil).toBeGreaterThan(w.time);
    brawler.intent.q = true;
    w.step(R.DT);
    brawler.intent.q = false;
    let fired = false;
    for (let i = 0; i < 40; i++) {
      w.step(R.DT);
      if (w.drainEvents().some((e) => e.type === 'synergy')) fired = true;
    }
    expect(fired).toBe(true);
    expect(enemy.syn.markBy).toContain(titan.id);
    expect(synergyReady(w, titan)).toBe(false); // pair cooldown running
  });

  it('adds 50% to the Slam cooldown when the Brawler does not follow up', () => {
    const { w, titan } = setup();
    titan.intent.q = true;
    w.step(R.DT);
    titan.intent.q = false;
    const plain = titan.cd.Q;
    step(w, 2.2);
    expect(titan.cd.Q).toBeGreaterThan(plain + 4);
  });
});
