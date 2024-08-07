import en from "./translations/en.js";
import ptBr from "./translations/pt-BR.js";

/** @type {Map<string, import('@/types').Translation>} */
const supportedLanguages = new Map([
  [ptBr.meta.lang, ptBr],
  [en.meta.lang, en],
]);

/**
 * Sets the current language to be used in the application.
 *
 * @param {string} newLang The new language to set. Must be one of the keys of
 *     {@link supportedLanguages}.
 */
export function setCurrentLanguage(newLang) {
  const tmpLang = supportedLanguages.get(newLang);
  if (!tmpLang) {
    return;
  }

  lang = tmpLang;
}

/**
 * @returns {string[]} The supported languages.
 */
export function getSupportedLanguages() {
  return Array.from(supportedLanguages.entries()).map(([key, _]) => key);
}

/**
 * Selected language, that can be changed through {@link setCurrentLanguage}.
 * @readonly
 * @default pt-BR - Brazilian Portuguese.
 */
let lang = ptBr;

export const t = lang;
