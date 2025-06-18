import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import InternetConnectionStatus from './components/NetInfo/InternetConnectivity';
import ApplicationNavigator from './navigation/Application';
import { requestUserPermissionMessaging } from './firebase/helperFunctions';

LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

const App = () => {
  useEffect(() => {
    fcmPermission();
  }, []);

  const fcmPermission = async () => {
    await requestUserPermissionMessaging();
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <InternetConnectionStatus />
      <FlashMessage />
      <ApplicationNavigator />
    </SafeAreaProvider>
  );
};

export default App;