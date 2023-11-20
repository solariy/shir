import styles from './QRLink.module.scss';
import backIcon from '../../static/icons/back.svg';
import QRCode from 'react-qr-code';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export interface IQRLinkProps {
  unitId: string | undefined;
}

export function QRLink(props: IQRLinkProps) {

  const [unitToken, setUnitToken] = useState('');

  const [cookies] = useCookies(['SKFX-TEACHER-AUTH']);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/teacher/pupils/${props.unitId}/connect`, {
      headers: {
        authorization: cookies['SKFX-TEACHER-AUTH']
      }
    })
    .then(res => res.json())
    .then((data: any) => {
      setUnitToken(data.token);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <div className={styles.qr}>
      <header className={styles.header}>
        <img
          src={backIcon}
          alt=''
          className={styles.header__back}
        />
        <div className={styles.header__name}>Код привязки</div>
      </header>
      <div className={styles.description}>
      Дайте ученику отсканировать данный QR код для привязки его аккаунта
      </div>
      <QRCode value={`https://t.me/skfxschool_bot?start=link-${unitToken} `} size={150} bgColor='#ffffff' fgColor='#000000' className={styles.code} />
    </div>
  );
}
