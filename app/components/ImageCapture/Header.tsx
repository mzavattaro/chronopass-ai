import type { FC } from 'react';
import Sparks from '@/app/icons/Sparks';

import styles from './Header.module.css';

const Header: FC = () => (
  <div className={styles.container}>
    <span className={styles.wrapper}>
      <span>Age verification</span>
      <div className={styles.icon}>
        <Sparks />
      </div>
    </span>
  </div>
);

export default Header;
