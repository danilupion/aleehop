import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Type, getItems } from '../challenges';
import { random } from '../utils/array';

const useAppState = (limit: number | undefined = undefined) => {
  const [items, setItems] = useState<string[]>([]);
  const [chosen, setChosen] = useState<string>(random(items));

  const chooseNext = useCallback(() => {
    setChosen(random(items));
  }, [setChosen, items]);
  const { challenge, type, backwards } = useParams<{
    challenge: string;
    type: string;
    backwards: string;
  }>();

  useEffect(() => {
    const items = getItems(
      Number.parseInt(challenge || '0', 10),
      type as Type,
      backwards && JSON.parse(backwards),
      limit,
    );
    setItems(items);
    setChosen(random(items));
  }, [challenge, type, backwards, limit]);

  return {
    items,
    chosen,
    chooseNext,
  };
};

export default useAppState;
