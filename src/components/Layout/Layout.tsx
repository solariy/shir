import * as React from 'react';
import styles from './Layout.module.scss';

import { Header } from '../Header/Header';

export interface ILayoutProps {
  children: string | JSX.Element | React.ReactChild | React.ReactFragment | React.ReactPortal | boolean | null | undefined
}

export function Layout (props: ILayoutProps) {
  return (
    <div className={styles.layout}>
        <Header />
        <main className={styles.container}>
          {
            props.children
          }
        </main>
        <footer className={styles.footer}>
          <div className={styles.team}>
            by skfx
          </div>
        </footer>
    </div>
  );
}