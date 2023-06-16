import { LoremIpsum } from "lorem-ipsum";

export const getCountedData = (count: number) => {
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

  for (let index = 1; index < count + 1; index++) {
    dataArray.push({
      name: lorem.generateWords(2),
      desc: lorem.generateSentences(2),
    });
  }

  return {
    total: count,
    elements: dataArray,
  };
};
