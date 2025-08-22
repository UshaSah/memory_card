function Scoreboard({ score, gameOver, onNewGame }) {
    return (
        <div className="game-stats">
            <div className="score-info">
                <h3 className="text-lg font-bold text-white">Score: {score}</h3>
                {gameOver && (
                    <p className="text-red-300 text-sm">Game Over! Click New Game to restart.</p>
                )}
            </div>
            <button
                className="reset-button"
                onClick={onNewGame}
            >
                New Game
            </button>
        </div>
    )
}

export default Scoreboard 