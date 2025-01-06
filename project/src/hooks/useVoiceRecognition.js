import { useState, useEffect, useCallback } from 'react';

export function useVoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);
    };

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    // Store recognition instance in window to prevent garbage collection
    window.recognitionInstance = recognition;

    return () => {
      if (isListening) {
        recognition.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (window.recognitionInstance) {
      try {
        window.recognitionInstance.start();
      } catch (err) {
        if (err.name === 'NotAllowedError') {
          setError('Please allow microphone access to use voice recognition');
        } else {
          setError('Error starting speech recognition');
        }
        setIsListening(false);
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    if (window.recognitionInstance) {
      window.recognitionInstance.stop();
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript
  };
}