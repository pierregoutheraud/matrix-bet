import React from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { bet, cleanBets, placeBets, endBets } from "../../modules/bets";
import Square from "../Square/Square";
import Countdown from "../Countdown/Countdown";
import styles from "./Matrix.module.css";

export default function Matrix({
  id,
  className,
  width,
  height,
  borderSize = 4,
  squareSize = 20,
  squarePrice = 1,
  endTime,
}) {
  const dispatch = useDispatch();
  const bets = useSelector(
    state => {
      return state.bets.list.filter(b => b.matrixId === id);
    },
    [id]
  );
  const placedBets = useSelector(state => state.bets.placed);

  function handleBet(betId, active, price, x, y) {
    if (placedBets.some(b => b.id === betId)) {
      return window.alert("Already placed bet.");
    }
    return dispatch(bet(id, betId, active, price, x, y));
  }

  function handleCleanBets() {
    return dispatch(cleanBets(id));
  }

  function handleConfirmBets() {
    return dispatch(placeBets(id));
  }

  function handleEnd() {
    console.log("handleEnd");
    return dispatch(endBets(id));
  }

  let squares = [];
  for (let y = 1; y <= height; y++) {
    for (let x = 1; x <= width; x++) {
      const betId = `${id}_${x}_${y}`;
      const active = bets.some(b => b.id === betId);
      const placed = placedBets.some(b => b.id === betId);
      squares.push(
        <Square
          key={`${x}_${y}`}
          id={betId}
          x={x}
          y={y}
          size={squareSize}
          onClick={handleBet}
          price={squarePrice}
          active={active}
          placed={placed}
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
    <div className={cx(styles.container, className)}>
      <Countdown to={endTime} onEnd={handleEnd} />
      <div className={styles.matrix} style={style}>
        {squares}
      </div>
      <div className={styles.buttons}>
        <button disabled={!!!bets.length} onClick={handleConfirmBets}>
          Confirm bets
        </button>
        <button disabled={!!!bets.length} onClick={handleCleanBets}>
          Clean bets
        </button>
      </div>
    </div>
  );
}
