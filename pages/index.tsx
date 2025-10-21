import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import GameHabits from '@/components/GameHabits';
import Header from '@/components/Header';


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
    <>
    <Header/>
      <SEO
        title="UFC Wordle - Guess the Mystery UFC Fighter"
        description="Dive into the exciting world of UFC with UFC Wordle, the ultimate guessing game for MMA enthusiasts. Test your knowledge of UFC fighters by guessing the mystery fighter in a limited number of tries. Engage in a fun and challenging way to learn more about your favorite UFC stars and their achievements."
        url="https://www.ufcwordle.com"
        image="/wordle.png"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://www.ufcwordle.com",
          "name": "UFC Wordle",
          "description": "Dive into the exciting world of UFC with UFC Wordle, the ultimate guessing game for MMA enthusiasts.",
          "image": "https://www.ufcwordle.com/favicon.ico"
        }} />
    <div className="container">

      <main className="main">
        <h1 className="title">UFC Wordle</h1>

          <div className="instructions">
            <p>Guess the mystery UFC fighter in {gameState.maxGuesses} tries or less!</p>
            <p>Green cells indicate a match with the mystery fighter.</p>
            <p>For numeric values, arrows indicate if the mystery fighter's value is higher (↑) or lower (↓).</p>
           
          </div>
        
        <div className="fighter-parameters ">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Fighter Parameters</h2>
          <div className="parameter-boxes">
            <div className="parameter-box division bg-gradient-to-r from-purple-600 to-blue-500 shadow">
              <span>Division</span>
            </div>
            <div className="parameter-box age bg-gradient-to-r from-purple-600 to-blue-500">
              <span>Age</span>
            </div>
            <div className="parameter-box wins bg-gradient-to-r from-purple-600 to-blue-500">
              <span>Wins</span>
            </div>
            <div className="parameter-box losses bg-gradient-to-r from-purple-600 to-blue-500">
              <span>Losses</span>
            </div>
            <div className="parameter-box title-reigns bg-gradient-to-r from-purple-600 to-blue-500">
              <span>Title Reigns</span>
            </div>
            <div className="parameter-box country bg-gradient-to-r from-purple-600 to-blue-500">
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
                  className="searchInput" />
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
                  } }
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


      {/* <GameHabits gameTitle="UFC Wordle" /> */}
      {/* Blog Section for SEO */}
      {/* Blog Section for SEO */}
      <section className="blog-section">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6 text-center">UFC Wordle Blog</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Daily Post */}
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">TODAY'S PUZZLE</span>
              <h3 className="text-xl font-bold mt-2 mb-3">
                <a href="/blog/todays-ufc-wordle-april-23-2025" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Today's UFC Wordle – April 23, 2025 (Hint & Stats)
                </a>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Struggling with today's UFC Wordle? Here's a subtle hint: This champion has dominated the Lightweight division for years. Plus check out today's most common first guesses!
              </p>
              <a href="/blog/todays-ufc-wordle-april-23-2025" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Read more →
              </a>
            </article>

            {/* Evergreen Content */}
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <span className="text-xs text-green-600 dark:text-green-400 font-semibold">STRATEGY GUIDE</span>
              <h3 className="text-xl font-bold mt-2 mb-3">
                <a href="/blog/how-to-win-ufc-wordle-every-time" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  How to Win UFC Wordle Every Time: Pro Tips & Strategies
                </a>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Master the daily UFC fighter guessing game with our expert strategies. Learn which fighters to guess first, how to use divisions and stats as clues, and win UFC Wordle in fewer guesses!
              </p>
              <a href="/blog/how-to-win-ufc-wordle-every-time" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Read more →
              </a>
            </article>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* More SEO-rich content blocks */}
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold mb-2">
                <a href="/blog/ufc-wordle-vs-traditional-wordle" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  UFC Wordle vs Traditional Wordle: Key Differences Explained
                </a>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                How our MMA-themed word game puts a unique spin on the classic formula for UFC fans.
              </p>
            </article>

            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold mb-2">
                <a href="/blog/most-guessed-fighters-ufc-wordle" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  10 Most Guessed Fighters in UFC Wordle History
                </a>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                From Conor McGregor to Khabib Nurmagomedov: See which MMA stars everyone tries first in our daily fighter guessing game.
              </p>
            </article>

            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold mb-2">
                <a href="/blog/mma-word-games-history" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  The Evolution of UFC and MMA Games Online
                </a>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                From fantasy MMA leagues to modern UFC Wordle - explore how the world's fastest growing sport has inspired games and puzzles.
              </p>
            </article>
          </div>


          {/* Rich SEO footer with long-tail keywords */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Popular UFC Wordle Topics</h4>
            <div className="flex flex-wrap gap-2 text-sm">
              <a href="/tags/daily-ufc-puzzle" className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">daily ufc puzzle</a>
              <a href="/tags/mma-word-game" className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">mma word game</a>
              <a href="/tags/ufc-wordle" className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">ufc wordle</a>
              <a href="/tags/guess-the-fighter" className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">guess the fighter</a>
              <a href="/tags/mma-guessing-game" className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">mma guessing game</a>
              <a href="/tags/ufc-fighter-quiz" className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">ufc fighter quiz</a>
              <a href="/tags/fighter-stats-game" className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">fighter stats game</a>
              <a href="/tags/daily-mma-challenge" className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">daily mma challenge</a>
            </div>
          </div>
        </div>
      </section>
    </div><footer className="footer">
        <p>This site is not affiliated with Major League Baseball.</p>
      </footer></>
  );
}
