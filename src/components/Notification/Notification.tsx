import styles from './Notification.module.scss';
import crossIcon from '../../static/icons/cross.svg';
import { useContext, useEffect } from 'react';
import { NotificationsContext } from '../../contexts/NotificationsContext';

export interface INotificationProps {
  id: number,
  text: string;
  time: number
}

export function Notification (props: INotificationProps) {

  const {notifications, setNotifications} = useContext(NotificationsContext);

  // useEffect(() => {
  //   setTimeout(() => {
  //     // notifications.splice(notifications.indexOf(notifications.find(notif => notif.id === props.id)), 1);
  //   }, props.time);
  // }, []);

  return (
    <div className={styles.notification}>
      <div className={styles.text}>
        {props.text}
      </div>
      <img src={crossIcon} alt="" className={styles.cross} />
    </div>
  );
}
