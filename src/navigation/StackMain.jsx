import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StackHome from './StackHome';
import StackMenuMain from './StackMenuMain';



const Stack = createNativeStackNavigator();

const StackMain = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='StackHome' /* screenOptions={{ headerShown: false }}  */>
            <Stack.Screen name="StackHome" component={StackHome}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="StackMenuMain" component={StackMenuMain} />
        </Stack.Navigator>
    );
}

export default StackMain;