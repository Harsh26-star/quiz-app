import React from 'react';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🧠 React Knowledge Quiz</h1>
        <p>Test your React skills with 8 questions!</p>
      </header>
      <Quiz />
      <footer className="app-footer">
        <p>Built with React & ❤️</p>
      </footer>
    </div>
  );
}

export default App;