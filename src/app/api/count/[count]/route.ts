import { NextResponse } from "next/server";

import { LoremIpsum } from "lorem-ipsum";
import { setTimeout } from "timers/promises";

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
  const dataArray = [];
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 12,
      min: 6,
    },
  });

  for (let index = 1; index < parseInt(count) + 1; index++) {
    dataArray.push({
      name: lorem.generateWords(2),
      desc: lorem.generateSentences(2),
    });
  }

  await setTimeout(1250);

  return NextResponse.json({
    total: props.params.count,
    elements: dataArray,
  });
};
