/**
 * Simplified Porter Stemmer
 * Reduces words to their root form (e.g., "running" -> "run", "policies" -> "polici")
 */
export function stem(word: string): string {
  if (word.length < 3) return word;

  let w = word.toLowerCase();

  // Step 1a
  if (w.endsWith("sses")) w = w.slice(0, -2);
  else if (w.endsWith("ies")) w = w.slice(0, -2); // simplified
  else if (w.endsWith("ss")) w = w;
  else if (w.endsWith("s")) w = w.slice(0, -1);

  // Step 1b
  if (w.endsWith("eed")) {
    if (w.length > 4) w = w.slice(0, -1);
  } else if (w.endsWith("ed") && w.length > 3) {
    w = w.slice(0, -2);
  } else if (w.endsWith("ing") && w.length > 4) {
    w = w.slice(0, -3);
  }

  // Step 2 (simplified)
  if (w.endsWith("ational")) w = w.replace("ational", "ate");
  else if (w.endsWith("tional")) w = w.replace("tional", "tion");
  else if (w.endsWith("enci")) w = w.replace("enci", "ence");
  else if (w.endsWith("anci")) w = w.replace("anci", "ance");
  else if (w.endsWith("izer")) w = w.replace("izer", "ize");
  else if (w.endsWith("bli")) w = w.replace("bli", "ble");
  else if (w.endsWith("alli")) w = w.replace("alli", "al");
  else if (w.endsWith("entli")) w = w.replace("entli", "ent");
  else if (w.endsWith("eli")) w = w.replace("eli", "e");
  else if (w.endsWith("ousli")) w = w.replace("ousli", "ous");

  return w;
}
