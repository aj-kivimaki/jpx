// Import JSON files
import bandJson from './band.json';
import contactJson from './contact.json';
import navJson from './nav.json';
import siteJson from './site.json';
import socialJson from './social.json';
import uiJson from './ui.json';

// Import types or Zod schemas
import type { Band, Contact, Nav, Site, Social, UIConfig } from '../types';

// Validate JSON with Zod (if using schemas)
import {
  BandSchema,
  ContactSchema,
  NavSchema,
  SiteSchema,
  SocialSchema,
  UISchema,
} from '../schemas';

const band: Band = BandSchema.parse(bandJson);
const contact: Contact = ContactSchema.parse(contactJson);
const nav: Nav = NavSchema.parse(navJson);
const site: Site = SiteSchema.parse(siteJson);
const social: Social = SocialSchema.parse(socialJson);
const ui: UIConfig = UISchema.parse(uiJson);

export { band, contact, nav, site, social, ui };
