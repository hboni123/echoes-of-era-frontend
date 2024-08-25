"use client"
import { useState } from 'react';
import axios from 'axios';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [figure, setFigure] = useState('Albert Einstein'); // Default figure
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input || !figure) return;
  
    // Add the user's message to the chat
    const newMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setLoading(true);
  
    try {
      // Make the API call to the backend
      const response = await axios.post('http://13.235.73.127:5000/chat', {
        message: input,
        figure, // Include the selected figure
      });
  
      // Add the AI's response to the chat
      const aiMessage = { text: response.data.response, sender: 'ai' };
      setMessages((prev) => [...prev, aiMessage]);
  
      // If there is an audio response, play it
      if (response.data.audio) {
        const audio = new Audio(`data:audio/mp3;base64,${response.data.audio}`);
        audio.play();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle the error appropriately in the UI
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-2xl font-semibold mb-6">Chat with Historical Figures</h2>
      <div className="w-full max-w-2xl bg-white p-4 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Choose a Historical Figure:</label>
          <input
            type="text"
            placeholder="Enter a historical figure (e.g., Albert Einstein)"
            className="w-full p-2 border rounded"
            value={figure}
            onChange={(e) => setFigure(e.target.value)}
          />
        </div>
        <div className="chat-messages h-64 overflow-y-scroll mb-4">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
              <p className={msg.sender === 'user' ? 'bg-blue-200 p-2 rounded' : 'bg-gray-200 p-2 rounded'}>
                {msg.text}
              </p>
            </div>
          ))}
          {loading && <p className="text-center">Loading...</p>}
        </div>
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
      </div>
    </div>
  );
}
