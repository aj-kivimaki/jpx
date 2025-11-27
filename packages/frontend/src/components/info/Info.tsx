import React from 'react';
import styles from './Info.module.css';
import { sectionIds } from 'shared/config/sectionIds';
import { images, description, sections } from 'shared/data/site.json';
import { members } from 'shared/data/band.json';
import { useTranslation } from 'react-i18next';

interface BandMember {
  name: { [lang: string]: string };
  role: { [lang: string]: string };
}

interface Image {
  id: string;
  src: string;
  alt: { [lang: string]: string };
}

interface Section {
  id: string;
  title?: { [lang: string]: string };
}

const Info: React.FC = () => {
  const { i18n } = useTranslation();

  const infoSection = (sections as Section[]).find((s) => s.id === 'info');
  const title =
    infoSection?.title?.[i18n.language] ?? infoSection?.title?.['fi'] ?? '';

  const bandImage = (images as Image[]).find((img) => img.id === 'band');
  const imgSrc = bandImage?.src ?? '';
  const imgAlt =
    bandImage?.alt?.[i18n.language] ?? bandImage?.alt?.['fi'] ?? '';
  const lang = i18n.language;
  const descLang = lang as keyof typeof description;

  return (
    <div id={sectionIds.info} className={styles.info}>
      <img src={imgSrc} alt={imgAlt} />
      <div className={styles.textContainer}>
        <div className={styles.members}>
          <h2 className={styles.title}>{title}</h2>
          {members.map((member: BandMember) => (
            <p key={member.name['fi']}>
              <span className={styles.member}>
                {member.name[lang] ?? member.name['fi']}
              </span>
              ,{' '}
              <span className={styles.instrument}>
                {member.role[lang] ?? member.role['fi']}
              </span>
            </p>
          ))}
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.descriptionText}>
            {description[descLang] ?? description['fi']}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
