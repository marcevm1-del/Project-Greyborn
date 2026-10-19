import { describe, expect, it } from 'vitest';
import { sanitize, sanitizeProfile, defaultSettings, DEFAULT_BINDINGS } from './Settings';

describe('settings validation', () => {
  it('returns defaults for missing or corrupt data', () => {
    expect(sanitize(null)).toEqual(defaultSettings());
    expect(sanitize('garbage')).toEqual(defaultSettings());
    expect(sanitize(42)).toEqual(defaultSettings());
  });
  it('clamps out-of-range numbers and rejects wrong types', () => {
    const s = sanitize({ masterVolume: 7, fov: -100, mouseSensitivity: 'fast', invertY: 'yes', quality: 'ultra' });
    expect(s.masterVolume).toBe(1);
    expect(s.fov).toBe(50);
    expect(s.mouseSensitivity).toBe(defaultSettings().mouseSensitivity);
    expect(s.invertY).toBe(false);
    expect(s.quality).toBe('high');
  });
  it('keeps valid bindings and repairs broken ones', () => {
    const s = sanitize({ bindings: { q: ['KeyZ'], e: [], r: [5], forward: 'KeyW' } });
    expect(s.bindings.q).toEqual(['KeyZ']);
    expect(s.bindings.e).toEqual(DEFAULT_BINDINGS.e);
    expect(s.bindings.r).toEqual(DEFAULT_BINDINGS.r);
    expect(s.bindings.forward).toEqual(DEFAULT_BINDINGS.forward);
  });
  it('rejects NaN and Infinity', () => {
    expect(sanitize({ uiScale: NaN }).uiScale).toBe(1);
    expect(sanitize({ uiScale: Infinity }).uiScale).toBe(1);
  });
});

describe('profile validation', () => {
  it('sanitizes counts and lineage', () => {
    const p = sanitizeProfile({ matches: -3, wins: 2.7, bestLevel: 99, lastLineage: 'Dragon' });
    expect(p.matches).toBe(0);
    expect(p.wins).toBe(2);
    expect(p.bestLevel).toBe(20);
    expect(p.lastLineage).toBe('Brawler');
  });
});
