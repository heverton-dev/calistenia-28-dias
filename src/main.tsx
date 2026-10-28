import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Limpeza de Service Workers antigos em desenvolvimento
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    for (const reg of regs) {
      reg.unregister();
    }
  });
  if ('caches' in window) {
    caches.keys().then(keys => {
      for (const k of keys) {
        caches.delete(k);
      }
    });
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
