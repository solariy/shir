import styles from './ClassCard.module.scss';
import backIcon from '../../static/icons/back.svg';
import { Unit } from '../Unit/Unit';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export interface IClassCardProps {
  classID: string;
  setClassID: Function;
  setUnitID: Function;
}

export function ClassCard(props: IClassCardProps) {
  const [units, setUnits] = useState<any[]>([]);
  const [classInfo, setClassInfo] = useState<any>({});

  const [cookies] = useCookies(['SKFX-TEACHER-AUTH']);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/teacher/groups`, {
      headers: {
        authorization: cookies['SKFX-TEACHER-AUTH'],
      },
    })
      .then((res) => res.json())
      .then((data: any) => {
        setClassInfo(data.find((group: any) => group.glid === props.classID));
        fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/teacher/groups/${props.classID}/participants`,
          {
            headers: {
              authorization: cookies['SKFX-TEACHER-AUTH'],
            },
          }
        )
          .then((res) => res.json())
          .then((units) => {
            if (!!units) {
              setUnits(units);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <img
          src={backIcon}
          alt=''
          className={styles.header__back}
          onClick={() => props.setClassID('back')}
        />
        <div className={styles.header__name}>{classInfo.name || ''}</div>
      </header>
      <div className={styles.units}>
        <header className={styles.units__header}>
          <div className={styles.header__column}>Имя</div>
          <div className={styles.header__column}>Действия</div>
        </header>
        <section className={styles.units__list}>
          {units.map((unit) => (
            <Unit
              key={unit.glid}
              unitID={unit.glid}
              name={unit.fname + ' ' + unit.lname}
              setUnitID={props.setUnitID}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
