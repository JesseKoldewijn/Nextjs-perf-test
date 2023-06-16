import React, { Fragment, Suspense } from "react";

import { type ServerRuntime } from "next";
import { notFound } from "next/navigation";

import { type iResponseCount } from "@/app/api/count/[count]/route";
import ListItemServerSide from "@/components/listItemServerSide";
import { env } from "@/env.mjs";

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
      <Suspense fallback={<>Loading...</>}>
        <div className="flex flex-col">
          {data ? (
            data.elements.flatMap((item, idx) => {
              return (
                <Fragment key={idx}>
                  <ListItemServerSide item={item} />{" "}
                </Fragment>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default SSR;
