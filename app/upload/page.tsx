import { Group } from '@mantine/core';
import Link from 'next/link';
import { NextPage } from 'next';
import React from 'react';
import UploadForm from '@/app/components/UploadForm/UploadForm';
import styles from './Page.module.css';

const Page: NextPage = () => (
  <div className={styles.page}>
    <Group justify="flex-start" mt="sm">
      <Link href="/">
        <span>Home</span>
      </Link>
    </Group>
    <Group justify="center" mt="xl">
      <UploadForm />
    </Group>
  </div>
);

export default Page;
