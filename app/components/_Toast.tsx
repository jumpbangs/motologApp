import Toast, { ToastPosition } from 'react-native-toast-message';

type ToastArgs = {
  msg1: string;
  msg2?: string;
  pos?: ToastPosition;
};

export const ToastError = ({ msg1, msg2, pos }: ToastArgs) => {
  const position = pos ?? 'top';
  return Toast.show({
    type: 'error',
    text1: msg1,
    text2: msg2 && msg2,
    visibilityTime: 3000,
    position: position,
  });
};

export const ToastInfo = ({ msg1, msg2, pos }: ToastArgs) => {
  const position = pos ?? 'top';
  return Toast.show({
    type: 'info',
    text1: msg1,
    text2: msg2 && msg2,
    visibilityTime: 3000,
    position: position,
  });
};

export const ToastSuccess = ({ msg1, msg2, pos }: ToastArgs) => {
  const position = pos ?? 'top';

  return Toast.show({
    type: 'success',
    text1: msg1,
    text2: msg2,
    visibilityTime: 3000,
    position,
  });
};
