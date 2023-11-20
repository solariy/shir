import { useCookies } from 'react-cookie';
import { Groups } from '../../components/Groups/Groups';
import { Layout } from '../../components/Layout/Layout';
import styles from './MyPage.module.scss';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { GroupList } from '../../components/GroupList/GroupList';
import { QRLink } from '../../components/QRLink/QRLink';
import { AddUnit } from '../../components/AddUnit/AddUnit';
import { AddGroup } from '../../components/AddGroup/AddGroup';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export function MyPage() {
  const [cookies] = useCookies(['SKFX-TEACHER-AUTH']);

  const { category, id } = useParams();

  useEffect(() => {
    if (!!!category) {
      window.location.href = '/my/groups';
    }
  }, [category]);

  return (
    <Layout theme='light' mode='teacher'>
      <div className={styles.content}>
        {cookies['SKFX-TEACHER-AUTH'] ? (
          <>
            <section className={styles.menu}>
              <div className={styles.menu__options}>
                <a
                  href='/my/groups'
                  className={
                    category === 'groups'
                      ? styles.menu__option + ' ' + styles.menu__option_selected
                      : styles.menu__option
                  }
                >
                  Мои классы
                </a>
                <a
                  href='/my/works'
                  className={
                    category === 'works'
                      ? styles.menu__option + ' ' + styles.menu__option_selected
                      : styles.menu__option
                  }
                >
                  Мои работы
                </a>
                <a
                  href='/my/queue'
                  className={
                    category === 'queue'
                      ? styles.menu__option + ' ' + styles.menu__option_selected
                      : styles.menu__option
                  }
                >
                  Очередь на проверку
                </a>
              </div>
              <div className={styles.menu__buttons}>
                <a href="/my/addUnit" className={styles.button}>Добавить ученика</a>
                <a href="/my/addGroup" className={styles.button}>Создать группу</a>
              </div>
            </section>
            <section className={styles.main}>
              {category === 'groups' && !!!id ? (
                <Groups />
              ) : category === 'works' ? (
                ''
              ) : category === 'queue' ? (
                ''
              ) : category === 'qr' ? (
                <QRLink unitId={id} />
              ) : category === 'addUnit' ? (
                <AddUnit />
              ) : category === 'addGroup' ? (
                <AddGroup />
              ) : category === 'groups' && !!id ? (
                <GroupList groupId={id} />
              ) : (
                <Groups />
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
