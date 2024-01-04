import type { FC } from 'react';
import { Title } from '@mantine/core';

import styles from './AgeVerificationSuccess.module.css';

type AgeVerificationSuccessProps = {
  children: React.ReactNode;
  className?: string;
};

const AgeVerificationSuccess: FC<AgeVerificationSuccessProps> = ({ children, className }) => (
  <>
    <Title className={`${className} ${styles.title}`} order={2}>
      {children}
    </Title>
  </>
);

export default AgeVerificationSuccess;
