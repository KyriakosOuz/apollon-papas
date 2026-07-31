import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import el from './el.json';
import en from './en.json';
import { SITE } from '../config';

const saved = (() => {
  try {
    return localStorage.getItem('ap-lang');
  } catch {
    return null;
  }
})();

// With the toggle hidden, a stored 'el' would strand a returning visitor in a
// language they have no way to switch out of, so the saved value is ignored.
const initialLang = SITE.showLangToggle ? saved || 'en' : 'en';

i18n.use(initReactI18next).init({
  resources: {
    el: { translation: el },
    en: { translation: en },
  },
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

function syncDocument(lng: string) {
  document.documentElement.lang = lng;
  document.title = lng === 'el' ? 'Απόλλων Παπάς' : 'Apollon Papas';
  try {
    localStorage.setItem('ap-lang', lng);
  } catch {
    // private mode etc - non-fatal
  }
}

syncDocument(i18n.language);
i18n.on('languageChanged', syncDocument);

export default i18n;
