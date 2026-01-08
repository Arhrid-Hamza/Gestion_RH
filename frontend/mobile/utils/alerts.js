import { Alert } from 'react-native';

export const showConfirmationAlert = (title, message, onConfirm, onCancel) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        onPress: onCancel || (() => {}),
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: onConfirm,
        style: 'destructive',
      },
    ],
    { cancelable: false }
  );
};

export const showSuccessAlert = (title, message, onClose) => {
  Alert.alert(title, message, [{ text: 'OK', onPress: onClose || (() => {}) }]);
};

export const showErrorAlert = (title, message, onClose) => {
  Alert.alert(title, message, [{ text: 'OK', onPress: onClose || (() => {}) }]);
};
