import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../core/theme';
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
                headerStyle: { backgroundColor: theme.colors.All }
            }}
        >
            <ReporteStack.Screen name='ReportPetScreen' component={ReportPetScreen}
                options={{
                    headerTransparent: false,
                    title: 'Reporte'
                }}
            />
            <ReporteStack.Screen name='userReportDATA' component={userReportDATA}
                options={{ title: 'Datos del dueño' }}
            />
            <ReporteStack.Screen name='petReportDATA' component={petReportDATA}
                options={{ title: 'Datos de la mascota' }}
            />
        </ReporteStack.Navigator>
    );
}

export default StackReporte;