import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Login, Signup, Startup } from '../screens';

const Stack = createStackNavigator();

// @refresh reset
const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Startup'  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Startup" component={Startup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
