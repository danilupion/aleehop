import classNames from 'classnames';
import React, { useCallback } from 'react';

import './Item.css';

interface ItemProps {
  className?: string;
  item: string;
  onClick?: (item: string) => void;
}

const Item = ({ onClick, item, className }: ItemProps): JSX.Element => {
  const doClick = useCallback(() => {
    onClick && onClick(item);
  }, [onClick, item]);
  return (
    <div className={classNames('item', className)} onClick={doClick}>
      {item}
    </div>
  );
};

export default Item;
