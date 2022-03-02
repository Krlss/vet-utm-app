import React, { memo, useState, useContext } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Keyboard
} from 'react-native';

import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { useToast } from "react-native-toast-notifications";

import { theme } from '../../core/theme';

import {
    emailValidator,
    passwordValidator,
    nameValidator,
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

    const [loading, setLoading] = useState(false);

    const { saveUSER } = useContext(AuthContext);
    const toast = useToast();

    const handleSubmit = async () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        const cedulaError = CedulaValidator(cedula.value);
        const last_nameError = last_nameValidator(last_name.value);
        const phoneError = phoneValidator(phone.value);
        Keyboard.dismiss();
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
        setLoading(false);
        if (res.status === 401) {
            return toast.show(res.data.message, { type: "danger", placement: "bottom", duration: 4000, offset: 30, animationType: "slide-in" });
        }
        if (res.status === 500) {
            return toast.show("Ocurrió un error en el servidor", { type: "danger", placement: "bottom", duration: 4000, offset: 30, animationType: "slide-in" });
        }

        setEmail({ value: '', error: '' });
        setPassword({ value: '', error: '' });
        setName({ value: '', error: '' });
        setCedula({ value: '', error: '' });
        setLast_name({ value: '', error: '' });
        setPhone({ value: '', error: '' });
        toast.show("Revisa tu correo electrónico para activar tu cuenta", { type: "success", placement: "bottom", duration: 4000, offset: 30, animationType: "slide-in" });
        navigation.navigate('Login');
    }

    return (

        <Background>

            <Logo />

            <Header>Sistema de identificación de mascotas</Header>

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
                type="password"
                show={false}
            />

            <Button loading={loading} mode="contained" onPress={handleSubmit}>
                {loading ? 'Registrandote...' : 'Registrame'}
            </Button>

            <View style={styles.row}>
                <Text style={styles.label}>¿Ya tienes cuenta? </Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Login')
                    Keyboard.dismiss()
                }}>
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