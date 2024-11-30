'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

export const i18nConfig = {
  fallbackLng: 'en',
  supportedLngs: ['en'],
  defaultNS: 'common',
  ns: ['common'],
  debug: process.env.NODE_ENV === 'development',
};

export const initTranslationsClient = (lang: string, namespaces: string[]) => {
  const i18nInstance = i18next.createInstance();
  i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => 
      import(`../public/locales/${language}/${namespace}.json`)))
    .init({
      lng: lang,
      fallbackLng: 'en',
      supportedLngs: ['en'],
      defaultNS: 'common',
      fallbackNS: 'common',
      ns: namespaces,
    });
  return i18nInstance;
};

export default i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(resourcesToBackend((language: string, namespace: string) => import(`../public/locales/${language}/${namespace}.json`)))
  .init(i18nConfig);
