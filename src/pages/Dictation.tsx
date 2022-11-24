import { ChangeEvent, FocusEvent, KeyboardEvent, useCallback, useState } from 'react';

import IconButton from '../components/IconButton';
import useAppState from '../hooks/useAppState';
import useSettings, { TextCase } from '../hooks/useSettings';
import { error, success } from '../utils/sounds';
import { say } from '../utils/speech';

import styles from './Dictation.module.scss';

const Dictation = (): JSX.Element => {
  const { textCase } = useSettings();
  const { chosen, chooseNext } = useAppState();
  const [input, setInput] = useState('');

  const onInputChange = useCallback((ev: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(ev.target.value.toUpperCase());
  }, []);

  const onCheck = useCallback(async () => {
    if (input.localeCompare(chosen, 'en', { sensitivity: 'base' }) === 0) {
      setInput('');
      await success();
      chooseNext();
    } else {
      await error();
    }
  }, [chooseNext, chosen, input]);

  const onKeyUp = useCallback(
    async (ev: KeyboardEvent) => {
      if (ev.key === 'Enter') {
        await onCheck();
      }
    },
    [onCheck],
  );

  const onBlur = useCallback((ev: FocusEvent<HTMLTextAreaElement>) => {
    ev.target.focus();
  }, []);

  const onSay = useCallback(() => {
    say(chosen);
  }, [chosen]);

  return (
    <div className={styles.dictation}>
      <div className={styles.actions}>
        <IconButton className={styles.main} onClick={onSay} icon="fas fa-play" />
        <IconButton icon="fas fa-check" onClick={onCheck} />
      </div>
      <div className={styles.input}>
        <textarea
          className={textCase === TextCase.Lowercase ? styles.lowercase : styles.uppercase}
          value={input}
          tabIndex={0}
          onChange={onInputChange}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
        />
      </div>
    </div>
  );
};

export default Dictation;
