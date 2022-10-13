import { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SettingsContext, TextCase } from './hooks/useSettings';
import Layout from './layouts/Layout';
import Bingo from './pages/Bingo';
import Dictation from './pages/Dictation';
import Reading from './pages/Reading';

const LOCASL_STORAGE_KEY = 'textCase';

function App(): JSX.Element {
  const [textCase, setTextCase] = useState(
    (localStorage.getItem(LOCASL_STORAGE_KEY) as TextCase) || TextCase.Lowercase,
  );

  const onSetTextCase = useCallback((newTextCase: TextCase) => {
    setTextCase(newTextCase);
    localStorage.setItem(LOCASL_STORAGE_KEY, newTextCase);
  }, []);

  return (
    <SettingsContext.Provider value={{ textCase, setTextCase: onSetTextCase }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/bingo/:type/:challenge/:backwards" element={<Bingo />} />
          <Route path="/dictation/:type/:challenge/:backwards" element={<Dictation />} />
          <Route path="/reading/:type/:challenge/:backwards" element={<Reading />} />
        </Route>
      </Routes>
    </SettingsContext.Provider>
  );
}

export default App;
