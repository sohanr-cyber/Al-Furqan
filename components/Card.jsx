import React from "react";
import styles from "../styles/Card.module.css";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addtoHistory } from "../redux/HistorySlicer";
import { useSnackbar } from "notistack";
import Moment from "react-moment";

import {
  addToBookmarkedSurah,
  removeFromBookmarkedSurah,
} from "../redux/bookmarkSlicer";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const Card = ({ surah, bookmarkedSurah }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        {surah.name_arabic}
        <div className={styles.icon}>
          <span>
            {bookmarkedSurah?.find((item) => item.id == surah.id) ? (
              <BookmarkIcon
                onClick={() => {
                  dispatch(removeFromBookmarkedSurah(surah));
                  enqueueSnackbar(
                    `Surah ${surah.name_simple} removed from bookmark`
                  );
                }}
              />
            ) : (
              <BookmarkBorderIcon
                onClick={() => {
                  dispatch(addToBookmarkedSurah(surah));
                  enqueueSnackbar(
                    `Verse ${surah.name_simple} added to bookmark`
                  );
                }}
              />
            )}
          </span>
        </div>

        {surah.time && (
          <span className={styles.time}>
            <Moment fromNow>{surah.time}</Moment>
          </span>
        )}
      </div>
      <div
        className={styles.bottom}
        onClick={() => {
          router.push(`/chapter/${surah.id}`);
        }}
      >
        <div className={styles.left}>
          <div className={styles.name}>{surah.name_simple} </div>
          <div className={styles.meaning}>{surah.translated_name.name} </div>
        </div>
        <div className={styles.right}>
          <div className={styles.order}>{surah.id} </div>
          <div className={styles.verse}>{surah.verse_count} Ayay</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
