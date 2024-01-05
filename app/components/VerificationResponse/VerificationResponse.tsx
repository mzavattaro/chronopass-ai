import type { FC } from 'react';
import { Title } from '@mantine/core';

import styles from './VerificationResponse.module.css';

type VerificationResponseProps = {
  children: React.ReactNode;
  className?: string;
};

const VerificationResponse: FC<VerificationResponseProps> = ({ children, className }) => (
  <>
    <Title className={`${className} ${styles.title}`} order={2}>
      {children}
    </Title>
  </>
);

export default VerificationResponse;
