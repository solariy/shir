import styles from './Class.module.scss';

export interface IClassProps {
  classID: string;
  setClassID: Function;
  name: string;
  units: number;
}

export function Class(props: IClassProps) {

  return (
    <div className={styles.class}>
      <div className={styles.class__name}>{props.name}</div>
      <div className={styles.class__units}>{props.units}</div>
      <div className={styles.class__more} onClick={() => props.setClassID(props.classID)}>Подробнее</div>
    </div>
  );
}
