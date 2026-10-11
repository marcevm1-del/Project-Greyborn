// Wildlife used on Ashfall Crossing. Health, cores and SAP come from the tuning
// workbook (Spec 04 via tuning.json); behaviour numbers are from Spec 04's tables.
import { creatureRow } from './tuning';

export type Temperament = 'passive' | 'skittish' | 'predator' | 'territorial' | 'duel';

export interface SpeciesDef {
  name: string;
  tier: 'I' | 'II' | 'III';
  temperament: Temperament;
  group: number;
  health: number;
  cores: number;
  sap: number;
  hit: number;          // damage per hit
  interval: number;     // seconds between hits
  speed: number;        // m/s
  size: number;         // body height in metres
  respawn: number;      // seconds
  affinity: string | null;
  aggro: number;
  leash: number;
  body: 'quad' | 'biped' | 'hexapod' | 'insect';
  color: number;
}

const RESPAWN = { I: 45, II: 90, III: 180 } as const;

function def(name: string, d: Omit<SpeciesDef, 'name' | 'health' | 'cores' | 'sap' | 'respawn' | 'tier'> & { group: number }): SpeciesDef {
  const row = creatureRow(name);
  const tier = row.tier as 'I' | 'II' | 'III';
  // Spec 04 lists swarm/herd health per creature; group camps keep per-creature values.
  return { name, tier, health: row.health ?? 200, cores: row.cores, sap: row.sap, respawn: RESPAWN[tier], ...d };
}

export const SPECIES: Record<string, SpeciesDef> = Object.fromEntries(
  [
    def('Gravel Skink', { temperament: 'skittish', group: 3, hit: 0, interval: 1.5, speed: 6, size: 0.5, affinity: null, aggro: 6, leash: 20, body: 'hexapod', color: 0x8a8274 }),
    def('Spurlark', { temperament: 'skittish', group: 1, hit: 0, interval: 1.5, speed: 10, size: 1.1, affinity: 'Thornrunner', aggro: 12, leash: 30, body: 'biped', color: 0xb7a27c }),
    def('Glimmerfox', { temperament: 'skittish', group: 1, hit: 0, interval: 1.5, speed: 8, size: 0.7, affinity: 'Thornrunner', aggro: 12, leash: 25, body: 'quad', color: 0xd9c9a0 }),
    def('Ashfang', { temperament: 'predator', group: 3, hit: 50, interval: 1.0, speed: 7, size: 1.1, affinity: 'Thornrunner', aggro: 10, leash: 30, body: 'quad', color: 0x5d5a55 }),
    def('Mossback Grazer', { temperament: 'passive', group: 4, hit: 45, interval: 1.2, speed: 3.5, size: 1.8, affinity: 'Verdant', aggro: 0, leash: 25, body: 'quad', color: 0x6f7f5a }),
    def('Clashhorn Beetles', { temperament: 'duel', group: 2, hit: 55, interval: 1.2, speed: 4.5, size: 1.2, affinity: 'Brawler', aggro: 8, leash: 25, body: 'insect', color: 0x4a3b30 }),
    def('Stonehide Ox', { temperament: 'territorial', group: 1, hit: 140, interval: 1.5, speed: 4, size: 2.8, affinity: 'Titan', aggro: 15, leash: 35, body: 'quad', color: 0x7b746a }),
  ].map((s) => [s.name, s]),
);
