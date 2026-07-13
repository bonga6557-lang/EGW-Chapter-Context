import fs from 'fs';
import path from 'path';

const dir = 'src/data';
const files = fs.readdirSync(dir)
  .filter(f => /^gc-\d+\.ts$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

const issues = [];
const stats = { files: 0, hist: 0, schol: 0, verbatim: 0, paraphrase: 0, summary: 0, missingUrl: 0, missingNote: 0 };

const attributive = /(argues|states|records|treats|examines|shows|traces|presents|notes|reports|companion summary|White (states|records|argues|reports|describes)|according to|via White|per White|historian|scholar|condensed|standard English sense|The Council|Companion)/i;

function auditSection(file, sectionName, content, fieldName) {
  const entries = content.split(/\n    \},?\n/).filter(s => s.includes('quoteType'));
  for (const entry of entries) {
    const qt = entry.match(/quoteType: '([^']+)'/)?.[1];
    const quoteMatch = entry.match(new RegExp(`${fieldName}: "([\\s\\S]*?)"`)) || entry.match(new RegExp(`${fieldName}: '([\\s\\S]*?)'`));
    const quote = quoteMatch?.[1]?.replace(/\s+/g, ' ').trim();
    const hasUrl = /sourceUrl:/.test(entry);
    const hasNote = /verifyNote:/.test(entry);
    if (!hasUrl) {
      stats.missingUrl++;
      issues.push({ file, severity: 'error', issue: `${sectionName} missing sourceUrl`, qt });
    }
    if (!hasNote) {
      stats.missingNote++;
      issues.push({ file, severity: 'error', issue: `${sectionName} missing verifyNote`, qt });
    }
    if (qt === 'summary' && quote && !attributive.test(quote)) {
      issues.push({ file, severity: 'warn', issue: `${sectionName} summary without attributive voice`, snippet: quote.slice(0, 100) });
    }
    if (qt && stats[qt] !== undefined) stats[qt]++;
    else if (qt) stats[qt] = (stats[qt] || 0) + 1;
  }
}

for (const f of files) {
  const text = fs.readFileSync(path.join(dir, f), 'utf8');
  stats.files++;

  const afSection = text.match(/argumentFlow: \[([\s\S]*?)\],\s*\n\s*hardPhrases/);
  const afCount = afSection ? (afSection[1].match(/\{\s*\n\s*title:/g) || []).length : 0;
  if (afCount !== 8) issues.push({ file: f, severity: 'warn', issue: `argumentFlow count ${afCount} (expected 8)` });

  const histMatch = text.match(/historicalSources: \[([\s\S]*?)\],\s*\n\s*egwQuotes/);
  const scholMatch = text.match(/scholarlyReferences: \[([\s\S]*?)\],\s*\n\s*discussionQuestions/);

  if (histMatch) {
    const histCount = (histMatch[1].match(/quoteType:/g) || []).length;
    stats.hist += histCount;
    if (histCount !== 8) issues.push({ file: f, severity: 'warn', issue: `historicalSources count ${histCount} (expected 8)` });
    auditSection(f, 'historicalSource', histMatch[1], 'quote');
  }

  if (scholMatch) {
    const scholCount = (scholMatch[1].match(/quoteType:/g) || []).length;
    stats.schol += scholCount;
    if (scholCount !== 2) issues.push({ file: f, severity: 'warn', issue: `scholarlyReferences count ${scholCount} (expected 2)` });
    auditSection(f, 'scholarlyRef', scholMatch[1], 'directQuote');
  }

  if (/quoteType: 'unverified'/.test(text)) issues.push({ file: f, severity: 'error', issue: 'contains unverified quoteType' });
  if (/gutenberg\.org\/ebooks\/60208/.test(text)) issues.push({ file: f, severity: 'error', issue: 'wrong Gutenberg ID #60208' });

  // EGW quotes - check reference format
  const egwSection = text.match(/egwQuotes: \[([\s\S]*?)\],\s*\n\s*scholarlyReferences/);
  if (egwSection) {
    const refs = [...egwSection[1].matchAll(/reference: "([^"]+)"/g)].map(m => m[1]);
    for (const ref of refs) {
      if (!/The Great Controversy, p\. \d+\.\d+/.test(ref)) {
        issues.push({ file: f, severity: 'warn', issue: `EGW reference format: ${ref}` });
      }
    }
  }
}

// gc-1 inline
const dataTs = fs.readFileSync('src/data.ts', 'utf8');
const gc1 = dataTs.match(/id: "gc-1"[\s\S]*?historicalSources: \[([\s\S]*?)\],\s*\n\s*egwQuotes/);
if (gc1) {
  const c = (gc1[1].match(/quoteType:/g) || []).length;
  if (c !== 8) issues.push({ file: 'data.ts gc-1', severity: 'warn', issue: `historicalSources count ${c}` });
  if (/60208/.test(gc1[1])) issues.push({ file: 'data.ts gc-1', severity: 'error', issue: 'wrong Gutenberg 60208' });
  auditSection('data.ts gc-1', 'historicalSource', gc1[1], 'quote');
}

const errors = issues.filter(i => i.severity === 'error');
const warns = issues.filter(i => i.severity === 'warn');

console.log('=== GC CITATION AUDIT ===');
console.log('Files audited:', stats.files, '+ gc-1');
console.log('Historical entries:', stats.hist);
console.log('Scholarly entries:', stats.schol);
console.log('quoteType counts:', { verbatim: stats.verbatim, paraphrase: stats.paraphrase, summary: stats.summary });
console.log('ERRORS:', errors.length);
errors.forEach(e => console.log('  ', JSON.stringify(e)));
console.log('WARNINGS:', warns.length);
warns.forEach(w => console.log('  ', JSON.stringify(w)));

process.exit(errors.length > 0 ? 1 : 0);
