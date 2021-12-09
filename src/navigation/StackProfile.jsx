import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    EditUserProfile,
    PetProfileScreen,
    SettingsScreen
} from '../screens';

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
            <ProfileStack.Screen name='PetProfileScreen' component={PetProfileScreen}
                options={{ title: 'Perfil de mi mascota' }}
            />
        </ProfileStack.Navigator>
    );
}

export default StackProfile;