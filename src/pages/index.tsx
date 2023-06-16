import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <h1>Perf Test Next.js</h1>
        <div className="mt-4 flex w-full max-w-md items-center justify-center gap-8 text-center">
          <div className="flex flex-col">
            <h2 className="mb-2 font-bold">Pages</h2>
            <Link
              className="text-black underline hover:font-semibold hover:no-underline"
              href="/pages/ssr"
            >
              SSR
            </Link>
            <Link
              className="text-black underline hover:font-semibold hover:no-underline"
              href="/pages/isr"
            >
              ISR
            </Link>
            <Link
              className="text-black underline hover:font-semibold hover:no-underline"
              href="/pages/dynamic"
            >
              Dynamic
            </Link>
          </div>
          <div className="flex flex-col">
            <h2 className="mb-2 font-bold">App</h2>
            <Link
              className="text-black underline hover:font-semibold hover:no-underline"
              href="/app/ssr"
            >
              SSR
            </Link>
            <Link
              className="text-black underline hover:font-semibold hover:no-underline"
              href="/app/isr"
            >
              ISR
            </Link>
            <Link
              className="text-black underline hover:font-semibold hover:no-underline"
              href="/app/dynamic"
            >
              Dynamic
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
