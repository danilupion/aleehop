import { ChangeEvent, FocusEvent, KeyboardEvent, useCallback, useState } from 'react';

import IconButton from '../components/IconButton';
import useAppState from '../hooks/useAppState';
import { error, success } from '../utils/sounds';
import { say } from '../utils/speech';

const Dictation = (): JSX.Element => {
  const { chosen, chooseNext } = useAppState();
  const [input, setInput] = useState('');

  const onInputChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
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

  const onBlur = useCallback((ev: FocusEvent<HTMLInputElement>) => {
    ev.target.focus();
  }, []);

  const onSay = useCallback(() => {
    say(chosen);
  }, [chosen]);

  return (
    <div className="dictation">
      <div className="input">
        <input
          type="text"
          value={input}
          tabIndex={0}
          onChange={onInputChange}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
        />{' '}
        <IconButton className="check" icon="fas fa-question" onClick={onCheck} />
      </div>
      <div className="actions">
        <IconButton className="play" onClick={onSay} icon="fas fa-play" />
      </div>
    </div>
  );
};

export default Dictation;
