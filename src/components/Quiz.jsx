import React, { useState } from 'react';
import { quizQuestions } from '../data/questions';
import './Quiz.css';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    
    // Check if answer is correct
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Store the answered question
    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: quizQuestions[currentQuestion].question,
        selectedAnswer: answerIndex,
        correctAnswer: quizQuestions[currentQuestion].correctAnswer,
        isCorrect: answerIndex === quizQuestions[currentQuestion].correctAnswer
      }
    ]);

    // Move to next question after a delay
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizQuestions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setAnsweredQuestions([]);
  };

  const getButtonClass = (index) => {
    if (selectedAnswer === null) return 'answer-button';
    if (index === quizQuestions[currentQuestion].correctAnswer) {
      return 'answer-button correct';
    }
    if (index === selectedAnswer) {
      return 'answer-button incorrect';
    }
    return 'answer-button';
  };

  if (showResults) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    return (
      <div className="quiz-container">
        <div className="results-container">
          <h2>Quiz Complete! 🎉</h2>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-number">{percentage}%</span>
            </div>
            <p className="score-text">
              You scored {score} out of {quizQuestions.length}
            </p>
          </div>

          <div className="results-summary">
            <h3>Review Your Answers:</h3>
            {answeredQuestions.map((item, index) => (
              <div key={index} className={`answer-review ${item.isCorrect ? 'correct-review' : 'incorrect-review'}`}>
                <p className="review-question">
                  <strong>Q{index + 1}:</strong> {item.question}
                </p>
                <p className="review-result">
                  {item.isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                </p>
              </div>
            ))}
          </div>

          <button className="restart-button" onClick={restartQuiz}>
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
        <p className="question-counter">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </p>
        <p className="category-badge">{quizQuestions[currentQuestion].category}</p>
      </div>

      <div className="question-section">
        <h2 className="question-text">{quizQuestions[currentQuestion].question}</h2>
      </div>

      <div className="answers-section">
        {quizQuestions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={getButtonClass(index)}
            onClick={() => handleAnswerClick(index)}
            disabled={selectedAnswer !== null}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>

      <div className="quiz-footer">
        <p className="score-display-mini">Current Score: {score}</p>
      </div>
    </div>
  );
}

export default Quiz;