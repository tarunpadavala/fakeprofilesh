import OpenAI from 'openai';
import axios from 'axios';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID_1 = "ErXwobaYiN019PkySvjV"; // Antoni voice
const VOICE_ID_2 = "VR6AewLTigWG4xSOukaG"; // Josh voice

// Generate podcast script using OpenAI
async function generateScript() {
  const prompt = `Create a natural dialogue script between Dr. James (a senior ophthalmologist) and Dr. Michael (a medical researcher) discussing eye health basics. 
  The conversation should cover:
  - Basic eye anatomy
  - Common eye problems
  - Prevention tips
  - The importance of regular check-ups
  Format it as a conversation with speaker labels.
  Keep it engaging, informative, and around 5 minutes when spoken.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}

// Generate audio using ElevenLabs API
async function generateAudio(text, voiceId) {
  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      text: text,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5
      }
    },
    {
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer'
    }
  );

  return response.data;
}

// Process the script and generate audio
async function createPodcast() {
  try {
    // Generate script
    const script = await generateScript();
    console.log("Script generated successfully");

    // Split script into parts for each speaker
    const drJamesParts = script
      .split('\n')
      .filter(line => line.startsWith('Dr. James:'))
      .map(line => line.replace('Dr. James:', '').trim());

    const drMichaelParts = script
      .split('\n')
      .filter(line => line.startsWith('Dr. Michael:'))
      .map(line => line.replace('Dr. Michael:', '').trim());

    // Generate audio for each speaker
    const drJamesAudio = await generateAudio(drJamesParts.join(' '), VOICE_ID_1);
    const drMichaelAudio = await generateAudio(drMichaelParts.join(' '), VOICE_ID_2);

    // Save the audio files (implementation depends on your storage solution)
    // For this example, we'll assume saving to public/podcasts/
    // You'll need to implement the actual file saving logic
    
    console.log("Podcast created successfully");
    return {
      script,
      audioFiles: {
        drJames: drJamesAudio,
        drMichael: drMichaelAudio
      }
    };
  } catch (error) {
    console.error("Error creating podcast:", error);
    throw error;
  }
}

export { createPodcast };