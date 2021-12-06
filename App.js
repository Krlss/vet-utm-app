import React from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import ReportState from './src/context/Report/ReportState';
import AuthState from './src/context/auth/AuthState';
import StackMain from './src/navigation/StackMain';

export default function App() {
  return (
    <PaperProvider>
      <ReportState>
        <AuthState>
          <NavigationContainer>
            <StackMain />
            <StatusBar color='black' />
          </NavigationContainer>
        </AuthState>
      </ReportState>
    </PaperProvider>
  );
}
