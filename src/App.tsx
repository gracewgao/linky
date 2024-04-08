import React from 'react';
import Game from './components/Game';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/About';

const GlobalStyle = createGlobalStyle`
  body{ 
    font-family: 'Bricolage Grotesque'; 
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  html {
    font-size: clamp(12px, 2vw, 18px);
  }
  
  body {
    font-size: 1rem;
  }
`;

function App() {
  return (
    <BrowserRouter basename="/linky">
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
