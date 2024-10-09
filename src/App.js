import React, { useState, useEffect } from "react";
import {
  HashRouter as Router, // Ensure HashRouter is used
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import GameBoard from "./components/GameBoard";
import MobileInterface from "./components/MobileInterface";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: 0,
  },
  // Add more questions here
];

function App() {
  const [players, setPlayers] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({});
  const [gameStatus, setGameStatus] = useState("waiting"); // "waiting", "in_progress", "ended"

  useEffect(() => {
    setGameId(Math.random().toString(36).substr(2, 9));
  }, []);

  const addPlayer = (name) => {
    if (!players.includes(name)) {
      setPlayers([...players, name]);
      setScores((prevScores) => ({ ...prevScores, [name]: 0 }));
      if (gameStatus === "waiting" && players.length > 0) {
        setGameStatus("in_progress");
      }
    }
  };

  const submitAnswer = (playerName, answerIndex) => {
    if (gameStatus !== "in_progress") return false;

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScores((prevScores) => ({
        ...prevScores,
        [playerName]: prevScores[playerName] + 1,
      }));

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        } else {
          setGameStatus("ended");
        }
      }, 3000); // Wait 3 seconds before moving to the next question
    }
    return isCorrect;
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScores({});
    setGameStatus("waiting");
    setPlayers([]);
  };

  const gameUrl = `${window.location.origin}/Indroyd-Assignment/#/mobile/${gameId}`; // Correctly format the URL for HashRouter

  return (
    <Router basename="/Indroyd-Assignment">
      {" "}
      {/* Add basename */}
      <Routes>
        <Route path="/" element={<Navigate to="/desktop" />} />
        <Route
          path="/desktop"
          element={
            <GameBoard
              players={players}
              currentQuestion={questions[currentQuestion]}
              scores={scores}
              gameStatus={gameStatus}
              resetGame={resetGame}
              gameUrl={gameUrl}
            />
          }
        />
        <Route
          path="/mobile/:id"
          element={
            <MobileInterface
              addPlayer={addPlayer}
              currentQuestion={questions[currentQuestion]}
              submitAnswer={submitAnswer}
              gameStatus={gameStatus}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
