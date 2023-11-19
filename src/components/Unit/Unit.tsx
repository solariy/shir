import styles from './Unit.module.scss';
import { useCookies } from 'react-cookie';
import { useContext } from 'react';
import { NotificationsContext } from '../../contexts/NotificationsContext';
import { v4 } from 'uuid';

export interface IUnitProps {
  name: string;
  unitID: string;
  setUnitID: Function;
}

export function Unit(props: IUnitProps) {

  const [cookies] = useCookies(['SKFX-TEACHER-AUTH']);
  const { notifications, setNotifications } = useContext(NotificationsContext);

  const deleteUnit = (unitID: string) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/teacher/pupils/${unitID}`, {
      method: 'DELETE',
      headers: {
        authorization: cookies['SKFX-TEACHER-AUTH'],
      }
    })
    .then(res => {
      if (res.status === 200) {
        setNotifications([
          ...notifications,
          {
            id: v4(),
            text: 'Ученик успешно удален',
            time: 5000,
          },
        ]);
      } else {
        setNotifications([
          ...notifications,
          {
            id: v4(),
            text: 'Ошибка удаления ученика',
            time: 5000,
          },
        ]);
      }
      window.location.href = '/my';
    })
    .catch(err => {
      console.log(err);

      setNotifications([
        ...notifications,
        {
          id: v4(),
          text: 'Ошибка удаления ученика',
          time: 5000,
        },
      ]);
    })
  };

  return (
    <div className={styles.unit}>
      <div className={styles.unit__name}>
        {
          props.name
        }
      </div>
      <div className={styles.unit__actions}>
        <div className={styles.action}>открыть рабочее пространство</div>
        <div className={styles.action} onClick={() => props.setUnitID(props.unitID)}>код привязки</div>
        <div className={styles.action} onClick={() => deleteUnit(props.unitID)}>удалить</div>
      </div>
    </div>
  );
}
