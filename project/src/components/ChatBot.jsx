import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';
import { processUserInput } from '../utils/chatbotUtils';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m D R Locana, your AI assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: input }]);

    // Get AI response
    const response = await processUserInput(input);
    setMessages(prev => [...prev, { type: 'bot', content: response }]);
    
    setInput('');
  };

  return (
    <div className="relative z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
      >
        <FaRobot className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
              <h3 className="text-lg font-semibold text-white">D R Locana</h3>
              <p className="text-sm text-blue-100">Your AI Assistant</p>
            </div>

            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 mb-4 ${
                    message.type === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user'
                        ? 'bg-green-500'
                        : 'bg-blue-500'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <FaUser className="w-4 h-4 text-white" />
                    ) : (
                      <FaRobot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-white shadow-md'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FaPaperPlane className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatBot;