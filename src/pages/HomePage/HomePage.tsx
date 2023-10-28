import { Layout } from '../../components/Layout/Layout';
import styles from './HomePage.module.scss';
import QRCode from "react-qr-code";

export function HomePage() {
  return (
      <Layout>
        <div className={styles.content}>
          <section className={styles.slogan}>
            <h1 className={styles.slogan__header}>Облачная среда разработки</h1>
            <h4 className={styles.slogan__description}>Удобная система для коротких сессий разработки, ориентированная для школ и других учебных заведений</h4>
            <section className={styles.slogan__buttons}>
              <button className={styles.button}>Узнать больше</button>
              <button className={styles.button}>Вход для сотрудников</button>
            </section>
          </section>
          <section className={styles.qr}>
            <div className={styles.qr__login}>Вход для учеников</div>
            <QRCode value='https://sch.skfx.io/login?clid=abcdef' size={150} bgColor='#ffffff' fgColor='#000000' className={styles.qr__code} />
          </section>
        </div>
      </Layout>
  );
}
