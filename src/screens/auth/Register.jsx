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

import { emailValidator, passwordValidator, nameValidator } from '../../core/utils';


const Register = ({ navigation }) => {
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    console.log(email, password);
    const handleSubmit = () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError || nameError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setName({ ...name, error: nameError });
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

            <Header>Crear una cuenta</Header>


            <TextInput
                label="Nombre"
                returnKeyType="next"
                value={name.value}
                onChangeText={text => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />

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

            <Button mode="contained" onPress={handleSubmit}>
                Registrame
            </Button>

            <View style={styles.row}>
                <Text style={styles.label}>¿Ya tienes cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </Background>

    );
}

export default memo(Register);

const styles = StyleSheet.create({
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