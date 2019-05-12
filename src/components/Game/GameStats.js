import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanBets, placeBets, endBets } from "../../modules/bets";
import styles from "./GameStats.module.css";

export default function GameStats({
  id,
  edge,
  width,
  height,
  price,
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

  function handleCleanBets() {
    return dispatch(cleanBets(id));
  }

  function handleConfirmBets() {
    return dispatch(placeBets(id));
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
    <div className={styles.stats}>
      <div className={styles.details}>
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
