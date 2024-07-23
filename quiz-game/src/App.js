import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import Score from './Score';
import WelcomePage from './WelcomePage'; 
import htmlQuestions from './questions/html';
import cssQuestions from './questions/css';
import javascriptQuestions from './questions/js';
import reactQuestions from './questions/react';
import './App.css';
import './TopicSelection.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [timeoutCount, setTimeoutCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [timer, setTimer] = useState(22);
  const [initialLoad, setInitialLoad] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion) {
      const correctAnswer = currentQuestion.correctAnswer;

      if (selectedAnswer === correctAnswer) {
        setScore((prevScore) => Math.min(prevScore + 1, questions.length));
        setIsAnswerCorrect(true);
      } else {
        setIncorrectCount((prevCount) => prevCount + 1);
        setIsAnswerCorrect(false);
      }

      // Move to the next question after a delay
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer('');
          setIsAnswerCorrect(null);
          setTimer(22);
        } else {
          setQuizCompleted(true);
        }
      }, 1000);
    }
  }, [selectedAnswer, currentQuestionIndex, questions]);

  useEffect(() => {
    if (timer > 0 && !quizCompleted) {
      const timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (timer === 0) {
      handleSubmit();
      setTimeoutCount((prevCount) => prevCount + 1);
    }
  }, [timer, quizCompleted, handleSubmit]);

  useEffect(() => {
    // Set initial load to false after the first render
    setInitialLoad(false);
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setIsAnswerCorrect(null);
      setTimer(22);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleSkip = () => {
    setSkippedCount((prevCount) => prevCount + 1);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setIsAnswerCorrect(null);
      setTimer(22);
    } else {
      setQuizCompleted(true);
    }
  };

  const startQuiz = () => {
    navigate('/select-topic');
  };

  const selectTopic = (topic) => {
    switch (topic) {
      case 'html':
        setQuestions(htmlQuestions);
        break;
      case 'css':
        setQuestions(cssQuestions);
        break;
      case 'javascript':
        setQuestions(javascriptQuestions);
        break;
      case 'react':
        setQuestions(reactQuestions);
        break;
      default:
        break;
    }
    navigate('/quiz');
  };

  return (
    <div className="App">
      {initialLoad && <Navigate to="/" />}
      <Routes>
        <Route path="/" element={<WelcomePage onStartQuiz={startQuiz} />} />
        <Route path="/select-topic" element={
          <div className="topic-selection">
            <h1>Select a Topic</h1>
            <div className="topic-card" onClick={() => selectTopic('html')}>HTML</div>
            <div className="topic-card" onClick={() => selectTopic('css')}>CSS</div>
            <div className="topic-card" onClick={() => selectTopic('javascript')}>JavaScript</div>
            <div className="topic-card" onClick={() => selectTopic('react')}>React</div>
          </div>
        } />
        <Route path="/quiz" element={
          quizCompleted ? (
            <Score
              score={score}
              totalQuestions={questions.length}
              incorrectCount={incorrectCount}
              skippedCount={skippedCount}
              timeoutCount={timeoutCount}
            />
          ) : (
            <div className="main-container">
              {questions[currentQuestionIndex] ? (
                <QuestionCard
                  question={questions[currentQuestionIndex]}
                  selectedAnswer={selectedAnswer}
                  onAnswerChange={(e) => setSelectedAnswer(e.target.value)}
                  onSubmit={handleSubmit}
                  onNext={handleNext}
                  onSkip={handleSkip}
                  isAnswerCorrect={isAnswerCorrect}
                  timer={timer}
                />
              ) : (
                <div>Loading...</div>
              )}
            </div>
          )
        } />
      </Routes>
    </div>
  );
}

export default App;
