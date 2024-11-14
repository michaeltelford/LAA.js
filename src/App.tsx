import React from 'react';
import Results from './Results';
import './App.css';

function App() {
  return (
    <div className="app">
      <header id='header' className="header">
        <h1 id='title' className="my-10 text-4xl text-center">
          Kiteboarding Big Air Combined Leaderboard
        </h1>
      </header>
      <Results/>
      <footer id='footer' className="my-6 text-center">
        Developed by Michael Telford
      </footer>
    </div>
  );
}

export default App;
