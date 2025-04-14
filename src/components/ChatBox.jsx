import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

export function ChatBox() {
  const ai = new GoogleGenAI({apiKey:"AIzaSyCknIzetxi5iKUOws1Z_2a4wQPogG9rLIk"})
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI interview assistant. What would you like to practice today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async(e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${userMessage.text}. Please format your response with markdown for better readability.`,
      });
      
      const aiMessage = {
        id: messages.length + 2,
        text: response.text,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      console.log(response.text);
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to format text with proper structure
  const formatMessageContent = (message) => {
    if (message.sender === 'ai') {
      return (
        <div className="ai-formatted-content">
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
      );
    }
    return <p>{message.text}</p>;
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'message-user' : 'message-ai'}`}
          >
            <div className="message-content">
              {formatMessageContent(message)}
              <span className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message message-ai">
            <div className="message-content">
              <p>Typing...</p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input-field"
        />
        <button type="submit" className="chat-send-button" disabled={isLoading}>
          <Send size={20} />
        </button>
      </form>

      <style jsx>{`
        .ai-formatted-content {
          width: 100%;
        }
        .ai-formatted-content h1, 
        .ai-formatted-content h2, 
        .ai-formatted-content h3 {
          margin-top: 16px;
          margin-bottom: 8px;
          font-weight: bold;
        }
        .ai-formatted-content h1 {
          font-size: 1.5rem;
        }
        .ai-formatted-content h2 {
          font-size: 1.3rem;
        }
        .ai-formatted-content h3 {
          font-size: 1.1rem;
        }
        .ai-formatted-content ul, 
        .ai-formatted-content ol {
          margin-left: 20px;
          margin-bottom: 10px;
        }
        .ai-formatted-content li {
          margin-bottom: 4px;
        }
        .ai-formatted-content p {
          margin-bottom: 10px;
        }
        .ai-formatted-content strong {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
