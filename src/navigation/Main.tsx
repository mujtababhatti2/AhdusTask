
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Image, Platform } from 'react-native';
import { NotificationListener } from '../utils/Notification';
import { Chat, Inbox } from '../screens/app';

const Stack = createStackNavigator();

// @refresh reset
const MainNavigator = () => {
  const [userRole, setUserRole] = useState<string>('requester');

  useEffect(() => {
    if (Platform.OS === 'android') {
      NotificationListener();
    }
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={'Inbox'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Inbox" component={Inbox} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
