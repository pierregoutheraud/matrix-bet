import React from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { bet, cleanBets, placeBets, endBets } from "../../modules/bets";
import Countdown from "../Countdown/Countdown";
import Matrix from "../Matrix/Matrix";
import styles from "./Game.module.css";
import { SQUARE_STATUS } from "../Square/Square";

export default function Game({
  id,
  className,
  width,
  height,
  endTime,
  edge,
  price = 1,
  userBets,
}) {
  const dispatch = useDispatch();
  const bets = useSelector(
    state => {
      return state.bets.list.filter(b => b.gameId === id);
    },
    [id]
  );
  const placedBets = useSelector(
    state => {
      return state.bets.placed.filter(b => b.gameId === id);
    },
    [id]
  );

  function handleBet(betId, status, price) {
    if (status === SQUARE_STATUS.PLACED) {
      return window.alert("You already placed a bet here.");
    }
    if (status === SQUARE_STATUS.TAKEN) {
      return window.alert("This position has been taken by another user.");
    }
    return dispatch(bet(id, betId, status, price));
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

  const numberOfPossibleBets = width * height;
  const numberOfMybets = bets.length + placedBets.length;
  const numberOfbets = [bets, placedBets, userBets].reduce(
    (acc, curr) => acc + curr.length,
    0
  );
  const maxPossibleProfitAmount = numberOfPossibleBets * price;
  const maxProfitAmount = numberOfbets * price;
  const edgeAmount = (edge / 100) * maxProfitAmount;
  const profitAmount = maxProfitAmount - edgeAmount;
  const betAmount = numberOfMybets * price;
  const winChance = (numberOfMybets * 100) / numberOfbets;
  const payout = profitAmount / betAmount;

  return (
    <div className={cx(styles.container, className)}>
      {/* <Countdown to={endTime} onEnd={handleEnd} /> */}
      <Matrix
        gameId={id}
        width={width}
        height={height}
        bets={bets}
        placedBets={placedBets}
        userBets={userBets}
        squarePrice={price}
        onBet={handleBet}
      />
      <div className={styles.stats}>
        <p>Max possible profit: {maxPossibleProfitAmount}$</p>
        <p>Bet amount: {betAmount}$</p>
        <p>Payout: x{payout}</p>
        <p>Win chance: {winChance}%</p>
        <p>Profit on win: {profitAmount}$</p>
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
