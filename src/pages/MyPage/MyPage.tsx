import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { ClassCard } from '../../components/ClassCard/ClassCard';
import { Classes } from '../../components/Classes/Classes';
import { Layout } from '../../components/Layout/Layout';
import styles from './MyPage.module.scss';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { QRLink } from '../../components/QRLink/QRLink';
import { AddUnit } from '../../components/AddUnit/AddUnit';
import { AddClass } from '../../components/AddClass/AddClass';

export function MyPage() {
  const [selectedOption, setSelectedOption] = useState<
    'classes' | 'works' | 'queue' | 'class' | 'addClass' | 'addUnit' | 'unitQR'
  >('classes');

  const [classID, setClassID] = useState('');
  const [unitID, setUnitID] = useState('');

  const [cookies] = useCookies(['SKFX-TEACHER-AUTH']);

  useEffect(() => {
    if (classID === 'back') {
      setSelectedOption('classes');
    } else if (classID !== '') {
      setSelectedOption('class');
    }
  }, [classID]);

  useEffect(() => {
    if (unitID === 'back') {
      setSelectedOption('class');
    } else if (unitID !== '') {
      setSelectedOption('unitQR');
    }
  }, [unitID]);

  useEffect(() => {
    if (selectedOption !== 'class') {
      setClassID('');
    }
    if (selectedOption !== 'unitQR') {
      setUnitID('');
    }
  }, [selectedOption]);

  return (
    <Layout theme='light'>
      <div className={styles.content}>
        {cookies['SKFX-TEACHER-AUTH'] ? (
          <>
            <section className={styles.menu}>
              <div className={styles.menu__options}>
                <div
                  className={
                    selectedOption === 'classes'
                      ? styles.menu__option + ' ' + styles.menu__option_selected
                      : styles.menu__option
                  }
                  onClick={() => setSelectedOption('classes')}
                >
                  Мои классы
                </div>
                <div
                  className={
                    selectedOption === 'works'
                      ? styles.menu__option + ' ' + styles.menu__option_selected
                      : styles.menu__option
                  }
                  onClick={() => setSelectedOption('works')}
                >
                  Мои работы
                </div>
                <div
                  className={
                    selectedOption === 'queue'
                      ? styles.menu__option + ' ' + styles.menu__option_selected
                      : styles.menu__option
                  }
                  onClick={() => setSelectedOption('queue')}
                >
                  Очередь на проверку
                </div>
              </div>
              <div className={styles.menu__buttons}>
                <div className={styles.button} onClick={() => setSelectedOption('addUnit')}>Добавить ученика</div>
                <div className={styles.button} onClick={() => setSelectedOption('addClass')}>Создать группу</div>
              </div>
            </section>
            <section className={styles.main}>
              {selectedOption === 'classes' ? (
                <Classes setClassID={setClassID} />
              ) : selectedOption === 'class' ? (
                <ClassCard
                  setUnitID={setUnitID}
                  setClassID={setClassID}
                  classID={classID}
                />
              ) : selectedOption === 'unitQR' ? (
                <QRLink unitID={unitID} setClassID={setClassID} />
              ) :
                selectedOption === 'addUnit'
                ?
                <AddUnit setClassID={setClassID} />
                :
                selectedOption === 'addClass'
                ?
                <AddClass setClassID={setClassID} />
                :
              (
                ''
              )}
            </section>
          </>
        ) : (
          <LoginForm />
        )}
      </div>
    </Layout>
  );
}
