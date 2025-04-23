import { useState, useEffect } from 'react';
import Head from 'next/head';

// ... existing code ...

// UFC fighters data from ufcwordle.csv
const ufcFighters = [
  { name: "Jon Jones", division: "Heavyweight", age: 36, wins: 27, losses: 1, titleReigns: 2, country: "USA" },
  { name: "Islam Makhachev", division: "Lightweight", age: 32, wins: 25, losses: 1, titleReigns: 1, country: "Russia" },
  { name: "Alexander Volkanovski", division: "Featherweight", age: 35, wins: 26, losses: 3, titleReigns: 1, country: "Australia" },
  { name: "Leon Edwards", division: "Welterweight", age: 32, wins: 21, losses: 3, titleReigns: 1, country: "UK" },
  { name: "Israel Adesanya", division: "Middleweight", age: 34, wins: 24, losses: 3, titleReigns: 2, country: "Nigeria" },
  { name: "Conor McGregor", division: "Lightweight", age: 35, wins: 22, losses: 6, titleReigns: 2, country: "Ireland" },
  { name: "Khabib Nurmagomedov", division: "Lightweight", age: 35, wins: 29, losses: 0, titleReigns: 1, country: "Russia" },
  { name: "Amanda Nunes", division: "Bantamweight", age: 36, wins: 22, losses: 5, titleReigns: 2, country: "Brazil" },
  { name: "Valentina Shevchenko", division: "Flyweight", age: 36, wins: 23, losses: 4, titleReigns: 1, country: "Kyrgyzstan" },
  { name: "Charles Oliveira", division: "Lightweight", age: 34, wins: 34, losses: 9, titleReigns: 1, country: "Brazil" },
];

