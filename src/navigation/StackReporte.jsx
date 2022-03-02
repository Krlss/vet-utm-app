import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../core/theme';
import {
    ReportPetScreen,
    UserReportDATA,
    PetReportDATA
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
            <ReporteStack.Screen name='UserReportDATA' component={UserReportDATA}
                options={{ title: 'Datos del dueño' }}
            />
            <ReporteStack.Screen name='PetReportDATA' component={PetReportDATA}
                options={{ title: 'Datos de la mascota' }}
            />
        </ReporteStack.Navigator>
    );
}

export default StackReporte;