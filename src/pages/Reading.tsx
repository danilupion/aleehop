import classNames from 'classnames';
import { useCallback, useState } from 'react';

import IconButton from '../components/IconButton';
import useAppState from '../hooks/useAppState';
import { error, success } from '../utils/sounds';
import { recognize } from '../utils/speech';

const Reading = (): JSX.Element => {
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
