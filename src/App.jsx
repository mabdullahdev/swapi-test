import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CharacterListPage, CharacterDetailPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CharacterListPage />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
