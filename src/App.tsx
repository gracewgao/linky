import React from 'react';
import logo from './logo.svg';
import Game from './components/Game';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import About from './components/About';

const GlobalStyle = createGlobalStyle`
  body{ 
    font-family: 'Bricolage Grotesque'; 
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
