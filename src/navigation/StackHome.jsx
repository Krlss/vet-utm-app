import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, LostAnimalScreen, SettingsScreen } from '../screens';

import StackMenuMain from './StackMenuMain';


const HomeStack = createNativeStackNavigator();

const StackHome = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />

            <HomeStack.Screen name="StackMenuMain" component={StackMenuMain}
                options={{ headerShown: false }} />

            <HomeStack.Screen name="LostAnimalScreen" component={LostAnimalScreen}
                options={{ headerTransparent: true, headerShadowVisible: false, title: '' }}
            />
        </HomeStack.Navigator>
    );
}

export default StackHome;