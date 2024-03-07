export function toTitleCase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function generateRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
