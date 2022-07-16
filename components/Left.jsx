import React from "react";
import styles from "../styles/Left.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setDark, setLight } from "../redux/themeSlicer";
import InfoIcon from "@mui/icons-material/Info";
import ApiIcon from "@mui/icons-material/Api";
import CodeIcon from "@mui/icons-material/Code";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import Image from "next/image";

const Left = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(router);
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className={styles.leftContainer}>
      <div className={styles.top}>
        <div className={styles.logo} onClick={() => router.push("/")}>
          <Image src="/images/quran.png" width="32px" height="32px" alt="" />

          <span> Al Furqan</span>
        </div>

        <div
          className={styles.item}
          style={
            router.asPath == "/"
              ? {
                  color: "rgb(0, 166, 255)",
                  fontSize: "110%",
                  fontWeight: "bold",
                }
              : {}
          }
          onClick={() => router.push("/")}
        >
          <div className={styles.icon}>
            <HomeIcon
              className={styles.item__icon}
              // style={
              //   router.asPath == "/" && {
              //     color: "rgb(0, 166, 255)",
              //   }
              // }
            />
          </div>
          <div className={styles.name}>Home</div>
        </div>
        <div
          className={styles.item}
          style={
            router.asPath == "/bookmarks"
              ? {
                  color: "rgb(0, 166, 255)",
                  fontSize: "110%",
                  fontWeight: "550",
                }
              : {}
          }
          onClick={() => router.push("/bookmarks")}
        >
          <div className={styles.icon}>
            <BookmarkAddedIcon className={styles.icon} />
          </div>
          <div className={styles.name}>Bookmarks</div>
        </div>
        <div
          className={styles.item}
          style={
            router.asPath == "/history"
              ? {
                  color: "rgb(0, 166, 255)",
                  fontSize: "110%",
                  fontWeight: "550",
                }
              : {}
          }
          onClick={() => router.push("/history")}
        >
          <div className={styles.icon}>
            <HistoryIcon className={styles.item__icon} />
          </div>
          <div className={styles.name}>History</div>
        </div>
        <div
          className={styles.item}
          onClick={() =>
            router.push("https://github.com/sohanr-cyber/Al-Furqan")
          }
        >
          <div className={styles.icon}>
            <CodeIcon className={styles.item__icon} />
          </div>
          <div className={styles.name}>Developer</div>
        </div>
        <div
          className={styles.item}
          onClick={() =>
            router.push("https://rapidapi.com/raz0229/api/al-quran1/")
          }
        >
          <div className={styles.icon}>
            <ApiIcon className={styles.item__icon} />
          </div>
          <div className={styles.name}>API</div>
        </div>
        <div
          className={styles.item}
          style={
            router.asPath == "/about"
              ? {
                  color: "rgb(0, 166, 255)",
                  fontSize: "110%",
                  fontWeight: "550",
                }
              : {}
          }
          onClick={() => router.push("/about")}
        >
          <div className={styles.icon}>
            <InfoIcon className={styles.item__icon} />
          </div>
          <div className={styles.name}>About Us</div>
        </div>
      </div>
      {/* <div className={styles.bottom}>
        <div onClick={() => dispatch(setDark())}>dark</div>
        <div onClick={() => dispatch(setLight())}>light</div>
      </div> */}
    </div>
  );
};

export default Left;
