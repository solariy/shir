import { useEffect, useState, useContext } from 'react';
import { Layout } from '../../components/Layout/Layout';
import styles from './HomePage.module.scss';
import QRCode from "react-qr-code";
import { useCookies } from 'react-cookie';
import { NotificationsContext } from '../../contexts/NotificationsContext';
import { v4 } from 'uuid';

export function HomePage() {

  const [authKey, setAuthKey] = useState('');

  const [cookies, setCookie] = useCookies(['SKFX-SCH-AUTH']);

  const {notifications, setNotifications} = useContext(NotificationsContext);

  // wss://id.skfx.io/sch

  useEffect(() => {
    let socket = new WebSocket("ws://id.skfx.io:5412/sch");

    socket.onopen = function(e) {
      // первый запрос на получение auth ключа
      socket.send(JSON.stringify({
        type: 1,
      }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 4) { //когда человек отсканировал qr и зашел (LRCResponse)
        // ставим куку
        setCookie('SKFX-SCH-AUTH', data.mainData);
        // редирект
        window.location.href = data.additionalData;
      } else if (data.type === 3) { // expired (LRCExpired)
        // отправляем новый запрос на токен
        socket.send(JSON.stringify({
          type: 1,
        }));
      } else if (data.type === 2) { //ставит изначальный ключ LRCChallenge
        // зашиваем ключ в qr
        setAuthKey(data.mainData);
      }
    };

    socket.onerror = function(error) {
      setNotifications([...notifications, {
        id: v4(),
        text: 'Произошла ошибка.',
        time: 5000,
      }]);
    };

  }, [setCookie]);

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
            {
              authKey === ''
              ?
              'Загрузка...'
              :
              <QRCode value={`http://sch.skfx.io/qr?challenge=${authKey}`} size={150} bgColor='#ffffff' fgColor='#000000' className={styles.qr__code} />
            }
          </section>
        </div>
      </Layout>
  );
}
