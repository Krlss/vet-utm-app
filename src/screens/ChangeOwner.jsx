import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Keyboard } from 'react-native';

import { SimpleInput, SimpleTitle } from '../components';
import { CedulaValidator } from '../core/utils';
import { updatedDataPet } from '../core/utils-http';
import { theme } from '../core/theme';
import AuthContext from "../context/auth/AuthContext";
import { useToast } from "react-native-toast-notifications";

const ChangeOwner = ({ navigation, route }) => {

    const { data, token } = route.params;
    const { user_data } = useContext(AuthContext);

    const [user_id, setUser_id] = useState();
    const [user_idError, setUser_idError] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleSubmit = async () => {
        setUser_idError(CedulaValidator(user_id));
        Keyboard.dismiss();

        if (user_id == user_data.user_id) {
            return toast.show('No puedes usar tu misma identificación..!', { type: 'warning', duration: 4000, offset: 30, animationType: "slide-in" });
        }

        if (user_id && user_idError === '') {
            setLoading(true);
            const res = await updatedDataPet({ user_id, pet_id: data.pet_id }, token);
            setLoading(false);

            if (res === 404) {
                return toast.show('Cédula o RUC incorrecto', { type: 'warning', duration: 4000, offset: 30, animationType: "slide-in" });
            } else if (res === 500) {
                return toast.show('Ocurrió un error en el servidor', { type: 'danger', duration: 4000, offset: 30, animationType: "slide-in" });
            } else if (res === 401) {
                return toast.show('No tienes permisos para hacer esa acción', { type: 'danger', duration: 4000, offset: 30, animationType: "slide-in" });
            } else if (res) {
                navigation.navigate('HomeScreen');
                return toast.show('Mascota eliminada de tu perfil', { type: 'warning', duration: 4000, offset: 30, animationType: "slide-in" });
            }
        }
    }

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={{ marginTop: 20 }}>
            <SimpleTitle title='MASCOTA' />
            <Text style={Styles.name}>{data.name}</Text>
            <Text style={Styles.id}>{data.pet_id}</Text>


            <SimpleTitle title='Nuevo dueño' />
            <SimpleInput
                placeholder='Cedula o RUC'
                length={13}
                keyboardType='numeric'
                value={user_id}
                error={user_idError}
                onChangeText={text => {
                    setUser_id(text);
                    setUser_idError('')
                }}
            />

            <View style={Styles.buttonContainer}>
                <TouchableOpacity disabled={loading} style={Styles.button} onPress={handleSubmit}>
                    <Text style={Styles.buttonText}>{!loading ? 'LISTO' : 'CAMBIANDO...'}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default ChangeOwner;

const Styles = StyleSheet.create({
    name: {
        fontSize: 15,
        fontWeight: '600',
        overflow: 'hidden',
        textTransform: 'uppercase',
        paddingHorizontal: 20
    },
    id: {
        color: '#777',
        fontSize: 13,
        textTransform: 'uppercase',
        paddingHorizontal: 20
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center'
    },
    buttonText: {
        color: '#333',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '700'
    },
    button: {
        backgroundColor: theme.colors.All,
        padding: 10,
        width: '100%',
        borderRadius: 10
    },
});