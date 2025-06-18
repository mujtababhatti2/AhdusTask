
import {
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { ApplicationStackParamList } from '../../@types/navigation';
import { Startup } from '../screens';
import { NotificationListener, requestUserPermission } from '../utils/Notification';
import AuthNavigator from './Auth';
import MainNavigator from './Main';
import NavigationService from './NavigationService';
import notifee, { EventType } from '@notifee/react-native';


const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const navigationRef = useNavigationContainerRef();

  notifee.onForegroundEvent(({ type, detail }:any) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
      console.log('User pressed an action with the id: ', detail.pressAction.id);
    }
  });

  notifee.onBackgroundEvent(async ({ type, detail }:any) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
      console.log('User pressed an action with the id: ', detail.pressAction.id);
    }
  });
  



  return (
    <NavigationContainer
      ref={ref => {
        NavigationService.setTopLevelNavigator(ref);
        // @ts-ignore
        navigationRef.current = ref;
      }}
    >
      <StatusBar translucent barStyle={ 'dark-content'} backgroundColor={"transparent"} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
