import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Registro do Service Worker para PWA + Offline
if ('serviceWorker' in navigator) {
  const updateSW = registerSW({
    onNeedRefresh() {
      if (confirm('Nova versão disponível. Deseja atualizar?')) {
        updateSW(true);
      }
    },
    onOfflineReady() {
      console.log('App pronto para uso offline!');
    },
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      console.log('SW registrado:', r?.scope);
    },
    onRegisterError(error: any) {
      console.error('Erro ao registrar SW:', error);
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
