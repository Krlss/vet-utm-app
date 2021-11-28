import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from './Login';
import Register from './Register';

const Tab = createMaterialTopTabNavigator();

function TabsAuth() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Login'>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Register" component={Register} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabsAuth;