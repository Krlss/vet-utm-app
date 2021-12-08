import React, { useRef, useContext, useEffect, useState } from 'react';
import { View, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../context/auth/AuthContext';

import { ItemList } from '../components';
import UserProfile from './UserProfile';
import { getUserProfile } from '../core/utils-http';

const Settings = ({ navigation }) => {
    const bottomSheetRef = useRef('bottomSheetRef');

    const expand = () => { return bottomSheetRef.current.expand() }
    const { user_data } = useContext(AuthContext);
    const [dataStorage, setDataStorage] = useState();


    useEffect(async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@auth_vet.utm');
            setDataStorage(jsonValue != null ? JSON.parse(jsonValue) : null);

            if (jsonValue) {
                const valueSession = JSON.parse(jsonValue);
                const res = await getUserProfile(valueSession);
                if (res === 404 || 500) {
                    const removeStorage = await AsyncStorage.removeItem('@auth_vet.utm');
                }
            }


        } catch (error) {
            console.log(error);
        }
    }, [])



    return (
        <View style={{ flex: 1 }}>
            <UserProfile />
            <View style={Styles.expadBottom}>
                <TouchableOpacity onPress={expand} >
                    <Ionicons name='ios-caret-up-circle' size={35} color='#333' />
                </TouchableOpacity>
            </View>

            <BottomSheet
                initialSnapIndex={0}
                snapPoints={[1, 200]}
                ref={bottomSheetRef}
            >
                <BottomSheetScrollView >
                    <View>
                        {/* logged in... */}
                        {
                            dataStorage ? null :
                                <>
                                    <ItemList title='Iniciar sesión' onPress={() => { navigation.navigate('Login') }}>
                                        <Icon name='login' size={35} color='#333' />
                                    </ItemList>
                                    <ItemList title='Crear una cuenta' onPress={() => { navigation.navigate('Register') }}>
                                        <Icon name='login' size={35} color='#333' />
                                    </ItemList>
                                </>
                        }

                        <ItemList title='Hacer un reporte' onPress={() => createThreeButtonAlert(navigation)} >
                            <Ionicons name='paw' size={35} color='#333' />
                        </ItemList>
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    );
}


const createThreeButtonAlert = (navigation) =>
    Alert.alert(
        "¿Conoces al animal?",
        "Si conoces todos los datos del animal y del dueño tendrás que llenar un formulario.",
        [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "No",
                onPress: () => navigation.navigate('ReporterPetUnknown')
            },
            { text: "Si", onPress: () => navigation.navigate('StackReporte') }
        ]
    );



const Styles = StyleSheet.create({
    expadBottom: {
        position: 'absolute',
        bottom: 40,
        right: 35,
    }
});


export default Settings;

