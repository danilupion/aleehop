import { Fragment, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import challenges from '../../challenges';

import book from './book.svg';
import close from './close.svg';
import gear from './gear.svg';
import styles from './index.module.scss';
import menu from './menu.svg';
import Settings from './settings';
import SidePanel, { Side } from './sidePanel';

const Header = (): JSX.Element => {
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  const closeLeftPanel = useCallback(() => {
    setLeftPanelOpen(false);
  }, [setLeftPanelOpen]);

  const closeRightPanel = useCallback(() => {
    setRightPanelOpen(false);
  }, [setRightPanelOpen]);

  const toggleLeftPanel = useCallback(() => {
    if (!leftPanelOpen) {
      closeRightPanel();
    }
    setLeftPanelOpen(!leftPanelOpen);
  }, [leftPanelOpen, setLeftPanelOpen, closeRightPanel]);

  const toggleRightPanel = useCallback(() => {
    if (!rightPanelOpen) {
      closeLeftPanel();
    }
    setRightPanelOpen(!rightPanelOpen);
  }, [rightPanelOpen, setRightPanelOpen, closeLeftPanel]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={toggleLeftPanel}>
          <img src={leftPanelOpen ? close : menu} alt="Open Menu" />
        </button>
        <h1>
          <a href="/">
            <img src={book} alt="Icon" />
            <span>&nbsp;Aleehop</span>
          </a>
        </h1>
        <button onClick={toggleRightPanel}>
          <img src={rightPanelOpen ? close : gear} alt="Open Settings" />
        </button>
      </div>
      <SidePanel open={leftPanelOpen} onClose={closeLeftPanel} side={Side.Left}>
        {challenges.map((c, index) => (
          <Fragment key={index}>
            <div className={styles.menuCard}>
              <p className={styles.title}>Reto {index + 1}</p>
              <Link
                className={styles.menuLink}
                to={`/bingo/syllable/${index + 1}/false`}
                onClick={closeLeftPanel}
              >
                Bingo Sílabas
              </Link>
              <Link
                className={styles.menuLink}
                to={`/bingo/word/${index + 1}/false`}
                onClick={closeLeftPanel}
              >
                Bingo Palabras
              </Link>
              <Link
                className={styles.menuLink}
                to={`/dictation/word/${index + 1}/false`}
                onClick={closeLeftPanel}
              >
                Dictado Palabras
              </Link>
              {c.phrases.length > 0 && (
                <Link
                  className={styles.menuLink}
                  to={`/dictation/phrase/${index + 1}/false`}
                  onClick={closeLeftPanel}
                >
                  Dictado Frases
                </Link>
              )}
              <Link
                className={styles.menuLink}
                to={`/reading/word/${index + 1}/false`}
                onClick={closeLeftPanel}
              >
                Lectura Palabras
              </Link>
              {c.phrases.length > 0 && (
                <Link
                  className={styles.menuLink}
                  to={`/reading/phrase/${index + 1}/false`}
                  onClick={closeLeftPanel}
                >
                  Lectura Frases
                </Link>
              )}
            </div>
            {index > 0 && (
              <div className={styles.menuCard}>
                <p className={styles.title}>Reto 1 al {index + 1}</p>
                <Link
                  className={styles.menuLink}
                  to={`/bingo/syllable/${index + 1}/true`}
                  onClick={closeLeftPanel}
                >
                  Bingo Sílabas
                </Link>
                <Link
                  className={styles.menuLink}
                  to={`/bingo/word/${index + 1}/true`}
                  onClick={closeLeftPanel}
                >
                  Bingo Palabras
                </Link>
                <Link
                  className={styles.menuLink}
                  to={`/dictation/word/${index + 1}/true`}
                  onClick={closeLeftPanel}
                >
                  Dictado Palabras
                </Link>

                <Link
                  className={styles.menuLink}
                  to={`/dictation/phrase/${index + 1}/true`}
                  onClick={closeLeftPanel}
                >
                  Dictado Frases
                </Link>

                <Link
                  className={styles.menuLink}
                  to={`/reading/word/${index + 1}/true`}
                  onClick={closeLeftPanel}
                >
                  Lectura Palabras
                </Link>
                <Link
                  className={styles.menuLink}
                  to={`/reading/phrase/${index + 1}/true`}
                  onClick={closeLeftPanel}
                >
                  Lectura Frases
                </Link>
              </div>
            )}
          </Fragment>
        ))}
      </SidePanel>
      <SidePanel open={rightPanelOpen} onClose={closeRightPanel} side={Side.Right}>
        <Settings onSave={closeRightPanel} />
      </SidePanel>
    </div>
  );
};

export default Header;
