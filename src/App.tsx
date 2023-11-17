import { useState } from 'react';
import { NotificationsContext } from './contexts/NotificationsContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { ScanPage } from './pages/ScanPage/ScanPage';
import { WorkPage } from './pages/WorkPage/WorkPage';
import { INotification } from './types/INotification';

function App() {

  const [notifications, setNotifications] = useState<[] | INotification[]>([]);

  return (
    <NotificationsContext.Provider value={{notifications: notifications, setNotifications: setNotifications}}>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/workspace' element={<WorkPage />} />
          <Route path='/qr' element={<ScanPage />} />
        </Routes>
      </BrowserRouter>
    </NotificationsContext.Provider>
  );
}

export default App;
