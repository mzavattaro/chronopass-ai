'use client';

import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import type { FC } from 'react';

import styles from './CaptureModal.module.css';

type CaptureModalProps = {
  children: React.ReactNode;
};

const CaptureModal: FC<CaptureModalProps> = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Verify age"
        overlayProps={{
          backgroundOpacity: 0.5,
          blur: 10,
        }}
        classNames={{
          title: styles.title,
        }}
      >
        {children}
      </Modal>
      <Button onClick={open}>Open modal</Button>
    </>
  );
};

export default CaptureModal;
