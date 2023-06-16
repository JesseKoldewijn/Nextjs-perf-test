import { NextResponse } from "next/server";

import { setTimeout } from "timers/promises";
import { getCountedData } from "@/utils/getCountedData";

interface iProps {
  params: {
    count: string;
  };
}

export interface iResponseCount {
  total: number;
  elements: {
    name: string;
    desc: string;
  }[];
}

export const GET = async (req: Request, props: iProps) => {
  const count = props.params.count;

  if (isNaN(parseInt(count))) {
    return NextResponse.json({
      total: props.params.count,
      elements: [],
    });
  }

  const data = getCountedData(parseInt(count));
  await setTimeout(1250);

  return NextResponse.json(data);
};
