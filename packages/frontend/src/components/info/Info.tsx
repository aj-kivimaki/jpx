import styles from './Info.module.css';
import { sectionIds } from 'shared/config/sectionIds';
import { images, description, sections } from 'shared/data/site.json';
import { members } from 'shared/data/band.json';

const Info = () => {
  return (
    <div id={sectionIds.info} className={styles.info}>
      <img src={images.band.src} alt={images.band.alt} />
      <div className={styles.textContainer}>
        <div className={styles.members}>
          <h2 className={styles.title}>{sections.info.title}</h2>
          {members.map((member) => (
            <p key={member.name}>
              <span className={styles.member}>{member.name}</span>,{' '}
              <span className={styles.instrument}>{member.role}</span>
            </p>
          ))}
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.descriptionText}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
