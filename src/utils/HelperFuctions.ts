import { Alert, PermissionsAndroid, Platform, StatusBar } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { MMKV } from 'react-native-mmkv';
interface Coordinates {
  latitude: number;
  longitude: number;
  heading?: number | null;
}
const storage = new MMKV()
const showError = (message: any, duration?: number): void => {
  showMessage({
    message: message || 'Something went wrong',
    type: 'danger',
    icon: 'danger',
    titleStyle: { fontFamily: 'Poppins-SemiBold' },
    style: { paddingTop: StatusBar.currentHeight },
    autoHide: true,
    duration: duration || 1850,
  });
};

const showSuccess = (message: string, duration?: number): void => {
  showMessage({
    message,
    type: 'success',
    icon: 'success',
    titleStyle: { fontFamily: 'Poppins-SemiBold' },
    style: { paddingTop: StatusBar.currentHeight },
    autoHide: true,
    duration: duration || 1850,
  });
};

const showCustomAlert = (
  title: string,
  message: string,
  okAction?: () => void,
  cancelAction?: () => void,
  okText?: string | 'OK',
): void => {
  const buttons = [{ text: okText || 'OK', onPress: okAction }];

  if (cancelAction) {
    buttons.push({ text: 'Cancel', onPress: cancelAction });
  }

  Alert.alert(title, message, buttons);
};

export { showCustomAlert, showError, showSuccess, storage as MMKVStorage };