// Game state interface
interface GameState {
  mysteryFighter: typeof ufcFighters[0] | null;
  guesses: typeof ufcFighters[0][];
  gameOver: boolean;
  won: boolean;
  gaveUp: boolean;
  loading: boolean;
  maxGuesses: number;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFighters, setFilteredFighters] = useState<typeof ufcFighters>([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const [gameState, setGameState] = useState<GameState>({
    mysteryFighter: null,
    guesses: [],
    gameOver: false,
    won: false,
    gaveUp: false,
    loading: true,
    maxGuesses: 8
  });

  // Initialize game on component mount
  useEffect(() => {
    // Select a random fighter as the mystery fighter
    const randomIndex = Math.floor(Math.random() * ufcFighters.length);
    setGameState(prev => ({
      ...prev,
      mysteryFighter: ufcFighters[randomIndex],
      loading: false
    }));
    
    // Check if user has played before
    const hasPlayed = localStorage.getItem('ufcWordleHasPlayed');
    if (hasPlayed) {
      setShowInstructions(false);
    } else {
      localStorage.setItem('ufcWordleHasPlayed', 'true');
    }
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 0) {
      const filtered = ufcFighters.filter(fighter => 
        fighter.name.toLowerCase().includes(term.toLowerCase()) &&
        !gameState.guesses.some(guess => guess.name === fighter.name)
      );
      setFilteredFighters(filtered);
    } else {
      setFilteredFighters([]);
    }
  };

  // Handle fighter selection
  const selectFighter = (fighter: typeof ufcFighters[0]) => {
    setSearchTerm('');
    setFilteredFighters([]);
    
    // Check if fighter is already guessed
    if (gameState.guesses.some(guess => guess.name === fighter.name)) {
      return;
    }
    
    // Check if fighter is the mystery fighter
    const isCorrect = fighter.name === gameState.mysteryFighter?.name;
    
    const newGuesses = [...gameState.guesses, fighter];
    
    setGameState(prev => ({
      ...prev,
      guesses: newGuesses,
      gameOver: isCorrect || newGuesses.length >= prev.maxGuesses,
      won: isCorrect
    }));
  };

  // Handle give up
  const handleGiveUp = () => {
    setGameState(prev => ({
      ...prev,
      gameOver: true,
      gaveUp: true
    }));
  };

  // Handle new game
  const handleNewGame = () => {
    const randomIndex = Math.floor(Math.random() * ufcFighters.length);
    setGameState({
      mysteryFighter: ufcFighters[randomIndex],
      guesses: [],
      gameOver: false,
      won: false,
      gaveUp: false,
      loading: false,
      maxGuesses: 8
    });
  };

  // Check if a property matches the mystery fighter
  const isMatch = (guess: typeof ufcFighters[0], property: keyof typeof ufcFighters[0]) => {
    if (!gameState.mysteryFighter) return false;
    return guess[property] === gameState.mysteryFighter[property];
  };

  // Get directional hint for numeric values
  const getDirectionalHint = (guess: typeof ufcFighters[0], property: 'age' | 'wins' | 'losses' | 'titleReigns') => {
    if (!gameState.mysteryFighter) return null;
    
    if (guess[property] === gameState.mysteryFighter[property]) {
      return null;
    }
    
    if (guess[property] < gameState.mysteryFighter[property]) {
      return <span className={`directionalHint higher`}>↑</span>;
    } else {
      return <span className={`directionalHint lower`}>↓</span>;
    }
  };

  // Share results
  const shareResults = () => {
    if (!gameState.mysteryFighter) return;
    
    let shareText = `UFC Wordle - ${gameState.mysteryFighter.name}\n`;
    shareText += gameState.won ? `I got it in ${gameState.guesses.length}/${gameState.maxGuesses} guesses!` : 'I gave up!';
    shareText += '\n\n';
    
    // Add emoji grid representation of guesses
    gameState.guesses.forEach(guess => {
      const divisionMatch = isMatch(guess, 'division') ? '🟩' : '⬜';
      const ageMatch = isMatch(guess, 'age') ? '🟩' : '⬜';
      const winsMatch = isMatch(guess, 'wins') ? '🟩' : '⬜';
      const lossesMatch = isMatch(guess, 'losses') ? '🟩' : '⬜';
      const titleReignsMatch = isMatch(guess, 'titleReigns') ? '🟩' : '⬜';
      const countryMatch = isMatch(guess, 'country') ? '🟩' : '⬜';
      
      shareText += `${divisionMatch}${ageMatch}${winsMatch}${lossesMatch}${titleReignsMatch}${countryMatch}\n`;
    });
    
    shareText += '\nPlay at: https://ufcwordle.me';
    
    navigator.clipboard.writeText(shareText)
      .then(() => alert('Results copied to clipboard!'))
      .catch(() => alert('Failed to copy results. Please try again.'));
  };

  if (gameState.loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <Head>
        <title>UFC Wordle</title>
        <meta name="description" content="Guess the UFC fighter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">UFC Wordle</h1>
        
        {showInstructions && (
          <div className="instructions">
            <p>Guess the mystery UFC fighter in {gameState.maxGuesses} tries or less!</p>
            <p>Green cells indicate a match with the mystery fighter.</p>
            <p>For numeric values, arrows indicate if the mystery fighter's value is higher (↑) or lower (↓).</p>
            <button 
              className="newGameButton" 
              onClick={() => setShowInstructions(false)}
            >
              Got it!
            </button>
          </div>
        )}
                <div className="fighter-parameters">
          <h2>Fighter Parameters</h2>
          <div className="parameter-boxes">
            <div className="parameter-box division">
              <span>Division</span>
            </div>
            <div className="parameter-box age">
              <span>Age</span>
            </div>
            <div className="parameter-box wins">
              <span>Wins</span>
            </div>
            <div className="parameter-box losses">
              <span>Losses</span>
            </div>
            <div className="parameter-box title-reigns">
              <span>Title Reigns</span>
            </div>
            <div className="parameter-box country">
              <span>Country</span>
            </div>
          </div>
        </div>
        
        {!gameState.gameOver ? (
          <>
            <div className="gameControls">
              <div className="searchContainer">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Start typing to guess a fighter..."
                  className="searchInput"
                />
                {filteredFighters.length > 0 && (
                  <div className="dropdown">
                    {filteredFighters.map((fighter) => (
                      <div 
                        key={fighter.name} 
                        className="dropdownItem"
                        onClick={() => selectFighter(fighter)}
                      >
                        {fighter.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="buttonContainer">
                <button 
                  className="guessButton"
                  onClick={() => {
                    if (filteredFighters.length > 0) {
                      selectFighter(filteredFighters[0]);
                    }
                  }}
                  disabled={filteredFighters.length === 0}
                >
                  Guess
                </button>
                <button 
                  className="giveUpButton"
                  onClick={handleGiveUp}
                  disabled={gameState.guesses.length === 0}
                >
                  Give up
                </button>
              </div>
            </div>

            <div className="guessCount">
              Guesses: {gameState.guesses.length}/{gameState.maxGuesses}
            </div>

            <div className="guessesContainer">
              {gameState.guesses.length > 0 && (
                <table className="guessTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Division</th>
                      <th>Age</th>
                      <th>Wins</th>
                      <th>Losses</th>
                      <th>Title Reigns</th>
                      <th>Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gameState.guesses.map((guess, index) => (
                      <tr key={index}>
                        <td>{guess.name}</td>
                        <td className={isMatch(guess, 'division') ? "match" : ''}>
                          {guess.division}
                        </td>
                        <td className={isMatch(guess, 'age') ? "match" : ''}>
                          {guess.age}
                          {!isMatch(guess, 'age') && getDirectionalHint(guess, 'age')}
                        </td>
                        <td className={isMatch(guess, 'wins') ? "match" : ''}>
                          {guess.wins}
                          {!isMatch(guess, 'wins') && getDirectionalHint(guess, 'wins')}
                        </td>
                        <td className={isMatch(guess, 'losses') ? "match" : ''}>
                          {guess.losses}
                          {!isMatch(guess, 'losses') && getDirectionalHint(guess, 'losses')}
                        </td>
                        <td className={isMatch(guess, 'titleReigns') ? "match" : ''}>
                          {guess.titleReigns}
                          {!isMatch(guess, 'titleReigns') && getDirectionalHint(guess, 'titleReigns')}
                        </td>
                        <td className={isMatch(guess, 'country') ? "match" : ''}>
                          {guess.country}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        ) : (
          <div className="gameOverContainer">
            <h2>The mystery fighter was:</h2>
            <h1 className="mysteryPlayerReveal">
              {gameState.mysteryFighter?.name}
            </h1>
            
            {gameState.won ? (
              <p>You got it in {gameState.guesses.length} tries!</p>
            ) : (
              <p>You {gameState.gaveUp ? 'gave up' : 'ran out of guesses'} after {gameState.guesses.length} guesses.</p>
            )}
            
            <button 
              className="shareButton"
              onClick={shareResults}
            >
              Share Results
            </button>
            
            <button 
              className="newGameButton"
              onClick={handleNewGame}
            >
              New Game
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Created by Diz</p>
        <p>This site is not affiliated with the UFC.</p>
      </footer>
    </div>
  );
}