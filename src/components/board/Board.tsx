import React from 'react';

import Item from './Item';
import './Board.css';

interface BoardProps {
  items: string[];
  onClick?: (item: string) => void;
}

const Board = ({ items, onClick }: BoardProps): JSX.Element => {
  return (
    <div className="board">
      {items.map((item, i) => (
        <Item key={i} item={item} onClick={onClick} />
      ))}
    </div>
  );
};

export default Board;
