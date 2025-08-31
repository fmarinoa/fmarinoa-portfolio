import { Locator } from 'tests/fixtures';

export async function extractLocation(locator: Locator): Promise<string> {
  const text = (await locator.textContent()) ?? '';
  const match = /📍\s*(.+)$/.exec(text);
  return match ? match[1].trim() : '';
}
