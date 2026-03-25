import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  const response = await fetch(
    'https://partners.api.skyscanner.net/apiservices/v3/autosuggest/carhire',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.SKYSCANNER_API_KEY,
      },
      body: JSON.stringify(body),
    }
  );

  const text = await response.text();
  const data = text ? JSON.parse(text) : { error: 'Empty response from Skyscanner API', status: response.status };
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { 'Content-Type': 'application/json' },
  });
};
