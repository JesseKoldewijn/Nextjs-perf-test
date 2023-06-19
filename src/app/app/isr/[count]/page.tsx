import { type iResponseCount } from "@/app/api/count/[count]/route";
import ListItem from "@/components/ListItem";
import Loading from "@/components/Loading";
import { env } from "@/env.mjs";
import { type ServerRuntime } from "next";
import { notFound } from "next/navigation";
import React, { Fragment, Suspense } from "react";

interface iPropsISR {
  params: { count: number };
}

export const runtime: ServerRuntime = "edge";
export const revalidate = 60;

const SSR = async ({ params }: iPropsISR) => {
  const referer: string = env.NEXT_URI
    ? env.NEXT_URI
    : env.NEXT_PUBLIC_URI
    ? env.NEXT_PUBLIC_URI
    : "http://localhost:3000";
  const count = Number(params.count);

  if (isNaN(count)) {
    return notFound();
  }

  const res = await fetch(`${referer}/api/count/${count}`);
  const data = (await res.json()) as iResponseCount;

  return (
    <div>
      <h1>SSR - Pages - count: {count}</h1>
      <Suspense fallback={<Loading />}>
        <div className="mt-2 flex flex-col gap-2">
          {data.elements.flatMap((item, idx) => {
            return (
              <Fragment key={idx}>
                <ListItem item={item} />
              </Fragment>
            );
          })}
        </div>
      </Suspense>
    </div>
  );
};
export default SSR;

export const generateStaticParams = () => {
  return ["64", "100", "200", "600"];
};
