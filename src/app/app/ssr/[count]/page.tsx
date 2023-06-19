import React, { Fragment, Suspense } from "react";

import { type ServerRuntime } from "next";
import { notFound } from "next/navigation";

import { type iResponseCount } from "@/app/api/count/[count]/route";
import ListItem from "@/components/ListItem";
import { env } from "@/env.mjs";
import Loading from "@/components/Loading";

export const runtime: ServerRuntime = "edge";
export const revalidate = 60;

const SSR = async ({ params }: { params: { count: string } }) => {
  const count = Number(params.count);

  if (isNaN(count)) {
    return notFound();
  }

  const referer: string = env.NEXT_URI
    ? env.NEXT_URI
    : env.NEXT_PUBLIC_URI
    ? env.NEXT_PUBLIC_URI
    : "http://localhost:3000";

  const res = await fetch(`${referer}/api/count/${count}`);
  const data = (await res.json()) as iResponseCount;

  return (
    <div>
      <h1>SSR - App - count: {count}</h1>
      <Suspense fallback={<Loading />}>
        <div className="mt-2 flex flex-col gap-2">
          {data.elements.flatMap((item, idx) => {
            return (
              <Fragment key={idx}>
                <ListItem item={item} />{" "}
              </Fragment>
            );
          })}
        </div>
      </Suspense>
    </div>
  );
};

export default SSR;
