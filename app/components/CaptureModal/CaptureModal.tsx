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
        withCloseButton={false}
        closeOnClickOutside={false}
        size={352}
        overlayProps={{
          backgroundOpacity: 0.5,
          blur: 10,
        }}
        classNames={{
          body: styles.body,
        }}
        pos="relative"
      >
        {children}
      </Modal>
      <Button onClick={open}>Age verification</Button>
    </>
  );
};

export default CaptureModal;
