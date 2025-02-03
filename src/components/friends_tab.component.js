'use client';

import { useState } from 'react';
import { MagnifyingGlassPlusIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function FriendsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [friends] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', username: 'john_doe', avatarUrl: 'https://i.pravatar.cc/301' },
    { id: 2, firstName: 'Jane', lastName: 'Doe', username: 'jane_doe', avatarUrl: 'https://i.pravatar.cc/102' },
  ]);

  const filteredFriends = friends.filter(
    friend =>
      friend.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search for friends..."
            className="w-full px-4 py-2 pl-10 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
          />
          <MagnifyingGlassPlusIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
      </div>

      {/* Search Results Section */}
      {searchTerm && filteredFriends.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Search Results</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFriends.map(friend => (
              <div
                key={friend.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={friend.avatarUrl}
                    alt={`${friend.firstName} ${friend.lastName}`}
                    className="h-12 w-12 rounded-full object-cover"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-600">{`${friend.firstName} ${friend.lastName}`}</h4>
                    <p className="text-sm text-gray-500">{friend.username}</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <UserPlusIcon className="h-6 w-6" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Friends Section */}
      {!searchTerm && (
        <div className="space-y-4 mt-6">
          <h3 className="text-xl font-semibold text-gray-700">My Friends</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {friends.map(friend => (
              <div
                key={friend.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={friend.avatarUrl}
                    alt={`${friend.firstName} ${friend.lastName}`}
                    className="h-12 w-12 rounded-full object-cover"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-600">{`${friend.firstName} ${friend.lastName}`}</h4>
                    <p className="text-sm text-gray-500">{friend.username}</p>
                  </div>
                </div>
                {/* <button className="text-blue-600 hover:text-blue-800">
                  <UserPlusIcon className="h-6 w-6" />
                </button> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
