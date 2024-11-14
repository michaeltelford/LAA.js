import React from 'react';
import Results from './Results';
import './App.css';

function App() {
  return (
    <div className="app">
      <header id='header' className="header">
        <h1 id='title' className="text-2xl text-bold">
          Kiteboarding Big Air Combined Leaderboard
        </h1>
      </header>
      <Results/>
      <footer id='footer' className="footer">
        Developed by Michael Telford
      </footer>
    </div>
  );
}

export default App;
