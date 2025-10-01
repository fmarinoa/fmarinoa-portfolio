import { getUrl } from '@/lib/content'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  try {
    const cvUrl = await getUrl('cv')

    if (!cvUrl || typeof cvUrl !== 'string' || !cvUrl.trim()) {
      return new Response(JSON.stringify({ error: 'CV URL not configured' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ cvUrl: cvUrl.trim() }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('API Error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
