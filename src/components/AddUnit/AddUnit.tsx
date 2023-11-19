import styles from './AddUnit.module.scss';
import backIcon from '../../static/icons/back.svg';
import { useCookies } from 'react-cookie';
import { useContext, useEffect, useState } from 'react';
import { NotificationsContext } from '../../contexts/NotificationsContext';
import { v4 } from 'uuid';

export interface IAddUnitProps {
  setClassID: Function;
}

export function AddUnit (props: IAddUnitProps) {

  const { notifications, setNotifications } = useContext(NotificationsContext);
  const [cookies] = useCookies(['SKFX-TEACHER-AUTH']);

  const [unitFName, setUnitFName] = useState('');
  const [unitLName, setUnitLName] = useState('');
  const [groupID, setGroupID] = useState('');

  const [groups, setGroups] = useState<any[]>([]);

  const createUnit = (event: any) => {
    event.preventDefault();
    if (unitFName !== '' && unitLName !== '' && groupID !== '') {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/teacher/pupils/new`, {
        method: 'POST',
        headers: {
          authorization: cookies['SKFX-TEACHER-AUTH'],
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: unitFName,
          lname: unitLName,
          group_id: groupID
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            setNotifications([
              ...notifications,
              {
                id: v4(),
                text: 'Вы успешно создали ученика',
                time: 5000,
              },
            ]);
          } else {
            setNotifications([
              ...notifications,
              {
                id: v4(),
                text: 'Не удалось создать ученика',
                time: 5000,
              },
            ]);
          }
        })
        .catch((err) => {
          console.log(err);

          setNotifications([
            ...notifications,
            {
              id: v4(),
              text: 'Неизвестная ошибка',
              time: 5000,
            },
          ]);
        });
    } else {
      setNotifications([
        ...notifications,
        {
          id: v4(),
          text: 'Введите все необходимые данные',
          time: 5000,
        },
      ]);
    }
  };

  useEffect(() => {
    fetch('http://id.skfx.io:5412/api/teacher/groups', {
      headers: {
        authorization: cookies['SKFX-TEACHER-AUTH'],
      },
    })
      .then((res) => res.json())
      .then((data: any) => {
        setGroups(data);
      })
      .catch(err => {
        console.log(err);

          setNotifications([
            ...notifications,
            {
              id: v4(),
              text: 'Неизвестная ошибка',
              time: 5000,
            },
          ]);
      })
  }, []);

  return (
    <div className={styles.add}>
      <header className={styles.header}>
        <img
          src={backIcon}
          alt=''
          className={styles.header__back}
          onClick={() => props.setClassID('back')}
        />
        <div className={styles.header__name}>Добавить ученика</div>
      </header>
      <form className={styles.form}>
        <input type="text" className={styles.input} placeholder="Введите имя ученика" value={unitFName} onChange={(event) => setUnitFName(event.target.value)}/>
        <input type="text" className={styles.input} placeholder="Введите фамилию ученика" value={unitLName} onChange={(event) => setUnitLName(event.target.value)} />
        <select className={styles.input + ' ' + styles.groupSelect} defaultValue={groups[0] ? groups[0].glid : ''} onChange={(event) => setGroupID(event.target.value)}>
          {
            groups.map(group => (
              <option key={group.glid} value={group.glid} className={styles.option}>{group.name}</option>
            ))
          }
        </select>
        <button className={styles.button} onClick={createUnit}>
          Создать ученика
        </button>
      </form>
    </div>
  );
}
