import { useState, useCallback } from 'react';
import VoiceRecognitionService from '../services/VoiceRecognitionService';
import VoiceSynthesisService from '../services/VoiceSynthesisService';
import VoiceResponseService from '../services/VoiceResponseService';

export function useVoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const addMessage = useCallback((content, type = 'bot') => {
    setMessages(prev => [...prev, { type, content }]);
    if (type === 'bot') {
      VoiceSynthesisService.speak(content);
    }
  }, []);

  const handleStart = useCallback(() => {
    setIsListening(true);
    VoiceSynthesisService.stop();

    VoiceRecognitionService.startListening(
      (transcript) => {
        setIsListening(false);
        addMessage(transcript, 'user');
        
        const response = VoiceResponseService.getResponse(transcript);
        addMessage(response);
      },
      (error) => {
        setError(error);
        setIsListening(false);
      }
    );
  }, [addMessage]);

  const handleStop = useCallback(() => {
    setIsListening(false);
    VoiceRecognitionService.stopListening();
  }, []);

  return {
    isListening,
    messages,
    error,
    handleStart,
    handleStop
  };
}