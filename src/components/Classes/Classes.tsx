import styles from './Classes.module.scss';
import { useEffect, useState } from 'react';
import { Class } from '../Class/Class';
import { useCookies } from 'react-cookie';

export interface IClassesProps {
  setClassID: Function;
}

export function Classes(props: IClassesProps) {
  const [classes, setClasses] = useState<any[]>([]);

  const [cookies] = useCookies(['SKFX-TEACHER-AUTH']);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/teacher/groups`, {
      headers: {
        authorization: cookies['SKFX-TEACHER-AUTH'],
      },
    })
      .then((res) => res.json())
      .then((data: any) => {
        setClasses(data);
        // for (let i = 0; i < data.length; i++) {
        //   // fetch(
        //   //   `http://id.skfx.io:5412/api/teacher/groups/${data[i].glid}/participants`,
        //   //   {
        //   //     headers: {
        //   //       authorization: cookies['SKFX-TEACHER-AUTH'],
        //   //     },
        //   //   }
        //   // )
        //   //   .then((res) => res.json())
        //   //   .then((units) => {
        //   //     if (!!units) {
        //   //       data[i].units = units;
        //   //       setClasses(data);
        //   //       setStatus('success');
        //   //     }
        //   //   })
        //   //   .catch((err) => {
        //   //     console.log(err);
        //   //   });
        // }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className={styles.classes}>
      <header className={styles.classes__header}>
        <div className={styles.header__column}>Название</div>
        <div className={styles.header__column}>Кол-во учеников</div>
      </header>
      <section className={styles.classes__list}>
        {classes.map((group) => (
          <Class
            key={group.glid}
            classID={group.glid}
            setClassID={props.setClassID}
            name={group.name}
            units={group.units ? group.units.length : 0}
          />
        ))}
      </section>
    </section>
  );
}
