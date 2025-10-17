import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import type { ResumeData } from '../types/resume';

import type { Language, TranslationContent } from './translations';
import { resumeByLanguage, translations } from './translations';

type ExtractStringPaths<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends string
    ? `${Prefix}${K & string}`
    : T[K] extends readonly unknown[]
      ? never
      : T[K] extends Record<string, unknown>
        ? ExtractStringPaths<T[K], `${Prefix}${K & string}.`>
        : never;
}[keyof T];

export type TranslationKey = ExtractStringPaths<TranslationContent>;

type TranslationParams = Record<string, string | number>;

interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  content: TranslationContent;
  resume: ResumeData;
  translate: (key: TranslationKey, params?: TranslationParams) => string;
}

export const LANGUAGE_STORAGE_KEY = 'jzwebstudio:language';

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === 'es' ? 'es' : 'en';
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export const I18nProvider = ({ children, initialLanguage }: I18nProviderProps) => {
  const [language, setLanguageState] = useState<Language>(
    () => initialLanguage ?? getInitialLanguage()
  );

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
  }, [language]);

  const translate = useCallback(
    (key: TranslationKey, params?: TranslationParams) => {
      const segments = key.split('.');
      let result: unknown = translations[language];

      for (const segment of segments) {
        if (typeof result !== 'object' || result === null) {
          result = undefined;
          break;
        }
        result = (result as Record<string, unknown>)[segment];
      }

      if (typeof result !== 'string') {
        return key;
      }

      if (!params) {
        return result;
      }

      return Object.entries(params).reduce(
        (accumulator, [token, value]) => accumulator.replaceAll(`{{${token}}}`, String(value)),
        result
      );
    },
    [language]
  );

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      content: translations[language],
      resume: resumeByLanguage[language],
      translate,
    }),
    [language, setLanguage, translate]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }

  return context;
};
