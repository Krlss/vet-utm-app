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
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#FF8C00' }
            }}
        >
            <ReporteStack.Screen name='ReportPetScreen' component={ReportPetScreen}
                options={{
                    headerTransparent: false,
                    title: 'Reporte'
                }}
            />
            <ReporteStack.Screen name='userReportDATA' component={userReportDATA}
                options={{ title: 'userReportDATA', title: 'Datos del usuario' }}
            />
            <ReporteStack.Screen name='petReportDATA' component={petReportDATA}
                options={{ title: 'petReportDATA', title: 'Datos del animal' }}
            />
        </ReporteStack.Navigator>
    );
}

export default StackReporte;