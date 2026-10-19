// Verdant, Hollow and Void Garden (audit D-02, Version B §6–7).
import { describe, expect, it } from 'vitest';
import * as R from './rules';
import { World } from './World';
import { econ } from './tuning';
import { control } from './combat';
import { synergyReady } from './lineages/synergies';
import { LINEAGES, PAIRS } from './lineages/registry';
import { BotBrain } from './botAI';
import type { Creature } from './types';

function world(seed = 3) {
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
function cast(w: World, c: Creature, key: 'q' | 'e' | 'r' | 'ult') {
  c.intent[key] = true;
  w.step(R.DT);
  c.intent[key] = false;
}
function setup() {
  const w = world();
  const team0 = w.creatures.filter((c) => c.kind === 'ascendant' && c.team === 0);
  const verdant = team0.find((c) => c.lineage === 'Verdant')!;
  const hollow = w.creatures[verdant.partner!];
  const enemy = w.creatures.find((c) => c.kind === 'ascendant' && c.team === 1)!;
  for (const c of w.creatures) if (c.kind === 'ascendant') place(c, 200 + c.id * 3, 60); // out of the way
  for (const c of w.creatures) if (c.kind === 'wild') { c.alive = false; c.respawnAt = 1e9; }
  for (const c of [verdant, hollow, enemy]) setLevel(w, c, 10);
  return { w, verdant, hollow, enemy };
}

describe('Version B roster', () => {
  it('registers four lineages in two pairs; each team fields both pairs', () => {
    expect(Object.keys(LINEAGES).sort()).toEqual(['Brawler', 'Hollow', 'Titan', 'Verdant']);
    expect(PAIRS).toEqual([['Titan', 'Brawler'], ['Verdant', 'Hollow']]);
    const w = world();
    for (const team of [0, 1]) {
      const names = w.creatures.filter((c) => c.kind === 'ascendant' && c.team === team).map((c) => c.lineage).sort();
      expect(names).toEqual(['Brawler', 'Hollow', 'Titan', 'Verdant']);
    }
  });
});

describe('Verdant', () => {
  it('Entangle roots and damages enemies at range', () => {
    const { w, verdant, enemy } = setup();
    place(verdant, 0, 20);
    place(enemy, 0, 30);
    const hp = enemy.hp;
    cast(w, verdant, 'r');
    step(w, 0.7);
    expect(enemy.rootUntil).toBeGreaterThan(w.time);
    expect(enemy.hp).toBeLessThan(hp);
  });

  it('Bramble Wall blocks movement', () => {
    const { w, verdant, enemy } = setup();
    place(verdant, 0, 20);
    place(enemy, 0, 32, Math.PI);
    cast(w, verdant, 'q');
    expect(w.walls.length).toBe(1);
    step(w, 0.5); // grown
    // the enemy tries to walk through the wall toward the Verdant
    for (let i = 0; i < 60; i++) { enemy.intent.move = { x: 0, z: -1 }; w.step(R.DT); }
    const wall = w.walls[0];
    expect(enemy.pos.z).toBeGreaterThan(wall.a.z);
  });

  it('Sap Draw heals allies within 8 m', () => {
    const { w, verdant, hollow } = setup();
    place(verdant, 0, 20);
    place(hollow, 4, 20);
    hollow.hp = hollow.hp * 0.5;
    hollow.lastDamagedAt = w.time; // no out-of-combat regeneration
    const hp = hollow.hp;
    cast(w, verdant, 'e');
    step(w, 1);
    expect(hollow.hp).toBeGreaterThan(hp);
  });

  it('Deep Root: roots in 2 s instead of 4 s', () => {
    expect(R.rootChannel(0, true)).toBeCloseTo(R.rootChannel(0) / 2);
    expect(LINEAGES.Verdant!.fastRoot).toBe(true);
  });
});

describe('Hollow', () => {
  it('basic attack is a 15 m bolt that does not scale with Stage', () => {
    const { w, hollow, enemy } = setup();
    place(hollow, 0, 20);
    place(enemy, 0, 33);
    const hp = enemy.hp;
    hollow.intent.basic = true;
    step(w, 0.3);
    hollow.intent.basic = false;
    expect(enemy.hp).toBeLessThan(hp);
  });

  it('Void Rift slows and lowers Control inside it', () => {
    const { w, hollow, enemy } = setup();
    place(hollow, 0, 20);
    place(enemy, 0, 30);
    const ctl = control(enemy);
    cast(w, hollow, 'q');
    step(w, 0.5);
    expect(enemy.slowUntil).toBeGreaterThan(w.time);
    expect(control(enemy)).toBeCloseTo(ctl * 0.6);
    step(w, 5);
    expect(control(enemy)).toBeCloseTo(ctl); // gone with the Rift
  });

  it('Null Pulse silences: no abilities, basic attacks still work', () => {
    const { w, hollow, enemy } = setup();
    place(hollow, 0, 20);
    place(enemy, 0, 23, Math.PI);
    cast(w, hollow, 'r');
    step(w, 0.4);
    expect(enemy.silencedUntil).toBeGreaterThan(w.time);
    enemy.cd = {};
    cast(w, enemy, 'q');
    expect(enemy.cast).toBeNull();
    enemy.intent.basic = true;
    w.step(R.DT);
    expect(enemy.cast?.slot).toBe('basic');
  });

  it('Hollow Step blinks 8 m ahead', () => {
    const { w, hollow } = setup();
    place(hollow, 0, 20);
    cast(w, hollow, 'e');
    expect(hollow.pos.z).toBeGreaterThan(27);
  });
});

describe('Void Garden', () => {
  it('opens when a Void Rift lands on a node the Verdant rooted', () => {
    const { w, verdant, hollow, enemy } = setup();
    const node = w.nodes.find((n) => n.hub === null && w.nodeOwner[n.id] === 0)!;
    w.nodeRootedBy[node.id] = verdant.id;
    place(verdant, node.core.x - 4, node.core.z);
    place(hollow, node.core.x, node.core.z - 10); // facing +z toward the node
    place(enemy, node.core.x + 1, node.core.z + 1);
    expect(synergyReady(w, hollow)).toBe(true);
    const ctl = control(enemy);
    cast(w, hollow, 'q');
    const garden = w.zones.find((z) => z.kind === 'garden');
    expect(garden).toBeDefined();
    expect(garden!.r).toBe(econ('Void Garden radius'));
    step(w, 0.5);
    // −50% (garden) beats −40% (rift): the strongest loss applies
    expect(control(enemy)).toBeCloseTo(ctl * 0.5);
    // allied nodes inside can't be uprooted
    expect(w.capturable(1, node.id)).toBe(false);
    // enemies inside can't capture
    expect(w.inEnemyGarden(enemy)).toBe(true);
    expect(synergyReady(w, hollow)).toBe(false); // pair cooldown
  });

  it('opens when the Verdant finishes a root inside the Hollow\'s Rift', () => {
    const { w, verdant, hollow } = setup();
    w.phase = 2; w.time = Math.max(w.time, w.phaseStart(2));
    const node = w.nodes.find((n) => n.hub === null && w.capturable(0, n.id) && w.nodeOwner[n.id] === -1)!;
    place(hollow, node.core.x, node.core.z - 10);
    place(verdant, node.core.x, node.core.z - 1.5);
    cast(w, hollow, 'q');
    expect(w.zones.some((z) => z.kind === 'rift')).toBe(true);
    step(w, 0.35);
    verdant.intent.interact = true;
    let opened = false;
    for (let i = 0; i < 90 && !opened; i++) { w.step(R.DT); opened = w.zones.some((z) => z.kind === 'garden'); }
    expect(w.nodeOwner[node.id]).toBe(0);
    expect(opened).toBe(true);
  });
});

describe('All four lineages in a bot match', () => {
  it('runs 4 minutes with abilities, walls and zones without errors', () => {
    const w = world(11);
    const seen = new Set<string>();
    const brains = w.creatures.filter((c) => c.kind === 'ascendant').map((c) => new BotBrain(c.id, w));
    for (let i = 0; i < Math.round(240 / R.DT) && !w.result; i++) {
      for (const b of brains) b.update(w);
      w.step(R.DT);
      for (const e of w.drainEvents()) if (e.type === 'ability') seen.add(w.creatures[e.id].lineage);
    }
    expect([...seen].sort()).toEqual(['Brawler', 'Hollow', 'Titan', 'Verdant']);
    for (const c of w.creatures) expect(Number.isFinite(c.pos.x) && Number.isFinite(c.hp)).toBe(true);
  });
});

describe('Root & Void Ultimates', () => {
  it('Overgrowth captures at most 4 neutral nodes within 15 m', () => {
    const { w, verdant } = setup();
    w.phase = 2; w.time = Math.max(w.time, w.phaseStart(2));
    setLevel(w, verdant, 20);
    w.chooseBranch(verdant, 'Tactical');
    const n = w.nodes.filter((x) => x.hub === null && w.nodeOwner[x.id] === -1)
      .sort((a, b) => w.nodes.filter((y) => w.dist2d(y.core, b.core) <= 15).length - w.nodes.filter((y) => w.dist2d(y.core, a.core) <= 15).length)[0];
    place(verdant, n.core.x, n.core.z);
    const before = w.nodeOwner.filter((o) => o === 0).length;
    cast(w, verdant, 'ult');
    const got = w.nodeOwner.filter((o) => o === 0).length - before;
    expect(got).toBeGreaterThan(0);
    expect(got).toBeLessThanOrEqual(econ('Overgrowth node cap'));
  });

  it('Event Horizon pulls enemies to the centre and staggers them', () => {
    const { w, hollow, enemy } = setup();
    setLevel(w, hollow, 20);
    w.chooseBranch(hollow, 'Tactical');
    place(hollow, 0, 10);
    place(enemy, 0, 22);
    const other = w.creatures.find((c) => c.kind === 'ascendant' && c.team === 1 && c.id !== enemy.id && !w.isImmovable(c, true))!;
    setLevel(w, other, 10);
    place(other, 6, 21);
    cast(w, hollow, 'ult');
    step(w, 0.9);
    expect(w.dist(other.pos, enemy.pos)).toBeLessThan(3);
    expect(other.staggerUntil).toBeGreaterThan(w.time);
  });
});
