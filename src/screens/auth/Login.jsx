import React, { memo, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { Login as login } from '../../core/utils-http';
import AuthContext from '../../context/auth/AuthContext';


const Login = ({ navigation }) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [loading, setLoading] = useState(false);
    const { saveUSER, user_data } = useContext(AuthContext);

    const handleSubmit = async () => {
        setLoading(true);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setLoading(false);
            return;
        }

        const res = await login({ email: email.value, password: password.value });

        if (res) {
            setLoading(false);

            if (res !== 401 || res !== 404 || res !== 500) {
                /* Data user */
                const { address, email, email_verified_at,
                    id_canton, last_name1, last_name2,
                    name, phone, profile_photo_url,
                    profile_photo_path, user_id } = res.data;

                /* Save in context state */
                saveUSER({
                    address, email, email_verified_at,
                    id_canton, last_name1, last_name2,
                    name, phone, profile_photo_url,
                    profile_photo_path, user_id
                });

                try {
                    const jsonValue = JSON.stringify({
                        address, email, email_verified_at,
                        id_canton, last_name1, last_name2,
                        name, phone, profile_photo_url,
                        profile_photo_path, user_id
                    });
                    await AsyncStorage.setItem('@auth_vet.utm', jsonValue);
                } catch (error) {
                    console.log(error);
                }

                navigation.pop();
            }
        }
    }
    return (

        <Background>

            <Logo />

            <Header>Sistema de identificación de mascotas</Header>

            <TextInput
                label="Correo"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
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

            <Button loading={loading} mode="contained" onPress={handleSubmit}>
                {loading ? 'Ingresando...' : 'Acceder'}
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