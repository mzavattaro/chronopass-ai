import { OpenAI } from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not defined in the environment variables');
}

type Request = {
  json: () => Promise<{ base64Encoded: string; age: string }>;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request): Promise<Response> {
  const json = await req.json();
  const { base64Encoded, age } = json;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'system',
        content:
          'This is a photo of a person. Be as accurate as possible in your response. Respond with "1" for yes or "0" for no only. No punctuation or capitization and only lowercase in the response. If you do not know, respond with "skip".',
      },
      {
        role: 'user',
        content: [
          { type: 'text', text: `Does this person look older than ${age}?` },
          {
            type: 'image_url',
            image_url: {
              url: base64Encoded,
            },
          },
        ],
      },
    ],
  });
  return Response.json(response);
}
