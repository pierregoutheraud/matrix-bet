import React, { useState } from "react";
import useInterval from "../../hooks/useInterval";
import cx from "classnames";
import styles from "./Countdown.module.css";

export default function Matrix({ className, to, onEnd }) {
  const [secondsLeft, setSecondsLeft] = useState((to - Date.now()) / 1000);

  useInterval(
    () => {
      const newSecondsLeft = secondsLeft - 1;
      setSecondsLeft(newSecondsLeft);
      if (newSecondsLeft <= 0) {
        onEnd();
      }
    },
    secondsLeft > 0 ? 1000 : null
  );

  if (secondsLeft === null) {
    return null;
  }

  if (secondsLeft < 0) {
    return <div className={cx(styles.container, className)}>Finished !</div>;
  }

  return (
    <div className={cx(styles.container, className)}>
      {Math.floor(secondsLeft)} s
    </div>
  );
}
