import { useTranslation } from 'react-i18next';
import { sectionIds } from 'shared/schemas';
import { site, band, getLang } from 'shared';
import styles from './Info.module.css';

const Info = () => {
  const { i18n } = useTranslation();

  const lang = getLang(i18n);
  const { sections, images, description } = site;

  const infoSection = sections.find((s) => s.id === 'info');
  const title = infoSection?.title?.[lang] ?? infoSection?.title?.fi ?? '';

  const bandImage = images.find((img) => img.id === 'band');
  const imgSrc = bandImage?.src ?? '';
  const imgAlt = bandImage?.alt?.[lang] ?? bandImage?.alt?.fi ?? '';

  return (
    <div id={sectionIds.info} className={styles.info}>
      <img src={imgSrc} alt={imgAlt} />
      <div className={styles.textContainer}>
        <div className={styles.members}>
          <h2 className={styles.title}>{title}</h2>
          {band.map((member) => (
            <p key={member.name.fi}>
              <span className={styles.member}>
                {member.name[lang] ?? member.name.fi}
              </span>
              ,{' '}
              <span className={styles.instrument}>
                {member.role[lang] ?? member.role.fi}
              </span>
            </p>
          ))}
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.descriptionText}>
            {description[lang] ?? description.fi}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
