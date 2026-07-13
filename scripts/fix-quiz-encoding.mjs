import fs from 'fs';

const path = 'src/data/otherQuizzes.ts';
let t = fs.readFileSync(path, 'utf8');

// Agent corruption pattern: â + € + " (U+201D) used where em/en dash was intended
const corruptDash = '\u00e2\u20ac\u201d'; // â€"

const before = (t.match(/\u00e2\u20ac\u201d/g) || []).length;

// En-dash between digits (e.g. Luke 21:20–21, GC 77.1–77.2)
t = t.replace(/(\d)\u00e2\u20ac\u201d(\d)/g, '$1–$2');
// Remaining → em-dash
t = t.replace(/\u00e2\u20ac\u201d/g, '—');

// Other common mojibake
t = t.replace(/Ã©/g, 'é');
t = t.replace(/Ã¨/g, 'è');
t = t.replace(/D'AubignÃ©/g, "D'Aubigné");

const after = (t.match(/\u00e2\u20ac\u201d/g) || []).length;

fs.writeFileSync(path, t, 'utf8');
console.log(`Fixed â€" sequences: ${before} → ${after} remaining`);
