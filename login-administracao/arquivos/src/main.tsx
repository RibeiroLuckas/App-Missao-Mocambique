import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { AdminProvider } from './admin/AdminProvider';
import AdminPanel from './admin/AdminPanel';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminProvider><App /><AdminPanel /></AdminProvider>
  </StrictMode>,
);
