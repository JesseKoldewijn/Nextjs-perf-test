import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Perf Test Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col">
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
