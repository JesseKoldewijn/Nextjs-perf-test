import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const AppHome: NextPage = () => {
  return (
    <>
      <Head>
        <title>Perf Test Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-col items-center justify-center">
        <h1>Perf Test Next.js</h1>
        <div className="mt-4 flex w-full max-w-md items-center justify-center gap-8 text-center">
          <div className="flex flex-col">
            <h2 className="mb-2 font-bold">App</h2>
            <Link
              className="underline hover:font-semibold hover:no-underline"
              href="/app/ssr/64"
            >
              SSR
            </Link>
            <Link
              className="underline hover:font-semibold hover:no-underline"
              href="/app/isr/64"
            >
              ISR
            </Link>
            <Link
              className="underline hover:font-semibold hover:no-underline"
              href="/app/dynamic/64"
            >
              Dynamic
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default AppHome;
