import { Route, Routes } from 'react-router-dom';

import Layout from './layouts/Layout';
import Bingo from './pages/Bingo';
import Dictation from './pages/Dictation';
import Reading from './pages/Reading';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/bingo/:type/:challenge/:backwards" element={<Bingo />} />
        <Route path="/dictation/:type/:challenge/:backwards" element={<Dictation />} />
        <Route path="/reading/:type/:challenge/:backwards" element={<Reading />} />
      </Route>
    </Routes>
  );
}

export default App;
