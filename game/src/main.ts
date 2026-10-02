import { SceneRig } from './render/Scene';
import { TerrainView } from './render/TerrainView';
import { PropsView } from './render/PropsView';
import { World } from './sim/World';

const app = document.getElementById('app')!;
const rig = new SceneRig(app, { shadows: true, shadowSize: 2048, pixelRatio: 1.5, grassDensity: 1 });
const world = new World({ playerLineage: 'Brawler', playerTeam: 0, short: true, seed: 1 });
const terrain = new TerrainView(rig.scene, world.sides[0] === 'Wildborn' ? 0 : 1);
const props = new PropsView(rig.scene, world.obstacles, 1);
rig.camera.position.set(-95, 22, 30);
rig.camera.lookAt(-40, 2, 0);
const pulse = new Float32Array(240);
function frame(t: number) {
  terrain.updateTerritory(world.cellOwner, pulse, t / 1000);
  props.update(t / 1000, rig.camera.position);
  rig.followShadow(rig.camera.position, 60);
  rig.render();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
(window as unknown as { __ready: boolean }).__ready = true;
