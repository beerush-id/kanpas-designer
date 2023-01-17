import { json } from '@sveltejs/kit';

export async function GET() {
  return new Response('[{"title": "Home"}]')
}
