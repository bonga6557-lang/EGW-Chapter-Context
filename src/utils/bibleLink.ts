export function splitVerseEntry(verse: string): { reference: string; text: string } {
  const sepIdx = verse.indexOf(' - ');
  if (sepIdx < 0) return { reference: verse.trim(), text: '' };
  return {
    reference: verse.slice(0, sepIdx).trim(),
    text: verse.slice(sepIdx + 3).trim(),
  };
}

/** Opens the passage on Bible Gateway (KJV). */
export function bibleGatewayUrl(reference: string): string {
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(reference)}&version=KJV`;
}
