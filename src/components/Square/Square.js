import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./Square.module.css";

export const SQUARE_STATUS = {
  BLANK: "BLANK",
  ACTIVE: "ACTIVE",
  PLACED: "PLACED",
  TAKEN: "TAKEN",
};

function Square({ id, size, price, x, y, userBets, onClick = () => {} }) {
  const isActive = useSelector(
    state => {
      return state.bets.list.some(b => b.id === id);
    },
    [id]
  );

  const isPlaced = useSelector(
    state => {
      return state.bets.placed.some(b => b.id === id);
    },
    [id]
  );

  function getStatus() {
    if (userBets.some(b => b.id === id)) {
      return SQUARE_STATUS.TAKEN;
    }
    if (isPlaced) {
      return SQUARE_STATUS.PLACED;
    }
    if (isActive) {
      return SQUARE_STATUS.ACTIVE;
    }
    return SQUARE_STATUS.BLANK;
  }

  const status = getStatus();

  function handleClick() {
    onClick(id, status, price, x, y);
  }

  function getColor(s) {
    switch (s) {
      case SQUARE_STATUS.BLANK:
        return "white";
      case SQUARE_STATUS.ACTIVE:
        return "black";
      case SQUARE_STATUS.PLACED:
        return "red";
      case SQUARE_STATUS.TAKEN:
        return "yellow";
      default:
        return "white";
    }
  }

  const style = {
    height: size,
    width: size,
    background: getColor(status),
  };

  return (
    <div
      className={cx(styles.container, style)}
      style={style}
      onClick={handleClick}
    />
  );
}

export default React.memo(Square);
