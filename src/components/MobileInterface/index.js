import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MobileInterface = ({
  addPlayer,
  currentQuestion,
  submitAnswer,
  gameStatus,
}) => {
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(true);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // You might want to verify the game ID here
    console.log("Joined game with ID:", id);
  }, [id]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addPlayer(name);
      setJoined(true);
    }
  };

  const handleAnswer = (answerIndex) => {
    const isCorrect = submitAnswer(name, answerIndex);
    setLastAnswerCorrect(isCorrect);
    setTimeout(() => setLastAnswerCorrect(null), 3000);
  };

  if (!joined) {
    return (
      <div className="p-4">
        <h2 className="text-2xl mb-4">Join Game {id}</h2>
        <form onSubmit={handleJoin}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Join Game
          </button>
        </form>
      </div>
    );
  }

  if (gameStatus === "waiting") {
    return (
      <div className="p-4">
        <h2 className="text-2xl mb-4">Waiting for game to start...</h2>
        <p>You've joined as: {name}</p>
      </div>
    );
  }

  if (gameStatus === "ended") {
    return (
      <div className="p-4">
        <h2 className="text-2xl mb-4">Game Over!</h2>
        <p>Thank you for playing, {name}!</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Question:</h2>
      <p className="text-xl mb-4">{currentQuestion.question}</p>
      {currentQuestion.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(index)}
          className="w-full p-2 mb-2 bg-blue-500 text-white rounded"
        >
          {String.fromCharCode(65 + index)}. {option}
        </button>
      ))}
      {lastAnswerCorrect !== null && (
        <div
          className={`mt-4 p-2 ${
            lastAnswerCorrect
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          } rounded`}
        >
          {lastAnswerCorrect ? "Correct!" : "Incorrect. Try again!"}
        </div>
      )}
    </div>
  );
};

export default MobileInterface;
