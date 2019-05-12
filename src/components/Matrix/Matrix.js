import React from "react";
import Square from "../Square/Square";
import styles from "./Matrix.module.css";

export default function Matrix({
  gameId,
  width,
  height,
  bets,
  placedBets,
  userBets,
  borderSize = 2,
  squareSize = 20,
  squarePrice = 1,
  onBet,
}) {
  let squares = [];
  for (let y = 1; y <= height; y++) {
    for (let x = 1; x <= width; x++) {
      const betId = `${gameId}_${x}_${y}`;
      squares.push(
        <Square
          key={`${x}_${y}`}
          id={betId}
          gameId={gameId}
          x={x}
          y={y}
          size={squareSize}
          onClick={onBet}
          price={squarePrice}
          userBets={userBets}
        />
      );
    }
  }

  const style = {
    width: squareSize * width + borderSize * 2,
    height: squareSize * height + borderSize * 2,
    border: `${borderSize}px solid black`,
  };

  return (
    <div className={styles.container} style={style}>
      {squares}
    </div>
  );
}
