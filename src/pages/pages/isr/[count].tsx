import { Fragment, Suspense } from "react";

import { type iResponseCount } from "@/app/api/count/[count]/route";
import ListItemServerSide from "@/components/listItemServerSide";
import { type GetStaticPaths } from "next";
import { env } from "@/env.mjs";

interface iPropsISR {
  count: number;
  referer: string;
  data: iResponseCount;
}

const SSR = ({ count, referer, data }: iPropsISR) => {
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

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      "/pages/isr/64",
      "/pages/isr/100",
      "/pages/isr/200",
      "/pages/isr/600",
    ],
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: {
    count: string;
  };
}) => {
  const paramObj: { count: string } = params as never;

  if (!paramObj.count) {
    return {
      notFound: true,
    };
  }

  const count = parseInt(String(paramObj.count));
  const referer: string = env.NEXT_URI ? env.NEXT_URI : env.NEXT_PUBLIC_URI;

  if (isNaN(count)) {
    return {
      notFound: true,
    };
  }

  const getData = async (countNum: string | number) => {
    const res = await fetch(`${referer}/api/count/${countNum}`);
    const data = (await res.json()) as iResponseCount;
    return data;
  };

  const data = await getData(count);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      count,
      referer,
      data,
    },
    revalidate: 60,
  };
};
