import React, { useEffect, useState } from "react";
import "./GamePage.css";
import Loader from "./../Common/Loader";
import { useLocation } from "react-router-dom";
import * as jwt_decode from "jwt-decode";



const GamePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  const user = location?.state.userName || "Guest";
  //  DECODE USER INFO FROM THE JWT TOKEN...
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodeToken = jwt_decode(token);
      console.log(decodeToken)
      setUserId(decodeToken.id);
    }
  }, []);

  // FETCH DATA FROM API
  const fetchData = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch("https://the-trivia-api.com/v2/questions/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result); // Update the fetched data
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component load
  }, []);

  // HANDLE ANSWER SELECTION
  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = data[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex + 1 < data.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };
  const sendScoreToBackend = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/quizApp/scores/score",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: userId, score: [score] }),
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isQuizFinished) {
      sendScoreToBackend();
    }
  }, [isQuizFinished]);
  // RESTART QUIZ
  const restartQuiz = async () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setIsQuizFinished(false);
    await fetchData(); // Reload the quiz data
  };

  // Handle loading state
  if (loading)
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  if (error) return <span className="error_line">{error}</span>;

  // Ensure we have valid data before rendering the quiz
  if (!data || data.length === 0) {
    return (
      <span className="error_line">
        No questions available. Please try again later.
      </span>
    );
  }

  // Handle quiz finished state
  if (isQuizFinished) {
    return (
      <div className="quiz-end">
        <h2>Quiz Finished!</h2>
        <p>
          Your Score: {score} / {data.length}
        </p>
        <button className="restart-button" onClick={restartQuiz}>
          Restart Quiz
        </button>
      </div>
    );
  }

  // Render current question
  const currentQuestion = data[currentQuestionIndex];
  return (
    <div className="quiz-game">
      <main className="quiz-container">
        {/* Display question */}
        <div className="quiz-question">
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{currentQuestion.question.text}</p>
        </div>

        {/* Display options */}
        {[...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer]
          .sort(() => Math.random() - 0.5)
          .map((option, index) => (
            <button
              key={index}
              className="option-button"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
      </main>
    </div>
  );
};

export default GamePage;
