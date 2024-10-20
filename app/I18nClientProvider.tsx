'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { initTranslationsClient } from './i18n';
import { i18n } from 'i18next';

export default function I18nClientProvider({
  children,
  locale,
  namespaces,
}: {
  children: React.ReactNode;
  locale: string;
  namespaces: string[];
}) {
  const [instance, setInstance] = useState<i18n | null>(null);

  useEffect(() => {
    const i18nInstance = initTranslationsClient(locale, namespaces);
    setInstance(i18nInstance);
  }, [locale, namespaces]);

  if (!instance) {
    return null;
  }

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
