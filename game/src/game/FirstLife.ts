// First Life (Version B §12, audit D-11): a scripted solo start of about three
// minutes on Ashfall Crossing. Move → eat three small creatures → awaken at L3 →
// root a node → pick up a fallen Ashfang's cores → walk home and convert → grow.
// Bots stand still while it runs; the real match (bots on Easy) starts after.
// This is a game-layer script: it reads the world and nudges it the way a test does.
import * as R from '../sim/rules';
import { BASES, type Team, type Vec2 } from '../sim/map';
import { SPECIES } from '../sim/species';
import type { GameEvent } from '../sim/types';
import type { World } from '../sim/World';

type Step = 'move' | 'hunt' | 'awaken' | 'root' | 'pickup' | 'convert' | 'grow' | 'done';

const CORES_DROPPED = 150;

export class FirstLife {
  step: Step = 'move';
  private start: Vec2;
  private kills = 0;
  private dropAt: Vec2 | null = null;
  private stepAt = 0;

  constructor(private w: World) {
    const me = w.player!;
    this.start = { x: me.pos.x, z: me.pos.z };
  }

  get done(): boolean { return this.step === 'done'; }

  private go(step: Step) { this.step = step; this.stepAt = this.w.time; }

  onEvents(events: GameEvent[]) {
    const me = this.w.player!;
    for (const e of events) {
      if (e.type === 'death' && e.killer === me.id && this.w.creatures[e.id].kind === 'wild') this.kills++;
      if (e.type === 'capture' && e.by === me.id && this.step === 'root') this.go('pickup');
      if (e.type === 'convert' && e.id === me.id && this.step === 'convert') this.go('grow');
    }
  }

  /** Advances the script. Returns the objective text and where to point the marker. */
  update(): { text: string; marker: Vec2 | null } {
    const w = this.w;
    const me = w.player!;
    const team = me.team as Team;
    const skip = '<small>Press Enter to skip to the match</small>';
    switch (this.step) {
      case 'move': {
        if (w.dist2d(me.pos, this.start) > 12) this.go('hunt');
        return { text: `<b>Move</b> with W A S D. Look around with the mouse.${skip}`, marker: null };
      }
      case 'hunt': {
        if (this.kills >= 3) { this.go('awaken'); return this.update(); }
        const prey = w.creatures
          .filter((c) => c.kind === 'wild' && c.alive && SPECIES[c.species!].tier === 'I')
          .sort((a, b) => w.dist(a.pos, me.pos) - w.dist(b.pos, me.pos))[0];
        return {
          text: `<b>Eat three small creatures</b> (${this.kills}/3). Left click to bite. Their cores feed you directly until Level 3.${skip}`,
          marker: prey ? { x: prey.pos.x, z: prey.pos.z } : null,
        };
      }
      case 'awaken': {
        // make sure the awakening happens here even if the three were small
        if (me.level < 3) w.gainExp(me, R.expToReach(3) - me.exp);
        if (w.time > this.stepAt + 3 && w.time >= me.transformUntil) this.go('root');
        return { text: `<b>You awaken.</b> Your lineage shows itself: Q, E and R are ready.${skip}`, marker: null };
      }
      case 'root': {
        const node = w.nodes
          .filter((n) => w.capturable(team, n.id))
          .sort((a, b) => w.dist2d(a.core, me.pos) - w.dist2d(b.core, me.pos))[0];
        return {
          text: `<b>Root a node.</b> Stand on the marked node next to your territory and hold F. Territory is how the match is won.${skip}`,
          marker: node ? node.core : null,
        };
      }
      case 'pickup': {
        if (!this.dropAt) {
          // an Ashfang fell nearby: its cores lie on the ground
          const yaw = me.yaw;
          const x = me.pos.x + Math.sin(yaw) * 10, z = me.pos.z + Math.cos(yaw) * 10;
          this.dropAt = w.nav.walkable(x, z) ? { x, z } : { x: me.pos.x, z: me.pos.z };
          w.dropCores({ x: this.dropAt.x, y: me.pos.y, z: this.dropAt.z }, CORES_DROPPED);
        }
        if (me.carried >= CORES_DROPPED * 0.6) this.go('convert');
        return { text: `<b>An Ashfang fell nearby.</b> Walk over its cores to pick them up. From Level 3, cores are carried, not eaten.${skip}`, marker: this.dropAt };
      }
      case 'convert':
        return {
          text: `<b>Walk home</b> and hold F inside your base to feed the cores to the birth-pool. Carried cores are lost if you die.${skip}`,
          marker: BASES[team],
        };
      case 'grow':
        if (w.time > this.stepAt + 4) this.go('done');
        return { text: '<b>You grow.</b> Every Stage makes you bigger, stronger and louder. Now the real match begins.', marker: null };
      default:
        return { text: '', marker: null };
    }
  }
}
