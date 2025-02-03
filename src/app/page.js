'use client';

import { useState } from 'react';
import { HomeIcon, UsersIcon, ChatBubbleLeftIcon, TrophyIcon } from '@heroicons/react/24/outline';
import HomeTab from '@/components/home_tab.component'
import FriendsTab from '@/components/friends_tab.component'
import ChatTab from '@/components/chat_tab.component'
import LeaderboardTab from '@/components/leaderboard_tab.component'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left-side Navbar for Desktop */}
      <div className="hidden lg:flex flex-col bg-blue-600 w-1/4 p-6">
        <h1 className="text-white text-3xl font-bold mb-10">Connect the Dots</h1>
        <div className="space-y-6">
          <TabLink
            label="Home"
            tabName="home"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            icon={<HomeIcon className="h-6 w-6" />}
          />
          <TabLink
            label="Friends"
            tabName="friends"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            icon={<UsersIcon className="h-6 w-6" />}
          />
          <TabLink
            label="Chat"
            tabName="chat"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            icon={<ChatBubbleLeftIcon className="h-6 w-6" />}
          />
          <TabLink
            label="Leaderboards"
            tabName="leaderboards"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            icon={<TrophyIcon className="h-6 w-6" />}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <div>
          {activeTab === 'home' && <HomeTab></HomeTab>}
          {activeTab === 'friends' && <FriendsTab></FriendsTab>}
          {activeTab === 'chat' && <ChatTab></ChatTab>}
          {activeTab === 'leaderboards' && <LeaderboardTab></LeaderboardTab>}
        </div>
      </div>

      {/* Bottom Navbar for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-blue-600 p-3">
        <div className="flex justify-around">
          <TabLink
            label="Home"
            tabName="home"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            icon={<HomeIcon className="h-6 w-6" />}
            isMobile
          />
          <TabLink
            label="Friends"
            tabName="friends"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            icon={<UsersIcon className="h-6 w-6" />}
            isMobile
          />
          <TabLink
            label="Chat"
            tabName="chat"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            icon={<ChatBubbleLeftIcon className="h-6 w-6" />}
            isMobile
          />
          <TabLink
            label="Leaderboards"
            tabName="leaderboards"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            icon={<TrophyIcon className="h-6 w-6" />}
            isMobile
          />
        </div>
      </div>
    </div>
  );
}

const TabLink = ({ label, tabName, activeTab, setActiveTab, icon, isMobile = false }) => {
  return (
    <button
      className={`${activeTab === tabName
          ? 'bg-blue-700 text-white'
          : 'text-blue-300 hover:text-white'
        } w-full py-2 px-4 rounded-md text-lg flex items-center space-x-2 focus:outline-none`}
      onClick={() => setActiveTab(tabName)}
    >
      <span>{icon}</span>
      {!isMobile && <span>{label}</span>} {/* Hide text on mobile for a cleaner look */}
    </button>
  );
};
