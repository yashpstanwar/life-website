import { useCallback, useEffect, useState } from 'react';
import type { Language } from '../types';

const KEY = 'life-lang';

/** Language choice persists across visits and sets <html lang> for screen readers. */
export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const stored = window.localStorage.getItem(KEY);
    return stored === 'hi' ? 'hi' : 'en';
  });

  useEffect(() => {
    window.localStorage.setItem(KEY, language);
    document.documentElement.lang = language === 'hi' ? 'hi' : 'en';
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  }, []);

  return { language, setLanguage, toggleLanguage };
}
