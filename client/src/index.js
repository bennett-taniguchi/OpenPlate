// Directory of OpenPlate
// 3 Components : Search page (App), Landing Page (Main), Analytics (Data)
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Data from './Data'
import Main from './Main'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="Data" element={<Data />} />
      <Route path="App" element={<App />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

