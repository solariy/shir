import styles from './Notifications.module.scss';
import { Notification } from '../Notification/Notification';
import { useContext, useEffect } from 'react';
import { NotificationsContext } from '../../contexts/NotificationsContext';
import { v4 } from 'uuid';

export function Notifications() {

  const { notifications, setNotifications } = useContext(NotificationsContext);

  useEffect(() => {
    setNotifications([...notifications, {
      id: v4(),
      text: 'random text',
      time: 10000,
    }]);
  }, []);

  return (
    <div className={styles.notifications}>
      {
        notifications.map(notification => (
          <Notification key={notification.id} id={notification.id} text={notification.text} time={notification.time} />
        ))
      }
    </div>
  );
}
