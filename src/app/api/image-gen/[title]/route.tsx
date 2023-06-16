import { ImageResponse } from "@vercel/og";

import { type ServerRuntime } from "next";

export const runtime: ServerRuntime = "edge";

interface iProps {
  params: {
    title: string;
  };
}

export type iResponseImageGen = ImageResponse;

export const GET = (req: Request, props: iProps) => {
  const title = props.params.title;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        {title ? title : "lorem ipsum"}
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
};
