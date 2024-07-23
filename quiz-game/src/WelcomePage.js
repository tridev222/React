import React from 'react';
import './WelcomePage.css'; // Ensure to import the CSS file

function WelcomePage({ onStartQuiz }) {
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1>Welcome to Quiz App</h1>
        <h2>Test Your Knowledge here...</h2>
        <button className="start-quiz-button" onClick={onStartQuiz}>
          Start Quiz
        </button>
      </header>
    </div>
  );
}

export default WelcomePage;
