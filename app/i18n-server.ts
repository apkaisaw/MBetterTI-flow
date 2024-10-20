import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import path from 'path';
import fs from 'fs/promises';

export async function initTranslationsServer(lang: string, namespaces: string[]) {
  const i18nInstance = i18next.createInstance();
  await i18nInstance
    .use(resourcesToBackend(async (language: string, namespace: string) => {
      const filePath = path.join(process.cwd(), 'public', 'locales', language, `${namespace}.json`);
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    }))
    .init({
      lng: lang,
      fallbackLng: 'en',
      supportedLngs: ['en', 'zh'],
      defaultNS: namespaces[0],
      fallbackNS: namespaces[0],
      ns: namespaces,
      preload: ['en', 'zh'],
    });
  return i18nInstance;
}
