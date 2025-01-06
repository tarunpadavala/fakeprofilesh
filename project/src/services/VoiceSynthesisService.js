class VoiceSynthesisService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.voice = null;
    this.setupVoice();
  }

  setupVoice() {
    // Wait for voices to be loaded
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        const voices = this.synthesis.getVoices();
        // Select an English voice
        this.voice = voices.find(voice => voice.lang.includes('en-'));
      };
    }
  }

  speak(text, onStart, onEnd) {
    if (!this.synthesis) return;

    // Cancel any ongoing speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) {
      utterance.voice = this.voice;
    }

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = onStart;
    utterance.onend = onEnd;

    this.synthesis.speak(utterance);
  }

  stop() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }
}

export default new VoiceSynthesisService();