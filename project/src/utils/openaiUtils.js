import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getAIResponse(userInput) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are DR Locana, an AI assistant specializing in eye health and diabetic retinopathy. Provide clear, accurate, and helpful responses about eye conditions, treatments, and preventive measures. Keep responses concise and easy to understand."
        },
        {
          role: "user",
          content: userInput
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "I apologize, but I'm having trouble processing your request right now. Please try again later.";
  }
}