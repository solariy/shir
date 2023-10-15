import * as React from 'react';
import styles from './HomePage.module.scss';
import qrCode from '../../static/images/qr.png';
import QRCode from "react-qr-code";
import { v4 } from 'uuid';

export function HomePage () {
  return (
    <div className={styles.page}>
      <div className={styles.landing}>
        <header className={styles.header}>
          <h1 className={styles.header__h1}>Облачная среда разработки для школьников.</h1>
          <h4 className={styles.header__description}>Безопасно программируйте и в школе и дома.</h4>
        </header>
        {/* <img src={qrCode} alt="QR-код" className={styles.qr} /> */}
        <QRCode value={v4()} size={256} bgColor='rgba(0, 0, 0, 0)' />
      </div>
    </div>
  );
}
