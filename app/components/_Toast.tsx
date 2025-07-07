import Toast from 'react-native-toast-message';

export const ToastError = (msg1: string, msg2?: string) => {
  return Toast.show({
    type: 'error',
    text1: msg1,
    text2: msg2 && msg2,
    visibilityTime: 3000,
  });
};

export const ToastInfo = (msg1: string, msg2?: string) => {
  return Toast.show({
    type: 'info',
    text1: msg1,
    text2: msg2 && msg2,
    visibilityTime: 3000,
  });
};

export const ToastSuccess = (msg1: string, msg2?: string) => {
  return Toast.show({
    type: 'success',
    text1: msg1,
    text2: msg2 && msg2,
    visibilityTime: 3000,
  });
};
