import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    EditUserProfile,
    ChangePassword,
    SettingsScreen
} from '../screens';

import StackPetProfile from './StackProfilePet';

import { theme } from '../core/theme';

const ProfileStack = createNativeStackNavigator();

const StackProfile = () => {
    return (
        <ProfileStack.Navigator >
            <ProfileStack.Screen name='SettingsScreen' component={SettingsScreen}
                options={{ headerShown: false }}
            />
            <ProfileStack.Screen name='EditUserProfile' component={EditUserProfile}
                options={{ title: 'Editar datos', headerStyle: { backgroundColor: theme.colors.All } }}
            />
            <ProfileStack.Screen name='ChangePassword' component={ChangePassword}
                options={{ title: 'Cambiar contraseña', headerStyle: { backgroundColor: theme.colors.All } }}
            />
            <ProfileStack.Screen name='StackPetProfile' component={StackPetProfile}
                options={{ headerShown: false }}
            />
        </ProfileStack.Navigator>
    );
}

export default StackProfile;