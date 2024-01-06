import type { FC } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Title } from '@mantine/core';

import styles from './ManualVerification.module.css';
import LinkButton from '../LinkButton/LinkButton';

type ManualVerificationProps = {
  showManualVerification: boolean;
  setShowManualVerification: React.Dispatch<React.SetStateAction<boolean>>;
};

const ManualVerification: FC<ManualVerificationProps> = ({
  showManualVerification,
  setShowManualVerification,
}) => {
  const form = useForm({
    initialValues: {
      year: '',
    },
    validate: {
      year: (value) => (/^(19|20)\d{2}$/.test(value) ? null : 'Invalid year'),
    },
  });

  return (
    <div className={styles.container}>
      <Title className={styles.title} order={2}>
        Manual Verification
      </Title>

      <form className={styles.form} onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="Enter your birth year:"
          placeholder="Year"
          maxLength={4}
          {...form.getInputProps('year')}
          classNames={{
            wrapper: styles.wrapper,
            input: styles.input,
          }}
        />
      </form>
      <LinkButton onClick={() => setShowManualVerification(!showManualVerification)}>
        back to authorization
      </LinkButton>
    </div>
  );
};

export default ManualVerification;
