import React from "react";
import { useSelector } from "react-redux";
import styles from "./Balance.module.css";

export default function Balance() {
  const balance = useSelector(state => state.bets.balance);
  return <div className={styles.container}>Balance: {balance}$</div>;
}
