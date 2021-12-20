import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { SimpleInput, SimpleTitle } from '../components';
import { passwordValidator } from '../core/utils';
import { updatedPassword } from '../core/utils-http';
import { theme } from '../core/theme';
import AuthContext from "../context/auth/AuthContext";

const ChangePassword = ({ navigation }) => {

    const { user_data } = useContext(AuthContext);

    const [currentPassword, setCurrentPassword] = useState();
    const [currentPasswordError, setCurrentPasswordError] = useState();
    const [password, setPassword] = useState();
    const [passwordError, setPasswordError] = useState();
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const handleSubmit = async () => {
        const passc = passwordValidator(currentPassword);
        const passn = passwordValidator(password);

        setCurrentPasswordError(passc);
        setPasswordError(passn);

        if (passc || passn) return;

        setLoading(true);
        const res = await updatedPassword({ currentPassword, password }, user_data.api_token);
        setLoading(false);
        console.log(res);

        if (res.status === 404) {
            setMsg(res.data.message);
        } else if (res.status === 500) {
            setMsg('Ocurrió un error en el servidor');
        } else if (res.status === 401) {
            setMsg('No tienes permisos para hacer esa acción');
        } else if (res) {
            navigation.navigate('HomeScreen');
        }
    }

    return (
        <View style={{ marginTop: 10 }}>

            <SimpleTitle title='Contraseña actual' />
            <SimpleInput
                placeholder='Contraseña actual'
                value={currentPassword}
                error={currentPasswordError}
                onChangeText={text => {
                    setCurrentPassword(text);
                }}
            />

            <SimpleTitle title='Nueva contraseña' />
            <SimpleInput
                placeholder='Nueva contraseña'
                value={password}
                error={passwordError}
                onChangeText={text => {
                    setPassword(text);
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

export default ChangePassword;

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