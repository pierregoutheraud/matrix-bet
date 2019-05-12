import React from "react";
import cx from "classnames";
import { useDispatch } from "react-redux";
import { bet, endBets } from "../../modules/bets";
import Matrix from "../Matrix/Matrix";
import styles from "./Game.module.css";
import { SQUARE_STATUS } from "../Square/Square";
import GameStats from "./GameStats";

export default function Game(props) {
  const { id, className, width, height, price = 1, userBets } = props;

  const dispatch = useDispatch();

  function handleBet(betId, status, price) {
    if (status === SQUARE_STATUS.PLACED) {
      return window.alert("You already placed a bet here.");
    }
    if (status === SQUARE_STATUS.TAKEN) {
      return window.alert("This position has been taken by another user.");
    }
    return dispatch(bet(id, betId, status, price));
  }

  function handleEnd() {
    console.log("handleEnd");
    return dispatch(endBets(id));
  }

  return (
    <div className={cx(styles.container, className)}>
      {/* <Countdown to={endTime} onEnd={handleEnd} /> */}
      <Matrix
        gameId={id}
        width={width}
        height={height}
        userBets={userBets}
        squarePrice={price}
        onBet={handleBet}
      />
      <GameStats {...props} />
    </div>
  );
}
