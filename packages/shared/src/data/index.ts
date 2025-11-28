// Import JSON files
import bandJson from './band.json';
import contactJson from './contact.json';
import gigsJson from './gigs.json';
import navJson from './nav.json';
import siteJson from './site.json';
import socialJson from './social.json';
import uiJson from './ui.json';

// Import types or Zod schemas
import type {
  Band,
  Contact,
  Gigs,
  Nav,
  Site,
  Social,
  UIConfig,
} from '../schemas';

// Validate JSON with Zod (if using schemas)
import {
  BandSchema,
  ContactSchema,
  GigsSchema,
  NavSchema,
  SiteSchema,
  SocialSchema,
  UISchema,
} from '../schemas';

const band: Band = BandSchema.parse(bandJson);
const contact: Contact = ContactSchema.parse(contactJson);
const gigs: Gigs = GigsSchema.parse(gigsJson);
const nav: Nav = NavSchema.parse(navJson);
const site: Site = SiteSchema.parse(siteJson);
const social: Social = SocialSchema.parse(socialJson);
const ui: UIConfig = UISchema.parse(uiJson);

export { band, contact, gigs, nav, site, social, ui };
