'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const opponent = {
  avatarUrl: 'https://i.pravatar.cc/100',
  username: 'opponent123',
  score: 0,
};

const me = {
  avatarUrl: 'https://i.pravatar.cc/101',
  username: 'myUsername',
  score: 0,
};

const ROWS = 6;
const COLS = 6;

// Function to initialize dots (fixed 6x6 grid)
const initialDots = () =>
  Array.from({ length: ROWS }, (_, rowIndex) =>
    Array.from({ length: COLS }, (_, colIndex) => ({
      row: rowIndex,
      col: colIndex,
      isConnected: false,
    }))
  );

export default function LevelPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lineStart, setLineStart] = useState(null);
  const [lines, setLines] = useState([]);
  const [gameDots, setGameDots] = useState(initialDots()); // Initialize with fixed grid
  const [timer, setTimer] = useState(30);
  const [dotSize, setDotSize] = useState(20); // Initial dot size

  useEffect(() => {
    const updateDotSize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width < 640) {
          setDotSize(12); // Smaller dots for smaller screens
        } else if (width < 1024) {
          setDotSize(16);
        } else {
          setDotSize(20); // Larger dots for larger screens
        }
      }
    };

    updateDotSize(); // Initial size calculation
    window.addEventListener('resize', updateDotSize); // Update on resize

    return () => window.removeEventListener('resize', updateDotSize);
  }, []);


  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const handleExitClick = () => setIsModalOpen(true);
  const handleConfirmExit = () => setIsModalOpen(false);
  const handleCancelExit = () => setIsModalOpen(false);

  const handleDotClick = (row, col) => {
    if (!lineStart) {
      setLineStart({ row, col });
    } else {
      if (isValidMove(lineStart, { row, col })) {
        setLines([...lines, { start: lineStart, end: { row, col } }]);
        setLineStart(null);
      }
    }
  };

  const isValidMove = (start, end) => {
    const diffRow = Math.abs(start.row - end.row);
    const diffCol = Math.abs(start.col - end.col);
    return (diffRow === 1 && diffCol === 0) || (diffRow === 0 && diffCol === 1);
  };

  return (
    <div className="relative w-full h-screen bg-white flex flex-col">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-white"></div>

      {/* Top Bar */}
      <div className="absolute top-4 left-0 right-0 flex justify-between px-6">
        {/* Opponent Info */}
        <div className="flex items-center space-x-4">
          <Image
            src={opponent.avatarUrl}
            alt="Opponent Avatar"
            className="h-10 w-10 rounded-full object-cover"
            width={40}
            height={40}
          />
          <div>
            <span className="text-lg font-semibold text-red-500">{opponent.username}</span>
            <div className="text-sm text-red-400">Score: {opponent.score}</div>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center font-bold text-xl text-gray-500">
          {String(timer).padStart(2, '0')}:00
        </div>

        {/* My Info */}
        <div className="flex items-center space-x-4">
          <div>
            <span className="text-lg font-semibold text-blue-500">{me.username}</span>
            <div className="text-sm text-blue-400">Score: {me.score}</div>
          </div>
          <Image
            src={me.avatarUrl}
            alt="My Avatar"
            className="h-10 w-10 rounded-full object-cover"
            width={40}
            height={40}
          />
        </div>
      </div>

      {/* Game Board */}
      <div className="absolute top-24 left-0 right-0 bottom-16 flex justify-center items-center">
        <div
          className="relative grid gap-4"
          style={{
            width: '80vw',
            height: '70vh',
            gridTemplateColumns: `repeat(${COLS}, 1fr)`, // Fixed number of columns
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,    // Fixed number of rows
          }}
        >
          {gameDots.map((row, rowIndex) =>
            row.map((dot, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-full h-full bg-blue-500 rounded-full cursor-pointer"
                style={{
                  width: `${dotSize}px`, // Dynamic dot size
                  height: `${dotSize}px`, // Dynamic dot size
                  margin: 'auto',
                  zIndex: 2
                }}
                onClick={() => handleDotClick(rowIndex, colIndex)}
              />
            ))
          )}

          {lines.map((line) => {
            const { start, end } = line;
            const startX = (start.col * 100) / gameDots[0]?.length + 8;
            const startY = (start.row * 100) / gameDots.length + 7;
            const endX = (end.col * 100) / gameDots[0]?.length + 8;
            const endY = (end.row * 100) / gameDots.length + 7;
            const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
            const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
            
            return (
              <div
                key={`${start.row}-${start.col}-${end.row}-${end.col}`}
                className="absolute"
                style={{
                  left: `${startX}%`,
                  top: `${startY}%`,
                  width: `${length}%`,
                  height: '2px',
                  backgroundColor: 'black',
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: 'top left',
                  zIndex: 1,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Exit Button */}
      <button onClick={handleExitClick} className="absolute bottom-4 left-4 py-2 px-4 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700">
        Exit
      </button>

      {/* Exit Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-400">Exit game?</h2>
            <button onClick={handleConfirmExit} className="bg-red-600 px-4 py-2 text-white rounded-lg">Yes</button>
            <button onClick={handleCancelExit} className="ml-4 bg-gray-300 px-4 py-2 text-gray-700 rounded-lg">No</button>
          </div>
        </div>
      )}
    </div>
  );
}
