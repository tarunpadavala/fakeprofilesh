import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash, FaRobot, FaTimes } from 'react-icons/fa';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import VoiceSynthesisService from '../services/VoiceSynthesisService';
import { voiceAssistantData } from '../data/voiceAssistantData';

function VoiceAssistant() {
  const {
    isListening,
    isProcessing,
    messages,
    error,
    handleStart,
    handleStop
  } = useVoiceAssistant();

  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClose = () => {
    handleStop();
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (isListening) {
      handleStop();
    } else {
      setIsOpen(true);
      // Speak the initial greeting
      VoiceSynthesisService.speak(voiceAssistantData.greetings.initial);
      handleStart();
    }
  };

  return (
    <div className="relative z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-colors ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
        }`}
      >
        {isListening ? <FaMicrophoneSlash className="w-6 h-6" /> : <FaMicrophone className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Rest of the component remains the same */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default VoiceAssistant;