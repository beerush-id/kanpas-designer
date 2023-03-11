import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'svelte-parse';
import * as url from 'url';

export async function GET() {
  const dirname = url.fileURLToPath(new URL('.', import.meta.url));
  const sample = readFileSync(join(dirname, './Sample.svelte'), 'utf-8');
  const result = parse({
    value: sample,
    generatePositions: false,
  });

  return new Response(JSON.stringify(result, null, 2));
}
