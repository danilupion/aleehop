import { useCallback } from 'react';

import IconButton from '../components/IconButton';
import Board from '../components/board/Board';
import useAppState from '../hooks/useAppState';
import { error, success } from '../utils/sounds';
import { say } from '../utils/speech';

const Bingo = (): JSX.Element => {
  const { items, chosen, chooseNext } = useAppState();

  const onItemClick = useCallback(
    async (item: string) => {
      if (item === chosen) {
        await success();
        chooseNext();
      } else {
        await error();
      }
    },
    [chooseNext, chosen],
  );

  const onSay = useCallback(() => {
    say(chosen);
  }, [chosen]);

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
