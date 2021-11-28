import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

const TabStack = createBottomTabNavigator();

import StackMenuMain from './StackMenuMain';

const MyTabs = () => {
    return (
        <TabStack.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
                let iconName;
                let size;
                if (route.name === 'StackHome') {
                    iconName = focused ? 'ios-home' : 'ios-home-outline';
                    size = focused ? 35 : 25;
                } /* else if (route.name === 'ReportPetScreen') {
                    iconName = focused ? 'ios-camera' : 'ios-camera-outline';
                    size = focused ? 35 : 25;
                } */ else if (route.name === 'PerfilTab') {
                    iconName = focused ? 'ios-menu' : 'ios-menu-outline';
                    size = focused ? 35 : 25;
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
            /* tabBarStyle: { backgroundColor: '#1e293b' }, */
            tabBarShowLabel: false,
        })}
        >
            <TabStack.Screen
                name="StackHome"
                component={StackHome}
                options={{
                    headerShown: false,
                }} />
            <TabStack.Screen
                name="PerfilTab"
                component={StackMenuMain}
                options={{
                    headerShown: false
                }} />
        </TabStack.Navigator >
    );
}

export default MyTabs;