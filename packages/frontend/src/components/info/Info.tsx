import { site, band, sectionIds, imageIds } from 'shared';
import useLocalized from '../../hooks/useLocalized';
import styles from './Info.module.css';

const Info = () => {
  const { sections, images, description } = site;

  const infoSection = sections.find((s) => s.id === sectionIds.info);
  const localize = useLocalized();
  const title = infoSection ? localize(infoSection.title) : '';

  const bandImage = images.find((img) => img.id === imageIds.band);
  const imgAlt = bandImage?.alt ? localize(bandImage.alt) : '';

  const localizedBand = band.map((member) => ({
    key: member.id,
    name: localize(member.name),
    role: localize(member.role),
  }));

  return (
    <div id={sectionIds.info} className={styles.info}>
      {bandImage?.src && (
        <img src={bandImage.src} alt={imgAlt} loading="lazy" />
      )}
      <div className={styles.textContainer}>
        <div className={styles.members}>
          <h2 className={styles.title}>{title}</h2>
          {localizedBand.map(({ key, name, role }) => {
            return (
              <p key={key}>
                <span className={styles.member}>{name}</span>,{' '}
                <span className={styles.instrument}>{role}</span>
              </p>
            );
          })}
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.descriptionText}>{localize(description)}</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
