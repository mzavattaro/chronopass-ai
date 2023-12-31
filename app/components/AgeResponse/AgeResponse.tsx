import { Group } from '@mantine/core';
import { FC } from 'react';

import styles from './AgeResponse.module.css';

type AgeResponseProps = {
  response: string | null;
  age: string;
};

const AgeResponse: FC<AgeResponseProps> = ({ response, age }) => (
  <Group justify="center" mt="md">
    <div
      className={styles.alert}
      style={{
        backgroundColor: response === 'yes' ? 'green' : 'rgba(0, 128, 0, 0.35)',
      }}
    >
      +{age}
    </div>
    <div
      className={styles.alert}
      style={{
        backgroundColor: response === 'no' ? 'red' : 'rgba(255, 0, 0, 0.35)',
      }}
    >
      under {age}
    </div>
    <div
      className={styles.alert}
      style={{
        backgroundColor: response === 'skip' ? 'black' : 'rgba(0, 0, 0, 0.35)',
      }}
    >
      skip
    </div>
  </Group>
);

export default AgeResponse;
