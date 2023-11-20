import { useCookies } from 'react-cookie';
import styles from './Header.module.scss';
import graduationHat from '../../static/icons/graduation-hat.png';
import { Link } from 'react-router-dom';

export interface IHeaderProps {
  mode?: 'student' | 'teacher'
}

export function Header(props: IHeaderProps) {
  const [cookies] = useCookies(['logged']);

  return (
    <header className={styles.header}>
      <Link to={props.mode === 'teacher' ? '/my/groups' : '/'}>
        <img
          src={graduationHat}
          alt='Логотип'
          className={styles.header__logo}
        />
      </Link>
      {cookies.logged ? (
        <div className={styles.logged}>
          <span className={styles.logged__user}>Залогинен как Пользователь</span>
          <span className={styles.logged__exit}>Выйти</span>
        </div>
      ) : (
        ''
      )}
    </header>
  );
}
