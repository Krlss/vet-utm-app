import React, { useRef, useContext, useEffect, useState } from 'react';
import { View, Alert, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../context/auth/AuthContext';

import { ItemList } from '../components';
import UserProfile from './UserProfile';
import { getUserProfile } from '../core/utils-http';


const { width, height } = Dimensions.get('screen');

const Settings = ({ navigation }) => {
    const bottomSheetRef = useRef('bottomSheetRef');

    const expand = () => { return bottomSheetRef.current.expand() }
    const { saveUSER } = useContext(AuthContext);
    const [dataStorage, setDataStorage] = useState();

    const logout = async () => {
        try {
            const removeStorage = await AsyncStorage.removeItem('@auth_vet.utm');
            navigation.pop();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@auth_vet.utm');
            setDataStorage(jsonValue != null ? JSON.parse(jsonValue) : null);
            if (jsonValue !== null) {
                const valueSession = JSON.parse(jsonValue);
                const res = await getUserProfile(valueSession);
                if (res === 404 || res === 500) {
                    const removeStorage = await AsyncStorage.removeItem('@auth_vet.utm');
                    navigation.pop();
                } else {

                    const { address, email, email_verified_at,
                        id_canton, last_name1, last_name2,
                        name, phone, profile_photo_url, api_token,
                        profile_photo_path, user_id, canton, province, pet } = res.data;

                    /* Save in context state */
                    saveUSER({
                        address, email, email_verified_at,
                        id_canton, last_name1, last_name2,
                        name, phone, profile_photo_url,
                        profile_photo_path, user_id,
                        canton, province, pet, api_token
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, [])



    return (
        <View style={{ flex: 1 }}>
            {
                dataStorage ?
                    <UserProfile navigation={navigation} /> :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Text style={{ fontSize: 30, textTransform: 'uppercase', textAlign: 'center', fontWeight: '700' }}>
                            Inicia sesión para ver tu perfil
                        </Text>
                    </View>
            }

            <View style={Styles.backButton}>
                <TouchableOpacity onPress={() => { navigation.pop() }} >
                    <Ionicons name='ios-arrow-back-sharp' size={25} color='#333' />
                </TouchableOpacity>
            </View>

            <View style={Styles.expadBottom}>
                <TouchableOpacity onPress={expand} >
                    <Ionicons name='menu' size={25} color='#333' />
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
                        {
                            dataStorage ?
                                <ItemList title='Cerrar sesión' onPress={logout} >
                                    <Icon name='logout' size={35} color='#333' />
                                </ItemList> : null
                        }
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
        top: height * .02,
        right: width * .04,
    },
    backButton: {
        position: 'absolute',
        top: height * .02,
        left: width * .04,
    }
});


export default Settings;

