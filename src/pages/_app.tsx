import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import ReduxProvider from "@/store/redux-provider";
import { Layout } from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReduxProvider>
  );
}
