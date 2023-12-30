import { Group } from '@mantine/core';
import { NextPage } from 'next';
import React from 'react';
import UploadForm from '@/app/components/UploadForm/UploadForm';

const Page: NextPage = () => {
  console.log('Upload page');

  return (
    <Group justify="center" mt="xl">
      <UploadForm />
    </Group>
  );
};

export default Page;
