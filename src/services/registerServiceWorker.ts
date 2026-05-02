import { Platform } from 'react-native';

type BrowserGlobal = typeof globalThis & {
  document?: {
    getElementById: (id: string) => { style: { opacity: string }; remove: () => void } | null;
  };
  navigator?: {
    serviceWorker?: {
      register: (url: string) => Promise<unknown>;
    };
  };
};

export const hidePwaSplash = () => {
  if (Platform.OS !== 'web') return;
  const browser = globalThis as BrowserGlobal;
  const splash = browser.document?.getElementById('pwa-splash');
  if (!splash) return;

  splash.style.opacity = '0';
  setTimeout(() => splash.remove(), 240);
};

export const registerServiceWorker = () => {
  if (Platform.OS !== 'web') return;
  const browser = globalThis as BrowserGlobal;

  if (!browser.navigator?.serviceWorker) return;

  browser.navigator.serviceWorker.register('/service-worker.js').catch((error) => {
    console.warn('LOLO service worker registration failed', error);
  });
};
