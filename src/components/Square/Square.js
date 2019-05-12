import React, { useState, useEffect } from "react";
import cx from "classnames";
import styles from "./Square.module.css";

export const SQUARE_STATUS = {
  BLANK: "BLANK",
  ACTIVE: "ACTIVE",
  PLACED: "PLACED",
  TAKEN: "TAKEN",
};

export default function Square({
  id,
  active,
  placed,
  size,
  price,
  x,
  y,
  status,
  onClick = () => {},
}) {
  const [_status, setStatus] = useState(null);

  useEffect(() => {
    setStatus(status);
  }, [status]);

  function handleClick() {
    // switch (_status) {
    //   case SQUARE_STATUS.BLANK:
    //     setStatus(SQUARE_STATUS.ACTIVE);
    //     break;
    //   case SQUARE_STATUS.ACTIVE:
    //     setStatus(SQUARE_STATUS.BLANK);
    //     break;
    //   default:
    // }
    // setTimeout(() => {
    onClick(id, status, price, x, y);
    // }, 0);
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
    background: getColor(_status),
  };

  return (
    <div
      className={cx(styles.container, style)}
      style={style}
      onClick={handleClick}
    />
  );
}
