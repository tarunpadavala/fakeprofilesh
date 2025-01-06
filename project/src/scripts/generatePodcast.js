import { generateSpeech, VOICES } from '../utils/elevenlabsApi';
import { saveAudioBlob, combineAudioBlobs } from '../utils/audioUtils';

const script = {
  speaker1: [
    "Welcome to our podcast on eye health basics. I'm Dr. James, and today we'll be discussing the fundamentals of maintaining healthy vision.",
    "The eye is a complex organ with multiple components working together. Let's start with the cornea, which is like a window at the front of the eye.",
    "Regular eye check-ups are crucial. I recommend comprehensive exams every 1-2 years, or more frequently if you have specific risk factors."
  ],
  speaker2: [
    "Thank you, Dr. James. I'm Dr. Michael, and I'm excited to share some insights from recent research in eye health.",
    "That's right. The cornea helps focus light, while the lens behind it fine-tunes the focus. The retina then converts light into signals our brain can understand.",
    "Absolutely. Early detection is key. Many eye conditions show no early symptoms, which is why regular screening is so important."
  ]
};

async function generatePodcast() {
  try {
    // Generate audio for each speaker
    const speaker1Audio = await generateSpeech(script.speaker1.join(' '), VOICES.SPEAKER_1);
    const speaker2Audio = await generateSpeech(script.speaker2.join(' '), VOICES.SPEAKER_2);

    // Save individual audio files
    saveAudioBlob(speaker1Audio, 'dr-james.mp3');
    saveAudioBlob(speaker2Audio, 'dr-michael.mp3');

    // Combine audio files (optional)
    const combinedAudio = combineAudioBlobs([speaker1Audio, speaker2Audio]);
    saveAudioBlob(combinedAudio, 'eye-health-basics.mp3');

    return {
      success: true,
      files: {
        speaker1: 'dr-james.mp3',
        speaker2: 'dr-michael.mp3',
        combined: 'eye-health-basics.mp3'
      }
    };
  } catch (error) {
    console.error('Error generating podcast:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export { generatePodcast };