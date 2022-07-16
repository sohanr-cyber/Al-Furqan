import "../styles/globals.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import ProgressBar from "react-scroll-progress-bar"; //Add this line
import NextNProgress from "nextjs-progressbar";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress height={3} color="black" />
      <SnackbarProvider>
        <Provider store={store}>
          <ProgressBar bgcolor=" #00b7ff" />
          <Component {...pageProps} />
        </Provider>
      </SnackbarProvider>
    </>
  );
}

export default MyApp;
