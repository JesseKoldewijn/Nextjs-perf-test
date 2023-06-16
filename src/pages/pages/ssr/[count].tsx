import { Fragment, Suspense } from "react";

import { type iResponseCount } from "@/app/api/count/[count]/route";
import ListItemServerSide from "@/components/listItemServerSide";
import { env } from "@/env.mjs";

const SSR = ({
  count,
  referer,
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
