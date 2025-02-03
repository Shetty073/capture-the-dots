'use client';

import { useState } from 'react';
import Image from 'next/image';

const friendsList = [
  { id: 1, username: 'alice123', firstname: 'Alice', lastname: 'Johnson', avatarUrl: 'https://i.pravatar.cc/1200', invited: false },
  { id: 2, username: 'bob456', firstname: 'Bob', lastname: 'Smith', avatarUrl: 'https://i.pravatar.cc/1150', invited: true },
  { id: 3, username: 'charlie789', firstname: 'Charlie', lastname: 'Brown', avatarUrl: 'https://i.pravatar.cc/1100', invited: false },
  { id: 4, username: 'david101', firstname: 'David', lastname: 'Lee', avatarUrl: 'https://i.pravatar.cc/1050', invited: true },
];

export default function HomeTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePlayClick = () => {
    setIsModalOpen(true);
  };

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    console.log(`Inviting ${friend.username} to play`);
    setIsModalOpen(false); // Close the modal after selecting a friend
  };

  const filteredFriends = friendsList.filter((friend) =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.lastname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Welcome to Connect the Dots</h1>
        <p className="text-lg text-white mb-8">Click on Play to begin</p>

        {/* Play Button */}
        <button
          onClick={handlePlayClick}
          className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 py-3 px-6 bg-blue-600 text-white text-2xl font-semibold rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
        >
          Play
        </button>
      </div>

      {/* Modal for inviting friends */}
      {isModalOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-semibold mb-4 text-gray-400">Invite a Friend</h2>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search for friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <ul className="space-y-4">
              {filteredFriends.map((friend) => (
                <li
                  key={friend.id}
                  className={`flex items-center space-x-4 cursor-pointer hover:bg-gray-200 p-2 rounded-lg ${friend.invited ? 'bg-gray-100' : ''}`}
                  onClick={() => !friend.invited && handleFriendClick(friend)} // Disable click if already invited
                >
                  <Image
                    src={friend.avatarUrl}
                    alt={friend.username}
                    className="h-12 w-12 rounded-full object-cover"
                    width={48}
                    height={48}
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-600">{friend.username}</span>
                    <span className="text-sm text-gray-500">{friend.firstname} {friend.lastname}</span>
                  </div>
                  {friend.invited && (
                    <span className="text-green-500 text-xl">✔</span> // Checkmark if invited
                  )}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
