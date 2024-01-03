import { FC } from 'react';
import { toast } from 'sonner';

type ToastProps = {
  message: string;
  type: 'success' | 'error';
};

const Toast: FC<ToastProps> = ({ message, type }) => {
  const toastOptions = {
    style: {
      background: type === 'success' ? 'green' : 'red',
      color: 'white',
    },
  };

  return toast(message, toastOptions);
};

export default Toast;
