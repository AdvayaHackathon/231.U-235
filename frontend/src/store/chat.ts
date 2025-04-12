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
        fetch("http://localhost:3000/groq", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: content, // Use the user's input dynamically
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data)
            set((state) => ({
              messages: [
                ...state.messages,
                {
                  id: Math.random().toString(36).substring(7),
                  content: data,
                  sender: 'assistant',
                  timestamp: new Date(),
                },
              ],
              isTyping: false,
            }));
          })
          .catch((error) => {
            console.error("Error:", error);
            set((state) => ({
              messages: [
                ...state.messages,
                {
                  id: Math.random().toString(36).substring(7),
                  content: "Sorry, I couldn't process your request. Please try again.",
                  sender: 'assistant',
                  timestamp: new Date(),
                },
              ],
              isTyping: false,
            }));
          });
      }, 1500);
    }
  },
}));