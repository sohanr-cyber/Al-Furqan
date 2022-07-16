import React, { useState } from "react";
import styles from "../styles/Surahs.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addToBookmarkedSurah } from "../redux/bookmarkSlicer";
import { useSnackbar } from "notistack";
import { addtoHistory } from "../redux/HistorySlicer";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const AllSurah = ({ chapters }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [surahs, setSurahs] = useState(chapters);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.left}>Quran Mazid</div>
        <div className={styles.right}>
          <div className={styles.search}>
            <input
              type="text"
              className={styles.field}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className={styles.btn}>Surah</div>
          <div className={styles.icon}>
            <ArrowUpwardIcon
              onClick={() => {
                setSurahs([...chapters].reverse());
              }}
              style={{
                color: `${surahs[0].id == 114 ? "rgb(0, 183, 255)" : "black"}`,
              }}
            />
          </div>
          <div className={styles.icon}>
            <ArrowDownwardIcon
              onClick={() => {
                setSurahs([...chapters]);
              }}
              style={{
                color: `${surahs[0].id == 1 ? "rgb(0, 183, 255)" : "black"}`,
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.surahs}>
        {surahs
          .filter((item) =>
            item.name_simple.toLowerCase().includes(query.toLowerCase())
          )
          .map((chapter, index) => (
            <div
              className={styles.surah}
              key={index}
              onClick={() => {
                router.push(`/chapter/${chapter.id}`);
              }}
            >
              <div className={styles.surah__top}>
                <div className={styles.surah__order}>{chapter.id}</div>
                <div className={styles.surah__bookmark}>
                  {chapter.revelation_place == "makkah" ? (
                    <>Makki</>
                  ) : (
                    <>Madani</>
                  )}
                </div>
              </div>
              <div className={styles.surah__name}>{chapter.name_simple}</div>
              <div className={styles.surah__meaning}>
                {chapter.translated_name.name}{" "}
              </div>
              <div className={styles.surah_verse}>
                {chapter.verses_count} Ayah
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllSurah;
