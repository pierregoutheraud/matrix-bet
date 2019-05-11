import React from "react";
import styles from "./Home.module.css";
import Matrix from "../../components/Matrix/Matrix";
import Balance from "../../components/Balance/Balance";

export default function Home() {
  return (
    <main className={styles.container}>
      <Balance />
      <div className={styles.matrixes}>
        <Matrix
          className={styles.matrix}
          id="999"
          width={20}
          height={20}
          endTime={Date.now() + 10 * 1000}
        />
        <Matrix
          className={styles.matrix}
          id="212342134"
          width={20}
          height={20}
          endTime={Date.now() + 1000 * 1000}
        />
      </div>
    </main>
  );
}
