import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    ReportPetScreen,
    userReportDATA,
    petReportDATA
} from '../screens';

const ReporteStack = createNativeStackNavigator();

const StackReporte = () => {
    return (
        <ReporteStack.Navigator
            screenOptions={{
                headerTintColor: '#333',
                headerStyle: { backgroundColor: '#FFDD00' }
            }}
        >
            <ReporteStack.Screen name='ReportPetScreen' component={ReportPetScreen}
                options={{
                    headerTransparent: false,
                    title: 'Reporte'
                }}
            />
            <ReporteStack.Screen name='userReportDATA' component={userReportDATA}
                options={{ title: 'Datos del usuario' }}
            />
            <ReporteStack.Screen name='petReportDATA' component={petReportDATA}
                options={{ title: 'Datos del animal' }}
            />
        </ReporteStack.Navigator>
    );
}

export default StackReporte;