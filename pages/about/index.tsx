import React from 'react';
import SEO from '../../components/SEO';
import Header from '../../components/Header';

export default function About() {
  return (
    <>
      <SEO
        title="About UFC Wordle - The Ultimate MMA Fighter Guessing Game"
        description="Learn about UFC Wordle, the daily MMA fighter guessing game that combines UFC knowledge with puzzle-solving fun. Discover how to play, our mission, and why UFC fans love our word game."
        url="https://www.ufcwordle.com/about"
        image="/wordle.png"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "url": "https://www.ufcwordle.com/about",
          "name": "About UFC Wordle",
          "description": "Learn about UFC Wordle, the daily MMA fighter guessing game that combines UFC knowledge with puzzle-solving fun.",
          "mainEntity": {
            "@type": "Game",
            "name": "UFC Wordle",
            "description": "A daily guessing game where players try to identify a mystery UFC fighter using clues about their division, age, wins, losses, title reigns, and country."
          }
        }}
      />
      <Header />
      
      <div className="container">
        <main className="main">
          {/* Hero Section */}
          <section className="hero-section mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              About UFC Wordle
            </h1>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The ultimate daily guessing game for UFC and MMA fans. Test your knowledge of fighters, 
              divisions, and championship history in this addictive word puzzle that puts a unique spin on the classic Wordle format.
            </p>
          </section>

          {/* What is UFC Wordle Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">What is UFC Wordle?</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 text-purple-600">🎯 The Challenge</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Every day, we select a mystery UFC fighter from our database of current and legendary fighters. 
                    Your mission: guess who it is using only 8 attempts. Each guess reveals clues about the fighter's 
                    division, age, win-loss record, title reigns, and country of origin.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 text-blue-600">🧠 Strategy Required</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Unlike traditional Wordle, UFC Wordle requires deep knowledge of MMA. You'll need to think 
                    strategically about which fighters to guess first, how to use division clues, and how to 
                    interpret win-loss records to narrow down your options.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">How to Play UFC Wordle</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                    <h4 className="font-bold mb-2">Start Guessing</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Type a fighter's name to make your first guess</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                    <h4 className="font-bold mb-2">Analyze Clues</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Green cells show matches, arrows show higher/lower values</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                    <h4 className="font-bold mb-2">Solve the Mystery</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Use your UFC knowledge to identify the mystery fighter</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why We Created UFC Wordle */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Why We Created UFC Wordle</h2>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  As passionate UFC and MMA fans, we noticed that traditional word games didn't capture the excitement 
                  and complexity of mixed martial arts. We wanted to create something that would challenge both casual 
                  fans and hardcore MMA enthusiasts while making learning about fighters fun and engaging.
                </p>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  UFC Wordle combines the addictive puzzle mechanics of Wordle with the rich history and statistics 
                  of the Ultimate Fighting Championship. Every game is an opportunity to learn something new about 
                  your favorite fighters or discover legends you might not know.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-300">🎮 For Casual Fans</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Learn about different UFC divisions and weight classes</li>
                    <li>• Discover legendary fighters and their achievements</li>
                    <li>• Understand the sport's history through gameplay</li>
                    <li>• Build knowledge gradually through daily challenges</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">🥊 For Hardcore Fans</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Test your encyclopedic knowledge of UFC fighters</li>
                    <li>• Challenge yourself with obscure fighters and stats</li>
                    <li>• Compete with other MMA experts</li>
                    <li>• Share your victories and strategies</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Game Features */}
          <section className="mb-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">What Makes UFC Wordle Special?</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">📊</div>
                  <h3 className="text-xl font-bold mb-4">Rich Fighter Database</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our database includes current champions, legendary fighters, and rising stars from every UFC division.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">🔄</div>
                  <h3 className="text-xl font-bold mb-4">Daily Fresh Content</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    New mystery fighter every day, ensuring endless replayability and fresh challenges for all skill levels.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">📱</div>
                  <h3 className="text-xl font-bold mb-4">Mobile Optimized</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Play anywhere, anytime. Our responsive design works perfectly on phones, tablets, and desktops.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SEO-Rich Content Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">UFC Wordle vs Traditional Word Games</h2>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-purple-600">Traditional Wordle</h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li>• 5-letter word guessing</li>
                      <li>• Letter position clues</li>
                      <li>• 6 attempts maximum</li>
                      <li>• General vocabulary focus</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-blue-600">UFC Wordle</h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li>• Fighter name guessing</li>
                      <li>• Statistical and biographical clues</li>
                      <li>• 8 attempts maximum</li>
                      <li>• UFC and MMA knowledge focus</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Community Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Join the UFC Wordle Community</h2>
              
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Share Your Victories</h3>
                <p className="text-lg mb-6 opacity-90">
                  Every game generates a shareable results card. Show off your UFC knowledge and challenge 
                  your friends to beat your score!
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl mb-2">🏆</div>
                    <h4 className="font-bold mb-2">Daily Challenges</h4>
                    <p className="text-sm opacity-80">New fighter every day</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">📈</div>
                    <h4 className="font-bold mb-2">Track Progress</h4>
                    <p className="text-sm opacity-80">Build your winning streak</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">👥</div>
                    <h4 className="font-bold mb-2">Community</h4>
                    <p className="text-sm opacity-80">Connect with MMA fans</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-3 text-purple-600">How often is UFC Wordle updated?</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We release a new mystery fighter every day at midnight EST. Each puzzle is carefully selected 
                    to provide a good mix of difficulty levels and fighter recognition.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-600">What fighters are included in UFC Wordle?</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Our database includes current UFC fighters, former champions, legendary fighters, and notable 
                    competitors from UFC history. We regularly update our roster to include new signings and rising stars.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-3 text-green-600">Is UFC Wordle free to play?</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Yes! UFC Wordle is completely free to play. No registration required, no hidden costs, 
                    and no premium features. Just pure UFC puzzle fun for all MMA fans.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-3 text-orange-600">Can I play on mobile devices?</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Absolutely! UFC Wordle is fully responsive and optimized for mobile devices. Whether you're 
                    on iPhone, Android, tablet, or desktop, you'll have the same great experience.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Footer */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Popular UFC Wordle Topics</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">daily ufc puzzle</span>
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">mma word game</span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">ufc fighter quiz</span>
                <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">guess the fighter</span>
                <span className="px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium">mma guessing game</span>
                <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">ufc wordle strategy</span>
                <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">fighter stats game</span>
                <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium">daily mma challenge</span>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Test Your UFC Knowledge?</h2>
              <p className="text-xl mb-6 opacity-90">
                Join thousands of MMA fans who play UFC Wordle every day!
              </p>
              <a 
                href="/" 
                className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Play UFC Wordle Now
              </a>
            </div>
          </section>
        </main>
      </div>
      
      <footer className="footer">
        <p>This site is not affiliated with the Ultimate Fighting Championship (UFC).</p>
      </footer>
    </>
  );
}