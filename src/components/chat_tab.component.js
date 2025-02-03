'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PaperAirplaneIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function ChatTab() {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');

  const chats = [
    { id: 1, name: 'John Doe', avatarUrl: 'https://i.pravatar.cc/301' },
    { id: 2, name: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/102' },
  ];

  const [messages, setMessages] = useState([
    { chatId: 1, messages: [{ sender: 'current_user', content: 'Hey there!' }, { sender: 'friend', content: 'Hello! How are you?' }] },
    { chatId: 2, messages: [{ sender: 'current_user', content: 'What’s up?' }, { sender: 'friend', content: 'All good! How about you?' }] },
  ]);

  const selectedChatMessages = activeChat ? messages.find(chat => chat.chatId === activeChat).messages : [];
  const currentChat = chats.find(chat => chat.id === activeChat);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add new message to the active chat's message array
      const newMessage = { sender: 'current_user', content: message };
      const updatedMessages = messages.map(chat => {
        if (chat.chatId === activeChat) {
          return { ...chat, messages: [...chat.messages, newMessage] };
        }
        return chat;
      });

      setMessages(updatedMessages);
      setMessage(''); // Clear the input field after sending
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6">
      {!activeChat ? (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Chats</h3>
          <div className="space-y-4">
            {chats.map(chat => (
              <div
                key={chat.id}
                className="flex items-center justify-between p-4 rounded-lg shadow-md bg-white hover:bg-gray-200 cursor-pointer"
                onClick={() => setActiveChat(chat.id)}
              >
                <div className="flex items-center space-x-4">
                  <Image src={chat.avatarUrl} alt={chat.name} className="h-12 w-12 rounded-full object-cover" width={48} height={48} />
                  <h4 className="font-semibold text-lg text-gray-600">{chat.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          {/* Chat Header */}
          <div className="flex items-center space-x-4 mb-4">
            <button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
              onClick={() => setActiveChat(null)}
            >
              <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
            </button>
            <h3 className="text-2xl font-semibold text-gray-700">Chat with {currentChat?.name}</h3>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-auto space-y-4 mb-4 p-4 bg-white rounded-lg shadow-md">
            {selectedChatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'current_user' ? 'justify-end' : 'justify-start'} mb-4`}>
                {msg.sender !== 'current_user' && <Image src={currentChat.avatarUrl} alt={currentChat.name} className="h-8 w-8 rounded-full object-cover mr-3" width={32} height={32} />}
                <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === 'current_user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input and Send Button */}
          <div className="flex items-center p-4 bg-white border-t border-gray-300 shadow-lg">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
            />
            <button onClick={handleSendMessage} className="ml-3">
              <PaperAirplaneIcon className="h-6 w-6 text-blue-500 cursor-pointer" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
