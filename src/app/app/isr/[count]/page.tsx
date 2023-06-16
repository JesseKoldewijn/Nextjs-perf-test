import { type iResponseCount } from "@/app/api/count/[count]/route";
import ListItemServerSide from "@/components/listItemServerSide";
import { notFound } from "next/navigation";
import React, { Fragment, Suspense } from "react";

interface iPropsISR {
  params: { count: number };
}

export const revalidate = 60;

const SSR = async ({ params }: iPropsISR) => {
  const count = Number(params.count);

  if (isNaN(count)) {
    return notFound();
  }

  const referer = "http://localhost:3000";

  const res = await fetch(`${referer}/api/count/${count}`);
  const data = (await res.json()) as iResponseCount;

  return (
    <div>
      <h1>SSR - Pages - count: {count}</h1>
      <Suspense fallback={<>Loading...</>}>
        <div className="flex flex-col">
          {data ? (
            data.elements.flatMap((item, idx) => {
              const imageRef = `${referer}/api/image-gen/${idx + 1}`;
              return (
                <Fragment key={idx}>
                  <ListItemServerSide imageRef={imageRef} item={item} />{" "}
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

export const generateStaticParams = () => {
  return ["64", "100", "200", "600"];
};