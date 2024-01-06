import { FC } from 'react';

import styles from './LinkButton.module.css';

type LinkButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const LinkButton: FC<LinkButtonProps> = ({ children, onClick }) => (
  <>
    <button type="button" className={styles.button} onClick={onClick}>
      {children}
    </button>
  </>
);

export default LinkButton;
