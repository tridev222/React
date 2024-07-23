import React from 'react';
import './Score.css';

const Score = ({ score, totalQuestions, incorrectCount, skippedCount, timeoutCount }) => {
  const percentage = ((score / totalQuestions) * 100).toFixed(2);
  const isPassed = percentage >= 50;

  return (
    <div className="score-container">
      <div className={`score-card ${isPassed ? 'passed' : 'failed'}`}>
        <h2 className="score-header">
          {isPassed ? 'Congratulations!' : 'Failed! Try Again'}
        </h2>
        <div className="score-details">
          <p className="score-text">You scored: {score} out of {totalQuestions}</p>
          <p className="score-text">Percentage: {percentage}%</p>
          <p className="score-text">Incorrect Answers: {incorrectCount}</p>
          <p className="score-text">Skipped Questions: {skippedCount}</p>
          <p className="score-text">Timed Out: {timeoutCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Score;
