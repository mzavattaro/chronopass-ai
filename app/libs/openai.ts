import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function openAI(base64Image: string, age: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'system',
        content:
          'This is a photo of a person. Be as accurate as possible in your response. Respond with "yes" or "no" only. No punctuation or capitization and only lowercase in the response. If you do not know, respond with "skip".',
      },
      {
        role: 'user',
        content: [
          { type: 'text', text: `Does this person look older than ${age}?` },
          {
            type: 'image_url',
            image_url: {
              url: base64Image,
            },
          },
        ],
      },
    ],
  });
  return response;
}
