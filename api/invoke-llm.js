import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const allowedOrigin = req.headers.origin;

  if (allowedOrigin && allowedOrigin.endsWith('.vercel.app')) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  } 

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }


  // ✅ Handle POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4', // Use 'gpt-4' unless you're explicitly approved for 'gpt-5'
      messages: [
        { role: 'system', content: 'You are ChatGPT, a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    });

    res.status(200).json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'OpenAI API error' });
  }
}
