import React from 'react';
import logo from './logo.svg';
import Results from './Results';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-3xl font-bold">
          Kiteboarding Big Air Combined Leaderboard
        </h1>
      </header>
      <Results/>
      <footer className="Footer">
        Developed by Michael Telford
      </footer>
    </div>
  );
}

export default App;
