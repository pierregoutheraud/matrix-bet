import React from "react";
import Square from "../Square/Square";
import styles from "./Matrix.module.css";
import { SQUARE_STATUS } from "../Square/Square";

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
  function getSquareStatus(betId) {
    if (userBets.some(b => b.id === betId)) {
      return SQUARE_STATUS.TAKEN;
    }
    if (placedBets.some(b => b.id === betId)) {
      return SQUARE_STATUS.PLACED;
    }
    if (bets.some(b => b.id === betId)) {
      return SQUARE_STATUS.ACTIVE;
    }
    return SQUARE_STATUS.BLANK;
  }

  let squares = [];
  for (let y = 1; y <= height; y++) {
    for (let x = 1; x <= width; x++) {
      const betId = `${gameId}_${x}_${y}`;
      const status = getSquareStatus(betId);
      squares.push(
        <Square
          key={`${x}_${y}`}
          id={betId}
          x={x}
          y={y}
          size={squareSize}
          onClick={onBet}
          price={squarePrice}
          status={status}
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
