import { Group } from '@mantine/core';
import Link from 'next/link';
import { NextPage } from 'next';
import React from 'react';
import VerifyAge from '@/app/components/VerifyAge/VerifyAge';
import styles from './Page.module.css';

const Page: NextPage = () => (
  <div className={styles.page}>
    <Group justify="flex-start" mt="sm">
      <Link href="/">
        <span>Home</span>
      </Link>
    </Group>

    <VerifyAge />
  </div>
);

export default Page;
