import classNames from 'classnames';
import { useCallback } from 'react';

import styles from './Item.module.scss';

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
    <div className={classNames(styles.item, className)} onClick={doClick}>
      {item}
    </div>
  );
};

export default Item;
