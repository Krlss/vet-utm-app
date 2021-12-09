import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    PetProfileScreen,
    EditPetProfile,
} from '../screens';

import { theme } from '../core/theme';

const PetProfileStack = createNativeStackNavigator();

const StackPetProfile = ({ route }) => {
    return (
        <PetProfileStack.Navigator >
            <PetProfileStack.Screen name='PetProfileScreen' component={PetProfileScreen}
                initialParams={route.params}
                options={{ headerShown: false }}
            />
            <PetProfileStack.Screen name='EditPetProfile' component={EditPetProfile}
                options={{ title: 'Datos de tu mascota', headerStyle: { backgroundColor: theme.colors.All } }}
            />
        </PetProfileStack.Navigator>
    );
}

export default StackPetProfile;