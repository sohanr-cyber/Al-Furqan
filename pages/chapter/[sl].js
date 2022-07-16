import React, { useEffect, useState } from "react";
import styles from "../../styles/Chapter.module.css";
import Head from "next/head";
import Left from "../../components/Left";
import SearchBar from "../../components/SearchBar";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { useSelector, useDispatch } from "react-redux";
import {
  addToBookmark,
  addToBookmarkedSurah,
  removeFromBookmark,
  removeFromBookmarkedSurah,
} from "../../redux/bookmarkSlicer";
import { addtoHistory } from "../../redux/HistorySlicer";

const Chapter = ({ surah, chapters }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);
  const [openChapters, setOpenChapters] = useState(false);
  const [openVerses, setOpenVerses] = useState(false);
  const [query, setQuery] = useState("");
  const [verseQuery, setVerseQuery] = useState("");
  const router = useRouter();
  console.log(router.query.sl);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const bookmarkedSurah = useSelector(
    (state) => state.bookmark.bookmarkedSurah
  );

  const currentChapter = chapters.find((item) => item.id == router.query.sl);

  useEffect(() => {
    // const currentChapter = chapters.find((item) => item.id == router.query.sl);
    dispatch(addtoHistory({ ...currentChapter, time: new Date() }));
  }, [router.query.sl]);

  return (
    <>
      <Head>
        <title>
          Surah {surah.surah_name} |Chapter {surah.id}{" "}
          {router.asPath.split("#") && `| ${router.asPath.split("#")[1]}`}
        </title>
      </Head>

      <main className={styles.main}>
        <Left />
        <div className={styles.right}>
          <SearchBar />
          <div className={styles.chapter}>
            <div className={styles.top}>
              <div className={styles.chapters}>
                <div
                  className={styles.current__chapter}
                  onClick={() => setOpenChapters((prev) => !prev)}
                >
                  {surah.id} {surah.surah_name} <span> </span>{" "}
                  {!openChapters ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                </div>
                {openChapters && (
                  <div className={styles.more__chapters}>
                    <input
                      type="text"
                      placeholder="Search Surah"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    {chapters
                      .filter((chapter) =>
                        chapter.name_simple
                          .toLowerCase()
                          .includes(query.toLowerCase())
                      )

                      .map((chapter, index) => (
                        <Link href={`/chapter/${chapter.chapter_number}`}>
                          <div
                            className={styles.item}
                            style={
                              router.query.sl == chapter.chapter_number
                                ? {
                                    backgroundColor: "rgb(59, 160, 255)",
                                    color: "white",
                                  }
                                : {}
                            }
                            key={index}
                          >
                            {chapter.chapter_number} {chapter.name_simple}
                          </div>
                        </Link>
                      ))}
                  </div>
                )}
              </div>
              <div className={styles.name}>
                <div>{surah.surah_name}</div>
                <div>
                  {bookmarkedSurah?.find((item) => item.id == surah.id) ? (
                    <BookmarkIcon
                      onClick={() => {
                        dispatch(removeFromBookmarkedSurah(currentChapter));
                        enqueueSnackbar(
                          `Surah ${currentChapter.name_simple} removed from bookmark`
                        );
                      }}
                    />
                  ) : (
                    <BookmarkBorderIcon
                      onClick={() => {
                        dispatch(addToBookmarkedSurah(currentChapter));
                        enqueueSnackbar(
                          `Surah ${currentChapter.name_simple} added to bookmark`
                        );
                      }}
                    />
                  )}
                </div>
              </div>
              <div className={styles.verse}>
                <div
                  className={styles.current__verse}
                  onClick={() => setOpenVerses((prev) => !prev)}
                >
                  Ayay {surah.total_verses} <span> </span>
                  {!openVerses ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                </div>
                {openVerses && (
                  <div className={styles.more__verses}>
                    <input
                      type="text"
                      placeholder=""
                      onChange={(e) => setVerseQuery(e.target.value)}
                    />
                    {Array.from(Array(surah.total_verses), (_, x) => x)
                      .filter((i) => i.toString().includes(verseQuery))
                      .map((item, index) => (
                        <div
                          className={styles.item}
                          onClick={() => router.push(`#verse-${item}`)}
                        >
                          {item}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div
              className={styles.chapter__verses}
              onClick={() => {
                setOpenVerses(false);
                setOpenChapters(false);
              }}
            >
              {Object.entries(surah.verses).map(([key, verse]) => (
                <>
                  <div
                    className={styles.chapter__verse}
                    id={`verse-${key}`}
                    style={
                      router.asPath.split("-")[1] == key
                        ? {
                            backgroundColor: "rgb(59, 160, 255,0.1)",
                          }
                        : {}
                    }
                  >
                    <div className={styles.verse__order}>{verse.id}</div>
                    <div className={styles.verse__arabic}>{verse.content} </div>
                    <div className={styles.verse__meaning}>
                      {verse.translation_eng}{" "}
                    </div>
                    {/* <div className={styles.verse__translator}>-- Quran.com</div> */}

                    <div className={styles.action}>
                      {console.log(
                        bookmarks.find((item) => item.id == verse.id)
                      )}
                      <span>
                        {bookmarks.find((item) => item.id == verse.id) ? (
                          <BookmarkIcon
                            onClick={() => {
                              dispatch(removeFromBookmark(verse));
                              enqueueSnackbar(
                                `Verse ${verse.id} removed from bookmark`
                              );
                            }}
                          />
                        ) : (
                          <BookmarkBorderIcon
                            onClick={() => {
                              dispatch(addToBookmark(verse));
                              enqueueSnackbar(
                                `Verse ${verse.id} added to bookmark`
                              );
                            }}
                          />
                        )}
                      </span>
                      <span>
                        <CopyToClipboard text={JSON.stringify(verse)}>
                          <ContentCopyIcon
                            onClick={() => {
                              enqueueSnackbar(
                                `Verse ${verse.id} Coppied To Clipboard`
                              );
                            }}
                          />
                        </CopyToClipboard>
                      </span>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className={styles.change}>
              {surah.id > 1 && (
                <div
                  className={styles.each}
                  onClick={() => router.push(`/chapter/${surah.id - 1}`)}
                >
                  Previous Surah
                </div>
              )}

              <div
                className={styles.each}
                onClick={() => router.push(`/chapter/${surah.id}/#verse-${1}`)}
              >
                Top Of Surah
              </div>
              {surah.id < 114 && (
                <div
                  className={styles.each}
                  onClick={() => router.push(`/chapter/${surah.id + 1}`)}
                >
                  Next Surah
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Chapter;

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    `https://al-quran1.p.rapidapi.com/${params.sl}`,
    {
      headers: {
        "X-RapidAPI-Host": "al-quran1.p.rapidapi.com",
        "X-RapidAPI-Key": "83712b7a59msh3c707d03b1cbf19p1b33d4jsna662d0e8fc77",
      },
    }
  );

  const {
    data: { chapters },
  } = await axios.get("http://api.quran.com/api/v3/chapters");
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { surah: data, chapters }, // will be passed to the page component as props
  };
}
