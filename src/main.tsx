import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/manrope';
import '@fontsource-variable/inter';
import './styles/index.css';
import './styles/site.css';
import './i18n';
import App from './App';
import { installGreekDisplayGuard } from './lib/greekDisplayGuard';

installGreekDisplayGuard();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
