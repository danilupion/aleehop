import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Content from './components/Content';
import Menu from './components/Menu';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="app">
        <Menu />
        <Content />
      </div>
    </BrowserRouter>
  );
}

export default App;
