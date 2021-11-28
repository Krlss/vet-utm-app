import React, { memo, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';

import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

import { theme } from '../../core/theme';

import { emailValidator, passwordValidator } from '../../core/utils';


const Login = ({ navigation }) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    console.log(email, password);
    const handleSubmit = () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }


        /* 
            Aquí pasa las validaciones...
            Enviar al homepage
        */
    }
    return (

        <Background>

            <Logo />

            <Header>Iniciar sesión</Header>


            <TextInput
                label="Correo"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            <TextInput
                label="Contraseña"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            <View style={styles.forgotPassword}>
                <TouchableOpacity
                /* onPress={() => navigation.navigate('ForgotPasswordScreen')} */
                >
                    <Text style={styles.label}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
            </View>

            <Button mode="contained" onPress={handleSubmit}>
                Acceder
            </Button>

            <View style={styles.row}>
                <Text style={styles.label}>¿No tienes una cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </Background>

    );
}

export default memo(Login);

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});