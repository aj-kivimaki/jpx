import {
  site,
  band,
  sectionIds,
  imageIds,
  makeError,
  logger,
} from '@jpx/shared';
import useLocalized from '../../hooks/useLocalized';
import styles from './Info.module.css';

const Info = () => {
  const { sections, images, description } = site;
  const localize = useLocalized();

  const infoSection = sections.find((s) => s.id === sectionIds.info);
  const title = infoSection ? localize(infoSection.title) : '';

  if (!infoSection || !title) {
    const err = makeError('Info section or title missing', 'NOT_FOUND');
    err.__logged = true;
    logger.warn(err);
  }

  const bandImage = images.find((img) => img.id === imageIds.band);
  const imgAlt = bandImage?.alt ? localize(bandImage.alt) : '';

  if (!bandImage?.src) {
    const err = makeError('Band image missing', 'NOT_FOUND');
    err.__logged = true;
    logger.warn(err);
  }

  const localizedBand = band.map((member) => {
    const name = localize(member.name);
    const role = localize(member.role);

    if (!name || !role) {
      const err = makeError('Band member name or role missing', 'UNKNOWN');
      err.__logged = true;
      logger.warn(err, { memberId: member.id });
    }

    return {
      key: member.id,
      name,
      role,
    };
  });

  return (
    <section id={sectionIds.info} className={styles.info}>
      {bandImage?.src && (
        <img src={bandImage.src} alt={imgAlt} loading="lazy" />
      )}
      <div className={styles.textContainer}>
        <div className={styles.members}>
          <h2 className={styles.title}>{title}</h2>
          {localizedBand.map(({ key, name, role }) => (
            <p key={key}>
              <span className={styles.member}>{name}</span>,{' '}
              <span className={styles.instrument}>{role}</span>
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
