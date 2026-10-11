import './ui/styles.css';
import { Game } from './game/Game';

const app = document.getElementById('app')!;
try {
  const game = new Game(app);
  (window as unknown as { greyborn: unknown }).greyborn = game.debugApi();
} catch (err) {
  // WebGL unavailable or a startup failure: show a readable message instead of a blank page
  app.innerHTML = `<div style="padding:40px;font-family:sans-serif;color:#ece6d6">
    <h2 style="color:#e2b866">Greyborn couldn't start</h2>
    <p>${String((err as Error)?.message ?? err)}</p>
    <p>Greyborn needs a browser with WebGL 2 (recent Chrome, Edge, Firefox or Safari).</p></div>`;
  console.error(err);
}
