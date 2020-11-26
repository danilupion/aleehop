import React, { useCallback, useRef, useState } from 'react';

import { random } from '../utils/array';
import { error, success } from '../utils/sounds';
import { say } from '../utils/speech';

import IconButton from './IconButton';

interface DictationProps {
  items: string[];
}

const Dictation = ({ items }: DictationProps): JSX.Element => {
  const chosen = useRef(random(items));
  const [input, setInput] = useState('');

  const onInputChange = useCallback((ev) => {
    setInput(ev.target.value.toUpperCase());
  }, []);

  const onCheck = useCallback(async () => {
    if (input.localeCompare(chosen.current, 'en', { sensitivity: 'base' }) === 0) {
      setInput('');
      await success();
      chosen.current = random(items);
    } else {
      await error();
    }
  }, [chosen, input, items]);

  const onSay = useCallback(() => {
    say(chosen.current);
  }, []);

  return (
    <div className="dictation">
      <div className="input">
        <input
          type="text"
          value={input}
          tabIndex={0}
          onChange={onInputChange}
          onBlur={(ev) => ev.target.focus()}
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
