import React, { memo, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView
} from 'react-native';

import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

import { theme } from '../../core/theme';

import {
    emailValidator,
    passwordValidator,
    nameValidator,
    requiredValidator,
    CedulaValidator,
    phoneValidator,
    last_nameValidator
} from '../../core/utils';
import { Register as RegisterApi } from '../../core/utils-http';
import AuthContext from '../../context/auth/AuthContext';

const Register = ({ navigation }) => {
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [cedula, setCedula] = useState({ value: '', error: '' });
    const [last_name, setLast_name] = useState({ value: '', error: '' });
    const [phone, setPhone] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    const [errorApi, setErrorApi] = useState();
    const [loading, setLoading] = useState(false);

    const { saveUSER } = useContext(AuthContext);

    const handleSubmit = async () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        const cedulaError = CedulaValidator(cedula.value);
        const last_nameError = last_nameValidator(last_name.value);
        const phoneError = phoneValidator(phone.value);

        if (emailError || passwordError || nameError || cedulaError || last_nameError || phoneError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setName({ ...name, error: nameError });
            setCedula({ ...cedula, error: cedulaError });
            setLast_name({ ...last_name, error: last_nameError });
            setPhone({ ...phone, error: phoneError });
            return;
        }


        var last_name_arr = last_name.value.split(' ');
        setLoading(true);
        const res = await RegisterApi({
            user_id: cedula.value,
            name: name.value,
            last_name1: last_name_arr[0],
            last_name2: last_name_arr[1],
            phone: phone.value,
            email: email.value,
            password: password.value
        });
        console.log(res);
        setLoading(false);
        if (res !== 401 || res !== 500) {
            setEmail({ value: '', error: '' });
            setPassword({ value: '', error: '' });
            setName({ value: '', error: '' });
            setCedula({ value: '', error: '' });
            setLast_name({ value: '', error: '' });
            setPhone({ value: '', error: '' });

            navigation.navigate('Login');
        } else if (res === 500) {
            setErrorApi('Ocurrió un error en el servidor');
        }
    }

    return (

        <Background>

            <Logo />

            <Header>Sistema de identificación de mascotas</Header>

            {
                errorApi ? <Text style={{ color: 'red' }} >{errorApi}</Text> : null
            }

            <TextInput
                label="Cedula o RUC"
                maxLength={13}
                keyboardType='numeric'
                returnKeyType="next"
                value={cedula.value}
                onChangeText={text => setCedula({ value: text, error: '' })}
                errorText={cedula.error}
            />

            <TextInput
                label="Nombres"
                maxLength={30}
                returnKeyType="next"
                value={name.value}
                onChangeText={text => setName({ value: text, error: '' })}
                errorText={name.error}
            />

            <TextInput
                label="Apellidos"
                maxLength={30}
                returnKeyType="next"
                value={last_name.value}
                onChangeText={text => setLast_name({ value: text, error: '' })}
                errorText={last_name.error}
            />

            <TextInput
                label="Telefono celular"
                maxLength={10}
                returnKeyType="next"
                keyboardType='numeric'
                value={phone.value}
                onChangeText={text => setPhone({ value: text, error: '' })}
                errorText={phone.error}
            />

            <TextInput
                label="Correo"
                maxLength={50}
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

            <Button loading={loading} mode="contained" onPress={handleSubmit}>
                {loading ? 'Registrandote...' : 'Registrame'}
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