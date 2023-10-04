import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CardContextProvider } from "../store/card-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CardContextProvider>
      <Component {...pageProps} />
    </CardContextProvider>
  );
}
