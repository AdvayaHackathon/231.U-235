import  { useState, useRef, useEffect } from 'react';
import {  SendIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useChatStore } from '../store/chat';
import { getGreeting } from '../lib/utils';

function Chat() {
  const [input, setInput] = useState('');
  const { messages, addMessage, isTyping } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage(input, 'user');
    setInput('');
  };
  return (
    <div className="max-w-2xl max-h-[calc(100dvh-10rem)] mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 ">Chat with Luna</h1>
        <p className="text-lg text-gray-600">{getGreeting()}, how can I help you today?</p>
      </header>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="h-[450px] overflow-y-auto mb-4 space-y-1">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleSend}>
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chat;