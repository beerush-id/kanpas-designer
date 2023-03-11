import icons from '@data/google-icons.json';

export async function GET() {
  return new Response(JSON.stringify(icons));
}
