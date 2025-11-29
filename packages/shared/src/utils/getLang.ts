import { LanguageSchema, type Language } from '../schemas';
import type { i18n as I18nInstance } from 'i18next';

export const getLang = (i18nInstance: I18nInstance): Language =>
  LanguageSchema.parse(i18nInstance.language);

export type { Language };
