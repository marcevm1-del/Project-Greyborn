// Ability icons as simple SVG glyphs (Version B §13: no Unicode symbols, which
// render differently per font). 24 × 24 viewBox, drawn with currentColor.

const svg = (body: string) =>
  `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const GLYPHS: Record<string, string> = {
  // Titan
  'Quake Slam': '<circle cx="12" cy="14" r="3"/><path d="M4 14a8 5 0 0 0 16 0M7 6l2 4M17 6l-2 4M12 4v5"/>',
  Bulwark: '<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/>',
  'Rampart Charge': '<path d="M3 12h13M12 6l6 6-6 6M20 5v14"/>',
  Avalanche: '<path d="M2 20l7-12 4 6 3-4 6 10z"/><circle cx="17" cy="6" r="2"/>',
  Fortress: '<path d="M4 20V8l3 2V6l5 3 5-3v4l3-2v12z"/><path d="M10 20v-5h4v5"/>',
  // Brawler
  'Roll Commit': '<path d="M20 12a8 8 0 1 1-3-6.3"/><path d="M17 2v4h4"/>',
  Haymaker: '<rect x="6" y="9" width="11" height="9" rx="3"/><path d="M8 9V6M11 9V5M14 9V6M17 12h3"/>',
  Grapple: '<path d="M6 4v7a6 6 0 0 0 12 0V4"/><path d="M9 4v5M15 4v5"/>',
  Frenzy: '<path d="M12 2l2 6 6-2-4 5 5 4-6 0 1 6-4-5-4 5 1-6-6 0 5-4-4-5 6 2z"/>',
  'Shove of the Storm': '<path d="M3 12h4M5 7l5 5-5 5M12 6c4 2 4 10 0 12M16 4c6 3 6 13 0 16"/>',
  // Verdant
  'Bramble Wall': '<path d="M3 20h18M5 20V12M9 20V9M13 20V10M17 20V8M21 20v-7"/><path d="M5 12l-2-2M9 9l2-2M13 10l-2-2M17 8l2-2"/>',
  'Sap Draw': '<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/><path d="M12 11v6M9 14h6"/>',
  Entangle: '<path d="M4 20c4-2 4-8 8-8s4 6 8 8"/><path d="M8 18c0-4 8-4 8-10M16 18c0-4-8-4-8-10"/>',
  Thornstorm: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"/>',
  Overgrowth: '<path d="M12 21V11"/><path d="M12 11c0-4-3-6-7-6 0 4 3 6 7 6zM12 14c0-4 3-6 7-6 0 4-3 6-7 6z"/><path d="M4 21h16"/>',
  // Hollow
  'Void Rift': '<ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="4" ry="1.5"/>',
  'Hollow Step': '<circle cx="6" cy="12" r="2" stroke-dasharray="2 2"/><circle cx="18" cy="12" r="2.5"/><path d="M9 12h6"/>',
  'Null Pulse': '<circle cx="12" cy="12" r="2"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="10" stroke-dasharray="3 3"/>',
  Collapse: '<path d="M4 4l6 6M20 4l-6 6M4 20l6-6M20 20l-6-6"/><circle cx="12" cy="12" r="2.5"/>',
  'Event Horizon': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4" fill="currentColor"/>',
};

export const LOCK = svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>');
const DOT = svg('<circle cx="12" cy="12" r="4"/>');

/** SVG markup for an ability's icon. */
export function abilityIcon(name: string): string {
  const g = GLYPHS[name];
  return g ? svg(g) : DOT;
}
