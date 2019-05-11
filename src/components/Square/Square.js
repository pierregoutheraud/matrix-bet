import React, { useState } from "react";
import cx from "classnames";
import styles from "./Square.module.css";

export default function Square({
  id,
  active,
  placed,
  size,
  price,
  x,
  y,
  onClick = () => {},
}) {
  const [color] = useState("red");

  function handleClick() {
    const newActive = !active;
    onClick(id, newActive, price, x, y);
  }

  const style = {
    height: size,
    width: size,
    background: placed ? "red" : active ? "black" : "white",
  };

  return (
    <div
      className={cx(styles.container, { [styles.active]: active }, style)}
      style={style}
      onClick={handleClick}
    />
  );
}
