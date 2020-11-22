import React, { useCallback, useRef } from 'react';

import { random } from '../utils/array';
import { error, success } from '../utils/sounds';
import { say } from '../utils/speech';

import IconButton from './IconButton';
import Board from './board/Board';

interface BingoProps {
  items: string[];
}

const Bingo = ({ items }: BingoProps): JSX.Element => {
  const chosen = useRef(random(items));

  const onItemClick = useCallback(
    async (item: string) => {
      if (item === chosen.current) {
        await success();
        chosen.current = random(items);
      } else {
        await error();
      }
    },
    [items],
  );

  const onSay = useCallback(() => {
    say(chosen.current);
  }, []);

  return (
    <div className="bingo">
      <Board items={items} onClick={onItemClick} />
      <div className="actions">
        <IconButton className="play" onClick={onSay} icon="fas fa-play" />
      </div>
    </div>
  );
};

export default Bingo;
