import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ 
  question, 
  selectedAnswer, 
  onAnswerChange, 
  onSubmit, 
  onNext, 
  onSkip, 
  isAnswerCorrect, 
  timer 
}) => {
  // Check if question is defined
  if (!question) {
    return <div>Loading...</div>;
  }

  const correctAnswer = question.correctAnswer;

  return (
    <div className="question-card">
      <div className="timer">Time Left: {timer}s</div>
      <div className="question-text">{question.question}</div>
      <div className="options">
        {question.answers.map((answer, index) => (
          <label
            key={index}
            className={`option ${selectedAnswer === answer ? (isAnswerCorrect === true ? 'correct' : isAnswerCorrect === false ? 'incorrect' : '') : (answer === correctAnswer && isAnswerCorrect === false ? 'correct-answer' : '')}`}
          >
            <input
              type="radio"
              value={answer}
              checked={selectedAnswer === answer}
              onChange={onAnswerChange}
            />
            {answer}
          </label>
        ))}
      </div>
      <div className="buttons">
        <button
          className={`submit-button ${isAnswerCorrect === true ? 'correct' : isAnswerCorrect === false ? 'incorrect' : ''}`}
          onClick={onSubmit}
        >
          Submit
        </button>
        <button className="next-button" onClick={onNext}>Next Question</button>
        <button className="skip-button" onClick={onSkip}>Skip</button>
      </div>
    </div>
  );
};

export default QuestionCard;
