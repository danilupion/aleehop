import { useCallback } from 'react';

import IconButton from '../components/IconButton';
import Board from '../components/board/Board';
import useAppState from '../hooks/useAppState';
import { error, success } from '../utils/sounds';
import { say } from '../utils/speech';

import styles from './Bingo.module.scss';

const itemsLimit = 20;

const Bingo = (): JSX.Element => {
  const { items, chosen, chooseNext } = useAppState(itemsLimit);

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
    <div className={styles.bingo}>
      <div className={styles.actions}>
        <IconButton className={styles.main} onClick={onSay} icon="fas fa-play" />
      </div>
      <Board items={items} onClick={onItemClick} />
    </div>
  );
};

export default Bingo;
