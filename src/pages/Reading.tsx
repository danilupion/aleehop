import classNames from 'classnames';
import { useCallback, useState } from 'react';

import IconButton from '../components/IconButton';
import useAppState from '../hooks/useAppState';
import useSettings, { TextCase } from '../hooks/useSettings';
import { error, success } from '../utils/sounds';
import { recognize } from '../utils/speech';

import styles from './Reading.module.scss';

const Reading = (): JSX.Element => {
  const { textCase } = useSettings();
  const { items, chosen, chooseNext } = useAppState();
  const [listening, setListening] = useState(false);

  const onDictate = useCallback(async () => {
    try {
      setListening(true);
      const result = await recognize(items);
      if (chosen.localeCompare(result, 'en', { sensitivity: 'base' }) === 0) {
        await success();
        chooseNext();
      } else {
        await error();
      }
    } catch (e) {
      await error();
    } finally {
      setListening(false);
    }
  }, [items, chosen, chooseNext]);

  return (
    <div className={styles.reading}>
      <div className={styles.actions}>
        <IconButton
          className={classNames(styles.main, { disabled: listening })}
          onClick={onDictate}
          icon="fas fa-microphone"
          disabled={listening}
        />
      </div>
      <div
        className={classNames(
          styles.toRead,
          textCase === TextCase.Lowercase ? styles.lowercase : styles.uppercase,
        )}
      >
        {chosen}
      </div>
    </div>
  );
};

export default Reading;
