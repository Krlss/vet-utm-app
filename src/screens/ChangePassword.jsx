import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, ScrollView } from 'react-native';

import { SimpleInput, SimpleTitle } from '../components';
import { passwordValidator } from '../core/utils';
import { updatedPassword } from '../core/utils-http';
import { theme } from '../core/theme';
import AuthContext from "../context/auth/AuthContext";
import { useToast } from "react-native-toast-notifications";

const ChangePassword = ({ navigation }) => {

    const { user_data } = useContext(AuthContext);

    const [currentPassword, setCurrentPassword] = useState();
    const [currentPasswordError, setCurrentPasswordError] = useState();
    const [password, setPassword] = useState();
    const [passwordError, setPasswordError] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleSubmit = async () => {
        if (currentPassword === password) return toast.show("Utiliza una nueva contraseña...!", { type: 'custom', duration: 4000, offset: 30, animationType: "slide-in" });
        const passc = passwordValidator(currentPassword);
        const passn = passwordValidator(password);
        Keyboard.dismiss();
        setCurrentPasswordError(passc);
        setPasswordError(passn);

        if (passc || passn) return;

        setLoading(true);
        const res = await updatedPassword({ currentPassword, password }, user_data.api_token);
        setLoading(false);

        if (res.status === 404) {
            return toast.show(res.data.message, { type: 'warning', duration: 4000, offset: 30, animationType: "slide-in" });
        } else if (res.status === 500) {
            return toast.show("Ocurrió un error en el servidor", { type: 'warning', duration: 4000, offset: 30, animationType: "slide-in" });
        } else if (res.status === 401) {
            return toast.show("No tienes permisos para hacer esa acción", { type: 'warning', duration: 4000, offset: 30, animationType: "slide-in" });
        } else if (res) {
            navigation.navigate('HomeScreen');
            return toast.show("Tu contraseña ha sido restablecida", { type: 'success', duration: 4000, offset: 30, animationType: "slide-in" });
        }
    }

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={{ marginTop: 10 }}>

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

            <View style={Styles.buttonContainer}>
                <TouchableOpacity disabled={loading} style={Styles.button} onPress={handleSubmit}>
                    <Text style={Styles.buttonText}>{!loading ? 'LISTO' : 'CAMBIANDO...'}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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