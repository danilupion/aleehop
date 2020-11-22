import classnames from 'classnames';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import challenges from '../challenges';

import IconButton from './IconButton';

const Menu = (): JSX.Element => {
  const [menuVisible, setMenuVisible] = useState(false);

  const onToggleMenu = useCallback(() => {
    setMenuVisible(!menuVisible);
  }, [menuVisible]);

  return (
    <>
      <IconButton
        className={classnames('menu-icon', { active: menuVisible })}
        icon="fas fa-bars"
        onClick={onToggleMenu}
      />
      {menuVisible && (
        <div className="menu">
          {challenges.map((c, index) => (
            <div key={index}>
              <div>
                <div>RETO {index + 1}</div>
                <Link to={`/bingo/syllable/${index + 1}/false`} onClick={onToggleMenu}>
                  Bingo Sílabas
                </Link>
                {' | '}
                <Link to={`/bingo/word/${index + 1}/false`} onClick={onToggleMenu}>
                  Bingo Palabras
                </Link>
                {' | '}
                <Link to={`/dictation/word/${index + 1}/false`} onClick={onToggleMenu}>
                  Dictado
                </Link>
                {' | '}
                <Link to={`/reading/word/${index + 1}/false`} onClick={onToggleMenu}>
                  Lectura
                </Link>
              </div>
              {index > 0 && (
                <div>
                  <div>RETO 1..{index + 1}</div>
                  <Link to={`/bingo/syllable/${index + 1}/true`} onClick={onToggleMenu}>
                    Bingo Sílabas
                  </Link>
                  {' | '}
                  <Link to={`/bingo/word/${index + 1}/true`} onClick={onToggleMenu}>
                    Bingo Palabras
                  </Link>
                  {' | '}
                  <Link to={`/dictation/word/${index + 1}/true`} onClick={onToggleMenu}>
                    Dictado
                  </Link>
                  {' | '}
                  <Link to={`/reading/word/${index + 1}/true`} onClick={onToggleMenu}>
                    Lectura
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Menu;
