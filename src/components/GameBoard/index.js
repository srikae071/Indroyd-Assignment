import React from "react";
import { QRCodeSVG } from "qrcode.react";

const GameBoard = ({
  players,
  currentQuestion,
  scores,
  gameStatus,
  resetGame,
  gameUrl,
}) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Quiz Game</h1>

      {gameStatus === "waiting" && (
        <div>
          <p className="text-xl mb-4">Waiting for players to join...</p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              Scan this QR code to join:
            </h3>
            <QRCodeSVG value={gameUrl} size={200} />
          </div>
          <p className="text-sm">
            Or visit this URL on your mobile device: {gameUrl}
          </p>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl mb-4">Players:</h2>
        {players.length === 0 ? (
          <p>No players have joined yet.</p>
        ) : (
          <ul>
            {players.map((player, index) => (
              <li key={index} className="text-lg">
                {player}: {scores[player] || 0} points
              </li>
            ))}
          </ul>
        )}
      </div>

      {gameStatus === "in_progress" && currentQuestion && (
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Current Question:</h2>
          <p className="text-xl mb-4">{currentQuestion.question}</p>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index} className="text-lg mb-2">
                {String.fromCharCode(65 + index)}. {option}
              </li>
            ))}
          </ul>
        </div>
      )}

      {gameStatus === "ended" && (
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Game Over!</h2>
          <p className="text-xl">Final Scores:</p>
          <ul>
            {Object.entries(scores).map(([player, score]) => (
              <li key={player} className="text-lg">
                {player}: {score} points
              </li>
            ))}
          </ul>
          <button
            onClick={resetGame}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Start New Game
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
