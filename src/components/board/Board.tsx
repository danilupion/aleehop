import './Board.css';
import Item from './Item';

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
