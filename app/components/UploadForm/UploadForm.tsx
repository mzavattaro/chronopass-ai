'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent, FC } from 'react';
import { toast } from 'sonner';
import openAI from '@/app/libs/openai';
import { fileToBase64 } from '@/app/utils/fileToBase64';

import styles from './UploadForm.module.css';

type UploadFormProps = {
  age: string;
  setResponse: (response: string | null) => void;
};

const UploadForm: FC<UploadFormProps> = ({ age, setResponse }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files![0];

    if (selected && selected.size > 500 * 1024) {
      setFile(null);
      setFileError('File size should be 500KB or less');
    } else {
      setFile(selected);
      setFileError('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (file) {
      try {
        const base64Encoded = await fileToBase64(file);
        const response = await openAI(base64Encoded as string, age);

        setResponse(response.choices[0].message.content);
        console.log('response: ', response.choices[0].message);

        toast('File uploaded successfully!', {
          style: {
            background: 'green',
            color: 'white',
          },
        });
      } catch (error) {
        console.error('Error converting image to blob: ', error);

        toast('File upload error! Please try again later.', {
          style: {
            background: 'red',
            color: 'white',
          },
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Photo upload</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="file" name="photo" accept=".jpeg, .jpg" onChange={handleFileChange} />
        {fileError && <div className={styles.error}>{fileError}</div>}

        <button className={styles.button} type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
