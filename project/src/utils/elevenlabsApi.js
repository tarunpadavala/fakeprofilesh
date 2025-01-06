import axios from 'axios';

const ELEVENLABS_API_KEY = 'sk_febffd608be5e320a31295cad8ea095accaa3dd4d6ead9b1';
const API_URL = 'https://api.elevenlabs.io/v1/text-to-speech';

// Voice IDs for our two speakers
const VOICES = {
  SPEAKER_1: "ErXwobaYiN019PkySvjV", // Antoni voice
  SPEAKER_2: "VR6AewLTigWG4xSOukaG"  // Josh voice
};

export async function generateSpeech(text, voiceId) {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/${voiceId}`,
      data: {
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      },
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer'
    });

    return response.data;
  } catch (error) {
    console.error('Error generating speech:', error);
    throw error;
  }
}

export { VOICES };