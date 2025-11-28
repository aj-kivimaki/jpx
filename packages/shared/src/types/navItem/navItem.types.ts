import type { LocalizedText } from '../i18n';

export interface NavItem {
  id: string;
  label: LocalizedText | null;
}
