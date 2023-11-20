import styles from './Group.module.scss';

export interface IGroupProps {
  groupId: string;
  name: string;
  units: number;
}

export function Group(props: IGroupProps) {

  return (
    <div className={styles.group}>
      <div className={styles.group__name}>{props.name}</div>
      <div className={styles.group__units}>{props.units}</div>
      <a href={`/my/group/${props.groupId}`} className={styles.group__more}>Подробнее</a>
    </div>
  );
}
