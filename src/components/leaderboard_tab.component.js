'use client';

import Image from 'next/image';
import { CheckBadgeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const topPlayers = [
  { rank: 1, name: 'John Doe', avatarUrl: 'https://i.pravatar.cc/1200', score: 1200 },
  { rank: 2, name: 'Jane Smith', avatarUrl: 'https://i.pravatar.cc/1150', score: 1150 },
  { rank: 3, name: 'Sam Wilson', avatarUrl: 'https://i.pravatar.cc/1100', score: 1100 },
  { rank: 4, name: 'Emily Clark', avatarUrl: 'https://i.pravatar.cc/1050', score: 1050 },
  { rank: 5, name: 'James Bond', avatarUrl: 'https://i.pravatar.cc/1000', score: 1000 },
  { rank: 6, name: 'Mary Johnson', avatarUrl: 'https://i.pravatar.cc/950', score: 950 },
  { rank: 7, name: 'Chris Lee', avatarUrl: 'https://i.pravatar.cc/900', score: 900 },
  { rank: 8, name: 'Anna Parker', avatarUrl: 'https://i.pravatar.cc/850', score: 850 },
  { rank: 9, name: 'Jack Martin', avatarUrl: 'https://i.pravatar.cc/800', score: 800 },
  { rank: 10, name: 'Lucy Brown', avatarUrl: 'https://i.pravatar.cc/750', score: 750 },
];

const achievements = [
  { id: 1, name: 'First Victory', description: 'Win your first game.', unlocked: true },
  { id: 2, name: 'Master Strategist', description: 'Complete 50 strategic moves.', unlocked: true },
  { id: 3, name: 'Sharp Shooter', description: 'Achieve a perfect score in shooting.', unlocked: false },
  { id: 4, name: 'Speed Demon', description: 'Complete a level in under 2 minutes.', unlocked: false },
  { id: 5, name: 'Team Player', description: 'Assist in 10 team victories.', unlocked: true },
  { id: 6, name: 'Untouchable', description: 'Go 5 games without losing.', unlocked: false },
  { id: 7, name: 'MVP', description: 'Be the MVP in 3 matches.', unlocked: true },
  { id: 8, name: 'Speed Runner', description: 'Complete a game in record time.', unlocked: true },
  { id: 9, name: 'Legendary', description: 'Reach level 100.', unlocked: false },
  { id: 10, name: 'Perfectionist', description: 'Complete the game without any mistakes.', unlocked: false },
];

export default function LeaderboardTab() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6">
      {/* Top Players Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Top 10 Players</h3>
        <div className="space-y-4">
          {topPlayers.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 ${player.rank === 1
                  ? 'bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600'
                  : player.rank === 2
                    ? 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500'
                    : player.rank === 3
                      ? 'bg-gradient-to-r from-orange-300 via-orange-500 to-orange-600'
                      : ''
                }`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-gray-600">{player.rank}</span>
                <Image
                  src={player.avatarUrl}
                  alt={player.name}
                  className="h-12 w-12 rounded-full object-cover"
                  width={48}
                  height={48}
                />
                <span className="text-lg font-semibold text-gray-600">{player.name}</span>
              </div>
              <div className="text-lg font-semibold text-gray-600">{player.score}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Achievements</h3>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-center justify-between p-4 rounded-lg ${achievement.unlocked ? 'bg-blue-50 hover:bg-blue-100' : 'bg-gray-100'
                }`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`h-8 w-8 ${achievement.unlocked ? 'bg-blue-500' : 'bg-gray-400'
                    } rounded-full flex items-center justify-center`}
                >
                  {achievement.unlocked ? (
                    <CheckBadgeIcon className="h-5 w-5 text-white" />
                  ) : (
                    <LockClosedIcon className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-600">{achievement.name}</span>
                  <span className="text-sm text-gray-500">{achievement.description}</span>
                </div>
              </div>
              {achievement.unlocked && <span className="text-lg font-semibold text-blue-500">Unlocked</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
