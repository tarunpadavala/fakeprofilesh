class VoiceRecognitionService {
  constructor() {
    this.recognition = null;
    this.isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    this.setupRecognition();
  }

  setupRecognition() {
    if (!this.isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';
  }

  startListening(onResult, onError) {
    if (!this.recognition) {
      onError('Speech recognition not supported');
      return;
    }

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      onError(event.error);
    };

    try {
      this.recognition.start();
    } catch (error) {
      onError('Error starting speech recognition');
    }
  }

  stopListening() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}

export default new VoiceRecognitionService();