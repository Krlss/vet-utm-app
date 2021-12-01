import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

import {
    UserProfileScreen,
    PetProfileScreen,
    SettingsScreen,
    Login,
    Register,
    ReportPetScreen,
    ReporterPetUnknown
} from '../screens';

import StackReporte from './StackReporte';
import { theme } from '../core/theme';
const MenuLastTabStack = createNativeStackNavigator();

const StackMenuMain = () => {
    return (
        <MenuLastTabStack.Navigator
        /* screenOptions={{
            headerTransparent: true,
            headerShadowVisible: false,
            title: ''
        }} */
        >
            <MenuLastTabStack.Screen name='SettingsScreen' component={SettingsScreen}
                options={{ title: 'Configuraciones', headerStyle: { backgroundColor: theme.colors.All } }}
            />
            <MenuLastTabStack.Screen name='UserProfileScreen' component={UserProfileScreen}
                options={{ title: 'Mi perfil' }}
            />
            <MenuLastTabStack.Screen name='PetProfileScreen' component={PetProfileScreen}
                options={{ title: 'Perfil de mi mascota' }}
            />
            <MenuLastTabStack.Screen name='Login' component={Login}
                options={{ headerTransparent: true, headerShadowVisible: false, title: '' }}
            />
            <MenuLastTabStack.Screen name='Register' component={Register}
                options={{ headerTransparent: true, headerShadowVisible: false, title: '' }}
            />
            <MenuLastTabStack.Screen name='ReporterPetUnknown' component={ReporterPetUnknown}
                options={{ headerShown: false }}
            />
            <MenuLastTabStack.Screen name='StackReporte' component={StackReporte}
                options={{ headerShown: false }}
            />
        </MenuLastTabStack.Navigator>
    );
}

export default StackMenuMain;