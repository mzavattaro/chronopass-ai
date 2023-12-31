'use client';

import { Group, Input } from '@mantine/core';
import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import UploadForm from '../UploadForm/UploadForm';
import AgeResponse from '../AgeResponse/AgeResponse';

import styles from './VerifyAge.module.css';

const VerifyAge: FC = () => {
  const [age, setAge] = useState<string>('18');
  const [response, setResponse] = useState<string | null>('');

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAge(event.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <Group justify="center" mt="xl">
        <UploadForm age={age} setResponse={setResponse} />
      </Group>

      <div className={styles.box}>
        <Input.Wrapper label="Select age" description="Select the baseline age gate">
          <Input placeholder="18" value={age} onChange={handleChange} />
        </Input.Wrapper>
      </div>

      <AgeResponse response={response} age={age} />
    </div>
  );
};

export default VerifyAge;
