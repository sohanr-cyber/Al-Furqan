import React from "react";
import styles from "../styles/Popular.module.css";
import { useRouter } from "next/router";
const data = [
  {
    id: 67,
    name: "Al mulk",
  },
  {
    id: 36,
    name: "Yaseen",
  },
  {
    id: "2/#verse-255",
    name: "Ayatul Kursi",
  },
  {
    id: 18,
    name: "Al Kahaf",
  },
  {
    id: 56,
    name: "Al Waqi'ah",
  },
];

const Popular = () => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      {data.map((surah) => (
        <div
          className={styles.surah}
          onClick={() => router.push(`/chapter/${surah.id}`)}
        >
          {surah.name}
        </div>
      ))}
    </div>
  );
};

export default Popular;
