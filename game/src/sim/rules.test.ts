import { describe, expect, it } from 'vitest';
import * as R from './rules';
import { stat, ability } from './tuning';

describe('levels', () => {
  it('total EXP to L20 is 5,320 (Spec 05 §2)', () => {
    expect(R.expToReach(20)).toBe(5320);
  });
  it('maps EXP to levels at the boundaries', () => {
    expect(R.levelForExp(0)).toBe(1);
    expect(R.levelForExp(219)).toBe(2);
    expect(R.levelForExp(220)).toBe(3);
    expect(R.levelForExp(1620)).toBe(10);
    expect(R.levelForExp(99999)).toBe(20);
  });
  it('forms and stages', () => {
    expect([1, 3, 10, 20].map(R.formForLevel)).toEqual([0, 1, 2, 3]);
    expect([1, 9, 10, 20].map(R.stageForLevel)).toEqual([1, 1, 2, 3]);
  });
});

describe('combat formulas', () => {
  it('Quake Slam at L10 Titan power', () => {
    const q = ability('Titan', 'Q');
    expect(R.abilityDamage(q.base!, q.ratio!, stat('Titan', 'Power', 10))).toBe(140);
  });
  it('damage reduction is multiplicative and capped', () => {
    expect(R.combineReduction(0.3, 0.3)).toBeCloseTo(0.51);
    expect(R.combineReduction(0.6, 0.6)).toBe(0.75);
  });
  it('CC duration and tenacity', () => {
    expect(R.tenacity(15)).toBeCloseTo(0.28);
    expect(R.tenacity(20)).toBeCloseTo(0.28);
    expect(R.ccDuration(1, 100, 0)).toBeCloseTo(1.5);
  });
});

describe('economy', () => {
  it('conversion worked example (Spec 05 §4)', () => {
    expect(R.conversionExp(320, { partnerSync: true })).toBeCloseTo(448);
    expect(R.conversionExp(320, { field: true })).toBeCloseTo(224);
  });
  it('conversion times by Hubs and Core losses', () => {
    expect(R.convertTime(0, 0)).toBe(15);
    expect(R.convertTime(2, 0)).toBe(12);
    expect(R.convertTime(3, 0)).toBe(9);
    expect(R.convertTime(3, 1)).toBe(12);
    expect(R.convertTime(1, 1)).toBe(18);
  });
  it('bounty, respawn, TI', () => {
    expect(R.bounty(10)).toBe(160);
    expect(R.respawnTime(20, 4)).toBe(30);
    expect(R.territorialInfluence(108, 240, 2)).toBeCloseTo(0.51);
  });
});
