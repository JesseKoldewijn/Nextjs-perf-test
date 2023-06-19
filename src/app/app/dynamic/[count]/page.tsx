"use client";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type iResponseCount } from "@/app/api/count/[count]/route";
import ListItem from "@/components/ListItem";
import Loading from "@/components/Loading";
import { env } from "@/env.mjs";
import ErrorPage from "next/error";
import { Fragment, useState, useMemo, useRef } from "react";

const Dynamic = ({ params }: { params: { count: string | string[] } }) => {
  const { count } = params;
  const countRef = useRef<string | string[] | undefined>();
  const [data, setData] = useState<iResponseCount | undefined>(undefined);

  const getData = async (count: string | string[] | undefined) => {
    if (data !== undefined || countRef.current !== undefined) return;
    countRef.current = count;

    const referer: string = env.NEXT_PUBLIC_URI
      ? env.NEXT_PUBLIC_URI
      : "http://localhost:3000";

    if (typeof count !== "string" || isNaN(parseInt(count))) {
      return;
    }

    const res = await fetch(`${referer}/api/count/${count ? count : 200}`);
    const dataObj = (await res.json()) as iResponseCount;

    if (dataObj) {
      setData(dataObj);
    }
  };

  useMemo(() => {
    getData(count).catch((ex) => {
      console.error(ex);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  if (typeof count !== "string" || isNaN(parseInt(count))) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
      <h1>Dynamic - Pages - count: {count}</h1>
      <div className="mt-2 flex flex-col gap-2">
        {data !== undefined ? (
          data.elements.flatMap((item, idx) => {
            return (
              <Fragment key={idx}>
                <ListItem item={item} />{" "}
              </Fragment>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
export default Dynamic;
