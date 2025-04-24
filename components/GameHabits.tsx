'use client';

import { useState } from 'react';

interface GameHabitsProps {
  gameTitle?: string; // Game title for UI
}

const GameHabits: React.FC<GameHabitsProps> = ({
  gameTitle = 'UFC Wordle'
}) => {
  // Mock state for UI demonstration
  const [showStatsModal, setShowStatsModal] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'streaks' | 'winRate' | 'fastestWin'>('streaks');
  
  // Mock user stats for display
  const mockUserStats = {
    currentStreak: 5,
    maxStreak: 12,
    totalGames: 25,
    wins: 20,
    averageGuesses: 3.7,
    fastestWin: 2
  };
  
  // Mock username
  const mockUsername = 'UFCChampion';
  
  // Mock leaderboard data
  const mockLeaderboard = [
    { username: 'UFCFanatic', streak: 15, winRate: 92, fastestWin: 2 },
    { username: 'JonesGOAT', streak: 12, winRate: 88, fastestWin: 1 },
    { username: 'OctagonExpert', streak: 10, winRate: 85, fastestWin: 3 },
    { username: 'MMAMaster', streak: 8, winRate: 80, fastestWin: 2 },
    { username: 'FighterFan', streak: 7, winRate: 75, fastestWin: 4 }
  ];
  
  // Mock guess distribution
  const mockDistribution = [
    { guessNumber: 1, frequency: 2 },
    { guessNumber: 2, frequency: 8 },
    { guessNumber: 3, frequency: 15 },
    { guessNumber: 4, frequency: 10 },
    { guessNumber: 5, frequency: 5 },
    { guessNumber: 6, frequency: 3 },
    { guessNumber: 7, frequency: 1 },
    { guessNumber: 8, frequency: 0 }
  ];
  
  const maxFrequency = Math.max(...mockDistribution.map(d => d.frequency), 1);
  
  return (
    <div className="game-habits">
      {/* Streak Display */}
      <div className="streak-display">
        <span className="current-streak">
          🔥 Current Streak: {mockUserStats.currentStreak}
        </span>
        <button 
          className="stats-button"
          onClick={() => setShowStatsModal(true)}
        >
          📊 Stats
        </button>
        <button 
          className="leaderboard-button"
          onClick={() => setShowLeaderboard(true)}
        >
          🏆 Leaderboard
        </button>
      </div>
      
      {/* Stats Modal */}
      {showStatsModal && (
        <div className="modal-overlay" onClick={() => setShowStatsModal(false)}>
          <div className="stats-modal" onClick={e => e.stopPropagation()}>
            <h2>Your {gameTitle} Stats</h2>
            
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-value">{mockUserStats.totalGames}</div>
                <div className="stat-label">Played</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">
                  {Math.round((mockUserStats.wins / mockUserStats.totalGames) * 100)}%
                </div>
                <div className="stat-label">Win Rate</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{mockUserStats.currentStreak}</div>
                <div className="stat-label">Current Streak</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{mockUserStats.maxStreak}</div>
                <div className="stat-label">Max Streak</div>
              </div>
            </div>
            
            <div className="stats-details">
              <div className="stats-row">
                <span>Average Guesses:</span>
                <span>{mockUserStats.averageGuesses.toFixed(1)}</span>
              </div>
              <div className="stats-row">
                <span>Fastest Win:</span>
                <span>{mockUserStats.fastestWin}</span>
              </div>
            </div>
            
            <div className="user-identity">
              <label htmlFor="username">Your Display Name:</label>
              <input 
                type="text" 
                id="username" 
                value={mockUsername} 
                onChange={() => {}} // No-op for demo
                placeholder="Enter your username"
                maxLength={15}
              />
              <p className="username-note">Your name appears on leaderboards</p>
            </div>
            
            <div className="guess-distribution">
              <h3>Guess Distribution</h3>
              <div className="distribution-bar-container">
                {mockDistribution.map(d => (
                  <div className="distribution-row" key={d.guessNumber}>
                    <div className="guess-number">{d.guessNumber}</div>
                    <div 
                      className="distribution-bar" 
                      style={{ 
                        width: `${(d.frequency / maxFrequency) * 100}%`,
                        minWidth: d.frequency > 0 ? '24px' : '0'
                      }}
                    >
                      {d.frequency > 0 && d.frequency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              className="close-modal-button"
              onClick={() => setShowStatsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="modal-overlay" onClick={() => setShowLeaderboard(false)}>
          <div className="leaderboard-modal" onClick={e => e.stopPropagation()}>
            <h2>{gameTitle} Leaderboard</h2>
            
            <div className="leaderboard-tabs">
              <button 
                className={`tab-button ${activeTab === 'streaks' ? 'active' : ''}`}
                onClick={() => setActiveTab('streaks')}
              >
                Current Streaks
              </button>
              <button 
                className={`tab-button ${activeTab === 'winRate' ? 'active' : ''}`}
                onClick={() => setActiveTab('winRate')}
              >
                Win Rate
              </button>
              <button 
                className={`tab-button ${activeTab === 'fastestWin' ? 'active' : ''}`}
                onClick={() => setActiveTab('fastestWin')}
              >
                Fastest Wins
              </button>
            </div>
            
            <div className="leaderboard-table">
              <div className="leaderboard-header">
                <div className="rank-col">Rank</div>
                <div className="player-col">Player</div>
                <div className="value-col">
                  {activeTab === 'streaks' ? 'Streak' : 
                   activeTab === 'winRate' ? 'Win %' : 
                   'Guesses'}
                </div>
              </div>
              
              {mockLeaderboard.map((entry, index) => (
                <div className={`leaderboard-row ${entry.username === mockUsername ? 'is-you' : ''}`} key={index}>
                  <div className="rank-col">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : (index + 1)}
                  </div>
                  <div className="player-col">
                    {entry.username}
                    {entry.username === mockUsername && <span className="you-badge">YOU</span>}
                  </div>
                  <div className="value-col">
                    {activeTab === 'streaks' ? entry.streak : 
                     activeTab === 'winRate' ? `${entry.winRate}%` : 
                     entry.fastestWin}
                  </div>
                </div>
              ))}
              
              {/* User's position if not in top 5 */}
              {!mockLeaderboard.some(entry => entry.username === mockUsername) && (
                <>
                  <div className="leaderboard-divider">...</div>
                  <div className="leaderboard-row is-you">
                    <div className="rank-col">42</div>
                    <div className="player-col">
                      {mockUsername}
                      <span className="you-badge">YOU</span>
                    </div>
                    <div className="value-col">
                      {activeTab === 'streaks' ? mockUserStats.currentStreak : 
                       activeTab === 'winRate' ? 
                       `${Math.round((mockUserStats.wins / mockUserStats.totalGames) * 100)}%` : 
                       mockUserStats.fastestWin}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="leaderboard-footer">
              <p>Leaderboards reset weekly. Next reset: Sunday</p>
              <p>Play daily to maintain your streak!</p>
            </div>
            
            <button 
              className="close-modal-button"
              onClick={() => setShowLeaderboard(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Streak achievement notification can be added for demo UI */}
      <div className="streak-achievement">
        <div className="achievement-icon">🔥</div>
        <div className="achievement-text">
          5-day streak! Keep it going!
        </div>
        <div className="achievement-cta">
          Come back tomorrow for a new challenge!
        </div>
      </div>
    </div>
  );
};

export default GameHabits;