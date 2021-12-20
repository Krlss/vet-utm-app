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
    const { saveUSER } = useContext(AuthContext);
    const [errormsg, setErrormsg] = useState();

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
        setLoading(false);
        if (res) {
            if (res.data) {
                /* Data user */
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
                    canton, province, pet
                });

                try {
                    const jsonValue = JSON.stringify({
                        api_token,
                        user_id
                    });
                    await AsyncStorage.setItem('@auth_vet.utm', jsonValue);
                } catch (error) {
                    console.log(error);
                }

                navigation.navigate('HomeScreen');
            } else if (res === 401 || res === 404) {
                setErrormsg('Correo o contraseña incorrecta!')
            } else if (res === 500) {
                setErrormsg('Ocurrio un error en el servidor, intentalo más tarde')
            } else if (res === 301)
                setErrormsg('Revisa tu correo electrónico para activar tu cuenta')
        }
    }
    return (

        <Background>

            <Logo />

            <Header>Sistema de identificación de mascotas</Header>

            {
                errormsg ? <Text style={{ color: 'red' }} >{errormsg}</Text> : null
            }

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