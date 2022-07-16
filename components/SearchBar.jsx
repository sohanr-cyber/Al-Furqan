import React, { useEffect, useState } from "react";
import styles from "../styles/Search.module.css";
import axios from "axios";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async (query) => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://al-quran1.p.rapidapi.com/corpus/${query}`,
          {
            headers: {
              "x-rapidapi-host": "al-quran1.p.rapidapi.com",
              "x-rapidapi-key":
                "83712b7a59msh3c707d03b1cbf19p1b33d4jsna662d0e8fc77",
            },
          }
        );
        console.log(data);
        setLoading(false);
        setResults(data);
      } catch (error) {
        console.log(error);
      }
    };
    query.length > 0 && fetch(query);
  }, [query]);

  return (
    <>
      <div className={styles.wrapper}>
        <input
          type="search"
          className="field"
          placeholder="Search By Word"
          onClick={() => setOpen(true)}
        />
      </div>
      {open && (
        <div className={styles.container}>
          <div className={styles.container__wrapper}>
            <div className={styles.top}>
              <input
                type="text"
                placeholder="Search Here"
                onChange={(e) => setQuery(e.target.value)}
              />{" "}
              <span onClick={() => setOpen(false)}>X</span>
            </div>
            <div className={styles.results}>
              {!loading ? (
                results.slice(1).map((verse, index) => (
                  <div
                    className={styles.verse}
                    onClick={() => {
                      setOpen(false);
                      router.push(
                        `/chapter/${verse.surah_no}/#verse-${verse.verse_no}`
                      );
                    }}
                    key={index}
                  >
                    <div className={styles.verse_meaning}>{verse.content}</div>
                    <div className={styles.reference}>
                      {verse.surah_no}:{verse.verse_no}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <CircularProgress />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
