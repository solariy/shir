import * as React from 'react';
import styles from './ScanPage.module.scss';
import exampleImage from '../../static/images/example.png';

export function ScanPage () {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        Отсканируйте QR-код для входа
      </header>
      <section className={styles.help}>
        <img src={exampleImage} alt="Пример QR-кода" className={styles.example} />
        <ul className={styles.steps}>
            <li className={styles.steps__item}>1. Зайдите на <a href="https://google.com">https://skfx.io/school</a></li>
            <li className={styles.steps__item}>2. Отсканируйте QR-код по кнопке</li>
        </ul>
      </section>
      <div className={styles.button_scan}>Сканировать</div>
    </div>
  );
}
