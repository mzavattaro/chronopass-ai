import type { FC } from 'react';
import { Loader } from '@mantine/core';

import styles from './LoadingOverlay.module.css';

type LoadingOverlayProps = {
  isLoading: boolean;
};

const LoadingOverlay: FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Loader color="#3300FF" type="dots" />
      </div>
    </div>
  );
};

export default LoadingOverlay;
