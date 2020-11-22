import classNames from 'classnames';
import React, { useCallback, useState } from 'react';

import { random } from '../utils/array';
import { error, success } from '../utils/sounds';
import { recognize } from '../utils/speech';

import IconButton from './IconButton';

interface ReadingProps {
  items: string[];
}

const Reading = ({ items }: ReadingProps): JSX.Element => {
  const [chosen, setChosen] = useState(random(items));
  const [listening, setListening] = useState(false);

  const onDictate = useCallback(async () => {
    try {
      setListening(true);
      const result = await recognize(items);
      if (chosen.localeCompare(result, 'en', { sensitivity: 'base' }) === 0) {
        await success();
        setChosen(random(items));
      } else {
        await error();
      }
    } catch (e) {
      await error();
    } finally {
      setListening(false);
    }
  }, [items, chosen]);

  return (
    <div className="reading">
      <div className="actions">
        <div className="to-read">{chosen}</div>
        <IconButton
          className={classNames('play', { disabled: listening })}
          onClick={onDictate}
          icon="fas fa-microphone"
          disabled={listening}
        />
      </div>
    </div>
  );
};

export default Reading;
