import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import ProfileStack from './StackProfile';
const MenuLastTabStack = createNativeStackNavigator();

const StackMenuMain = () => {
    return (
        <MenuLastTabStack.Navigator >
            <MenuLastTabStack.Screen name='ProfileStack' component={ProfileStack}
                options={{ headerShown: false }}
            />
            {/* <MenuLastTabStack.Screen name='UserProfileScreen' component={UserProfileScreen}
                options={{ title: 'Mi perfil' }}
            />
            <MenuLastTabStack.Screen name='PetProfileScreen' component={PetProfileScreen}
                options={{ title: 'Perfil de mi mascota' }}
            /> */}
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