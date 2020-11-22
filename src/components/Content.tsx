import { shuffle } from 'lodash';
import React, { useRef } from 'react';
import { Route } from 'react-router-dom';

import challenges from '../challenges';

import Bingo from './Bingo';
import Dictation from './Dictation';
import Reading from './Reading';

enum Type {
  Syllable = 'syllable',
  Word = 'word',
}

const getItems = (index: number, type: Type, backwards: boolean, take?: number) => {
  const chosenChallenges = challenges.slice(backwards ? 0 : index - 1, index);

  const items = chosenChallenges
    .map((c) => (type === Type.Syllable ? c.syllables : c.words))
    .flat();

  if (take) {
    return shuffle(items).slice(0, take);
  } else {
    return shuffle(items);
  }
};

const Content = (): JSX.Element => {
  const paint = useRef(0);

  return (
    <>
      <Route exact path="/"></Route>
      <Route
        exact
        path="/bingo/:type/:challenge/:backwards"
        render={(routerProps) => {
          paint.current++;
          const items = getItems(
            routerProps.match.params.challenge,
            routerProps.match.params.type,
            JSON.parse(routerProps.match.params.backwards),
            20,
          );

          return <Bingo items={items} key={paint.current} />;
        }}
      />
      <Route
        exact
        path="/dictation/:type/:challenge/:backwards"
        render={(routerProps) => {
          paint.current++;
          const items = getItems(
            routerProps.match.params.challenge,
            routerProps.match.params.type,
            JSON.parse(routerProps.match.params.backwards),
          );

          return <Dictation items={items} key={paint.current} />;
        }}
      />
      <Route
        exact
        path="/reading/:type/:challenge/:backwards"
        render={(routerProps) => {
          paint.current++;
          const items = getItems(
            routerProps.match.params.challenge,
            routerProps.match.params.type,
            JSON.parse(routerProps.match.params.backwards),
          );

          return <Reading items={items} key={paint.current} />;
        }}
      />
    </>
  );
};

export default Content;
