import { shuffle } from 'lodash';

import challenge1 from '../challenges/1.json';
import challenge2 from '../challenges/2.json';
import challenge3 from '../challenges/3.json';
import challenge4 from '../challenges/4.json';
import challenge5 from '../challenges/5.json';

const challenges = [challenge1, challenge2, challenge3, challenge4, challenge5];

export enum Type {
  Syllable = 'syllable',
  Word = 'word',
  Phrase = 'phrase',
}

export default challenges;

export const getItems = (index: number, type: Type, backwards: boolean, take?: number) => {
  const chosenChallenges = challenges.slice(backwards ? 0 : index - 1, index);

  const items = chosenChallenges
    .map((c) => {
      switch (type) {
        case Type.Syllable:
          return c.syllables;
        case Type.Word:
          return c.words;
        case Type.Phrase:
          return c.phrases;
        default:
          return [];
      }
    })
    .flat();

  if (take) {
    return shuffle(items).slice(0, take);
  } else {
    return shuffle(items);
  }
};
