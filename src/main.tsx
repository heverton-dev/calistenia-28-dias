import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);

// Registro de Service Worker PWA para suporte 100% Offline (iOS Safari & Android Chrome)
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silencia falha se em ambiente de desenvolvimento sem SSL
    });
  });
}
