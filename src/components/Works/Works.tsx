import styles from './Works.module.scss';
import { Work } from '../Work/Work';

export function Works() {

  const works = [
    {
      name: 'Антон1',
    },
    {
      name: 'Антон2',
    },
    {
      name: 'Антон3',
    },
  ];

  return (
    <div className={styles.works}>
      <header className={styles.works__header}>
          <div className={styles.header__column}>Имя</div>
          <div className={styles.header__column}>Действия</div>
      </header>
      <div className={styles.works__list}>
        {
          works.map(work => (
            <Work name={work.name} />
          ))
        }
      </div>
    </div>
  );
}
