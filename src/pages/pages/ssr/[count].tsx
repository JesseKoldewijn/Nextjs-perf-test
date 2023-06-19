import { Fragment, Suspense } from "react";

import { type iResponseCount } from "@/app/api/count/[count]/route";
import ListItem from "@/components/ListItem";
import { env } from "@/env.mjs";

const SSR = ({
  count,
  data,
}: {
  count: number;
  referer: string;
  data: iResponseCount;
}) => {
  return (
    <div>
      <h1>SSR - Pages - count: {count}</h1>
      <Suspense fallback={<>Loading...</>}>
        <div className="mt-2 flex flex-col gap-2">
          {data ? (
            data.elements.flatMap((item, idx) => {
              return (
                <Fragment key={idx}>
                  <ListItem item={item} />{" "}
                </Fragment>
              );
            })
          ) : (
            <span className="animate-pulse">Loading...</span>
          )}
        </div>
      </Suspense>
    </div>
  );
};
export default SSR;

export const getServerSideProps = async ({
  params,
}: {
  params: {
    count: string;
  };
}) => {
  const count = parseInt(params.count);
  const referer: string = env.NEXT_URI
    ? env.NEXT_URI
    : env.NEXT_PUBLIC_URI
    ? env.NEXT_PUBLIC_URI
    : "http://localhost:3000";

  if (isNaN(count)) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(`${referer}/api/count/${count ? count : 200}`);
  const data = (await res.json()) as iResponseCount;

  return {
    props: {
      count,
      referer,
      data,
    },
  };
};
