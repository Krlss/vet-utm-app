import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { SimpleInput, SimpleTitle } from '../components';
import { CedulaValidator } from '../core/utils';
import { updatedDataPet } from '../core/utils-http';
import { theme } from '../core/theme';
import AuthContext from "../context/auth/AuthContext";

const ChangeOwner = ({ navigation, route }) => {

    const { data, token } = route.params;
    const { saveUSER } = useContext(AuthContext);

    const [user_id, setUser_id] = useState();
    const [user_idError, setUser_idError] = useState();
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const handleSubmit = async () => {
        setUser_idError(CedulaValidator(user_id));

        if (user_id && user_idError === '') {
            setLoading(true);
            const res = await updatedDataPet({ user_id, pet_id: data.pet_id }, token);
            setLoading(false);
            console.log(res);

            if (res === 404) {
                setMsg('Cédula o RUC incorrecto');
            } else if (res === 500) {
                setMsg('Ocurrió un error en el servidor');
            } else if (res === 401) {
                setMsg('No tienes permisos para hacer esa acción');
            } else if (res) {
                saveUSER(res.data)
                navigation.navigate('HomeScreen');
            }
        }
    }

    return (
        <View style={{ marginTop: 20 }}>
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
                    setMsg('');
                    setUser_idError('')
                }}
            />

            {msg ? <Text style={{ fontSize: 13, color: 'red', paddingHorizontal: 20 }}>{msg}</Text> : null}

            <View style={Styles.buttonContainer}>
                <TouchableOpacity disabled={loading} style={Styles.button} onPress={handleSubmit}>
                    <Text style={Styles.buttonText}>{!loading ? 'LISTO' : 'CAMBIANDO...'}</Text>
                </TouchableOpacity>
            </View>
        </View>
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