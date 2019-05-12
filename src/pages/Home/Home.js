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
          width={100}
          height={100}
          price={5}
          edge={0.5}
          userBets={[
            { id: "1_1_1" },
            { id: "1_3_4" },
            { id: "1_7_5" },
            { id: "1_2_9" },
          ]}
          // userBets={[]}
          result={{
            winningBet: "1_1_1",
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
