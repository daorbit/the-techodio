
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppThemeProvider } from './contexts/ThemeContext';
import { store } from './store/store';
import './index.css';
import App from './App.tsx';
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <BrowserRouter>
          <App />
          <Analytics />
        </BrowserRouter>
      </AppThemeProvider>
    </Provider>
  </StrictMode>
);
