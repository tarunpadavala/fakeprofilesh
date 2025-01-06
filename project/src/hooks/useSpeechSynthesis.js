import { useState, useEffect, useCallback } from 'react';

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setError('Speech synthesis not supported');
      return;
    }

    function loadVoices() {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    }

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback((text) => {
    if (!('speechSynthesis' in window)) {
      setError('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Select an English voice
    const englishVoice = voices.find(voice => voice.lang.includes('en-'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      setError(`Speech synthesis error: ${event.error}`);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [voices]);

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return {
    speak,
    cancel,
    isSpeaking,
    error,
    voices
  };
}