import React from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { bet, cleanBets, placeBets, endBets } from "../../modules/bets";
import Countdown from "../Countdown/Countdown";
import Matrix from "../Matrix/Matrix";
import styles from "./Game.module.css";

export default function Game({
  id,
  className,
  width,
  height,
  endTime,
  edge,
  price = 1,
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

  const numberOfPossibleBets = width * height;
  const numberOfbets = bets.length + placedBets.length;
  const maxProfitAmount = numberOfPossibleBets * price;
  const edgeAmount = (edge / 100) * maxProfitAmount;
  const profitAmount = maxProfitAmount - edgeAmount;
  const betAmount = numberOfbets * price;
  const percentage = (numberOfbets * 100) / numberOfPossibleBets;
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
        squarePrice={price}
        onBet={handleBet}
      />
      <div className={styles.stats}>
        <p>Bet amount: {betAmount}$</p>
        <p>Payout: x{payout}</p>
        <p>Win chance: {percentage}%</p>
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
