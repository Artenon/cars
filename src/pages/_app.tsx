import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import ReduxProvider from "@/store/redux-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}
