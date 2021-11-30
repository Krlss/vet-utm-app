import React, { useRef } from 'react';
import { View, Text, Alert, Dimensions, Button, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('screen');

import { ImageIcon, HeaderHome, ItemList } from '../components';

const Settings = ({ navigation }) => {
    const bottomSheetRef = useRef('bottomSheetRef');

    const expand = () => { return bottomSheetRef.current.expand() }

    return (
        <View style={{ flex: 1 }}>

            {/* <View style={{ position: 'absolute', top: 35, left: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                    <Ionicons name='ios-arrow-back-outline' size={25} color='#333' />
                </TouchableOpacity>
            </View> */}


            <View style={Styles.expadBottom}>
                <TouchableOpacity onPress={expand}  >
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
                        <ItemList title='Iniciar sesión' onPress={() => { navigation.navigate('Login') }}>
                            <Icon name='login' size={35} color='#333' />
                        </ItemList>
                        <ItemList title='Crear una cuenta' onPress={() => { navigation.navigate('Register') }}>
                            <Icon name='login' size={35} color='#333' />
                        </ItemList>
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

