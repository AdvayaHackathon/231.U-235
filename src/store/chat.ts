import { create } from 'zustand';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatState {
  messages: Message[];
  addMessage: (content: string, sender: 'user' | 'assistant') => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
}

const mockResponses = [
  "I understand you're feeling this way. Can you tell me more about what's troubling you?",
  "That sounds challenging. How long have you been experiencing these feelings?",
  "You're not alone in this. What kind of support would be most helpful right now?",
  "I hear you. Let's explore some coping strategies that might help you feel better.",
  "Your feelings are valid. Would you like to try some breathing exercises together?",
];

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isTyping: false,
  setIsTyping: (typing) => set({ isTyping: typing }),
  addMessage: (content, sender) => {
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Math.random().toString(36).substring(7),
          content,
          sender,
          timestamp: new Date(),
        },
      ],
    }));

    if (sender === 'user') {
      set({ isTyping: true });
      setTimeout(() => {
        const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: Math.random().toString(36).substring(7),
              content: response,
              sender: 'assistant',
              timestamp: new Date(),
            },
          ],
          isTyping: false,
        }));
      }, 1500);
    }
  },
}));