import { site, band, sectionIds } from 'shared';
import useLocalized from '../../hooks/useLocalized';
import styles from './Info.module.css';

const Info = () => {
  // useTranslation is not needed here because `getLocalized` uses it internally
  const { sections, images, description } = site;

  const infoSection = sections.find((s) => s.id === 'info');
  const localize = useLocalized();
  const title = localize(infoSection?.title);

  const bandImage = images.find((img) => img.id === 'band');
  const imgSrc = bandImage?.src ?? '';
  const imgAlt = localize(bandImage?.alt);

  return (
    <div id={sectionIds.info} className={styles.info}>
      <img src={imgSrc} alt={imgAlt} loading="lazy" />
      <div className={styles.textContainer}>
        <div className={styles.members}>
          <h2 className={styles.title}>{title}</h2>
          {band.map((member) => (
            <p key={localize(member.name)}>
              <span className={styles.member}>{localize(member.name)}</span>,{' '}
              <span className={styles.instrument}>{localize(member.role)}</span>
            </p>
          ))}
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.descriptionText}>{localize(description)}</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
