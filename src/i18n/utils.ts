import { translations, defaultLang, type Language, type TranslationKeys } from './translations';

export function getLangFromUrl(url: URL): Language {
  // Remove base URL from pathname
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const pathname = url.pathname.startsWith(base)
    ? url.pathname.slice(base.length)
    : url.pathname;
  const [, lang] = pathname.split('/');
  if (lang in translations) {
    return lang as Language;
  }
  return defaultLang;
}

export function useTranslations(lang: Language): TranslationKeys {
  return translations[lang];
}

export function getLocalizedPath(path: string, lang: Language): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Get base URL from Astro config (e.g., "/les-precieuses")
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  // For default language (fr), don't add prefix
  if (lang === defaultLang) {
    return `${base}/${cleanPath}`;
  }

  // For other languages, add prefix
  return `${base}/${lang}/${cleanPath}`;
}

export function getAlternateLanguage(lang: Language): Language {
  return 'fr';
}

export function getCurrentPath(url: URL, lang: Language): string {
  // Remove base URL from pathname
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let pathname = url.pathname.startsWith(base)
    ? url.pathname.slice(base.length)
    : url.pathname;

  // Remove language prefix if present
  if (lang !== defaultLang && pathname.startsWith(`/${lang}`)) {
    pathname = pathname.slice(lang.length + 1) || '/';
  }

  return pathname;
}
