import React from "react";
import styles from "./Home.module.css";
import Balance from "../../components/Balance/Balance";
import Game from "../../components/Game/Game";

export default function Home() {
  return (
    <main className={styles.container}>
      <Balance />
      <div className={styles.matrixes}>
        <Game
          className={styles.matrix}
          id="1"
          width={10}
          height={10}
          price={0.1}
          edge={0.1}
          result={{
            winningBet: `1_1_1`,
          }}
          endTime={Date.now() + 500 * 1000}
        />
        {/* <Game
          className={styles.matrix}
          id="2"
          width={10}
          height={10}
          price={1}
          endTime={Date.now() + 1000 * 1000}
        /> */}
      </div>
    </main>
  );
}
