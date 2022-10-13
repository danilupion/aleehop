import classNames from 'classnames';

import useSettings, { TextCase } from '../../hooks/useSettings';

import styles from './Board.module.scss';
import Item from './Item';

interface BoardProps {
  items: string[];
  onClick?: (item: string) => void;
}

const Board = ({ items, onClick }: BoardProps): JSX.Element => {
  const { textCase } = useSettings();

  return (
    <div
      className={classNames(
        styles.board,
        textCase === TextCase.Lowercase ? styles.lowercase : styles.uppercase,
      )}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} onClick={onClick} />
      ))}
    </div>
  );
};

export default Board;
