import {
  bandJson,
  BandSchema,
  imageIds,
  parseRequired,
  sectionIds,
  siteJson,
  SiteSchema,
} from '@jpx/shared';

import useLocalized from '../../hooks/useLocalized';

import styles from './Info.module.css';

const Info = () => {
  const localize = useLocalized();

  const { sections, images, description } = parseRequired(
    SiteSchema,
    siteJson,
    'Site'
  );
  const band = parseRequired(BandSchema, bandJson, 'Band');

  const infoSection = sections.find((s) => s.id === sectionIds.info);
  const title = infoSection ? localize(infoSection.title) : '';
  const bandImage = images.find((img) => img.id === imageIds.band);
  const imgAlt = bandImage?.alt ? localize(bandImage.alt) : '';

  const localizedBand = band.map(({ id, name, role }) => {
    const memberName = localize(name);
    const memberRole = localize(role);

    return { key: id, memberName, memberRole };
  });

  return (
    <section id={sectionIds.info} className={styles.info}>
      {bandImage?.src && (
        <img src={bandImage.src} alt={imgAlt} loading="lazy" />
      )}
      <div className={styles.textContainer}>
        <div className={styles.members}>
          <h2 className={styles.title}>{title}</h2>
          {localizedBand.map(({ key, memberName, memberRole }) => (
            <p key={key}>
              <span className={styles.member}>{memberName}</span>,{' '}
              <span className={styles.instrument}>{memberRole}</span>
            </p>
          ))}
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.descriptionText}>{localize(description)}</p>
        </div>
      </div>
    </section>
  );
};

export default Info;
