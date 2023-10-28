import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { ScanPage } from './pages/ScanPage/ScanPage';
import { WorkPage } from './pages/WorkPage/WorkPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/workspace' element={<WorkPage />} />
        <Route path='/scan' element={<ScanPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
