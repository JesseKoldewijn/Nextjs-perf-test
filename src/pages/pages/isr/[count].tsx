import { Fragment, Suspense } from "react";

import { type iResponseCount } from "@/app/api/count/[count]/route";
import ListItem from "@/components/ListItem";
import { type GetStaticPaths } from "next";
import { env } from "@/env.mjs";
import { getCountedData } from "@/utils/getCountedData";

interface iPropsISR {
  count: number;
  data: iResponseCount;
}

const SSR = ({ count, data }: iPropsISR) => {
  return (
    <div>
      <h1>SSR - Pages - count: {count}</h1>
      <Suspense fallback={<>Loading...</>}>
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
            <span className="animate-pulse">Loading...</span>
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
    fallback: "blocking",
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

  try {
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
  } catch (e) {
    const data = getCountedData(count);

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        count,
        data,
      },
      revalidate: 60,
    };
  }
};
