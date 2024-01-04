import type { FC } from 'react';

import styles from './Caption.module.css';

type CaptionProps = {
  children: string;
};

const Caption: FC<CaptionProps> = ({ children }) => (
  <span className={styles.caption}>{children}</span>
);

export default Caption;
