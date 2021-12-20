import React, { useState, useContext, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SimpleInput, SimpleTitle, SimpleTextArea } from '../components';
import { onlyNumber, nameValidator, emailValidator, phoneValidator, last_nameValidator } from '../core/utils';
import { getProvinces, getCantonsByProvince, updatedDataUser } from '../core/utils-http';

import AuthContext from "../context/auth/AuthContext";
import { theme } from '../core/theme';

const EditUserProfile = ({ navigation }) => {
    const { user_data, saveUSER } = useContext(AuthContext);

    const [name, setName] = useState(user_data.name);
    const [last_name, setLastName] = useState(user_data.last_name1 + " " + user_data.last_name2);
    const [email, setEmail] = useState(user_data.email);
    const [phone, setPhone] = useState(user_data.phone);
    const [province_id, setProvince_id] = useState(user_data.province ? user_data.province.id : null);
    const [canton_id, setCanton_id] = useState(user_data.canton ? user_data.canton.id : null);
    const [address, setAddress] = useState(user_data.address);

    //data api
    const [provinces, setProvinces] = useState();
    const [cantons, setCantons] = useState();

    const [loading, setLoading] = useState(false);
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [msg, setMsg] = useState('');


    const [nameError, setNameError] = useState('');
    const [lastnameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const handleSubmit = async () => {

        const resn = nameValidator(name);
        const resl = last_nameValidator(last_name);
        const rese = emailValidator(email);
        const resp = phoneValidator(phone);

        setNameError(resn);
        setLastNameError(resl);
        setEmailError(rese);
        setPhoneError(resp);

        if (resn || resl || rese || resp) return;

        setLoading(true);
        var last_name_arr = last_name.split(' ');

        const res = await updatedDataUser({
            name: name, email: email, phone: phone,
            id_canton: canton_id, address,
            last_name1: last_name_arr[0],
            last_name2: last_name_arr[1],
        }, user_data.api_token);

        setLoading(false);

        console.log(res.status);
        if (res.status === 404) {
            setMsg('Usuario no encontrado');
            return;
        } else if (res.status === 500) {
            setMsg('Ocurrió un error en el servidor')
            return;
        } else if (res.status === 401) {
            setMsg('No estás autorizado para actualizar este perfil')
            return;
        } else if (res.status === 301) {
            setMsg(res.data.message);
            return;
        }
        saveUSER(res.data)
        navigation.navigate('HomeScreen');

    }

    const handleChangeProvince = async (id) => {
        setProvince_id(id);
        const res = await getCantonsByProvince(id);
        if (res !== 500 || res !== 404) {
            setCantons(res.data);
            setCanton_id(res.data[0].id);
        }
    }

    useEffect(async () => {
        const res = await getProvinces();
        const res1 = await getCantonsByProvince(province_id ? province_id : res.data[0].id);
        setLoadingScreen(false);
        console.log(res1);
        if (res !== 500 || res !== 404) {
            setProvinces(res.data);
            setCantons(res1.data);
        }
    }, [])

    console.log(phone);

    return (

        loadingScreen ?
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#333" />
            </View>
            :
            <>
                <ScrollView keyboardShouldPersistTaps='handled' style={{ marginTop: 10 }}>

                    <SimpleTitle title='Nombres' />
                    <SimpleInput
                        placeholder='Nombres'
                        length={30}
                        value={name}
                        error={nameError}
                        onChangeText={text => {
                            setName(text);
                            setNameError('');
                        }}
                    />

                    <SimpleTitle title='Apellidos' />
                    <SimpleInput
                        placeholder='Apellidos'
                        length={30}
                        value={last_name}
                        error={lastnameError}
                        onChangeText={text => {
                            setLastName(text);
                            setLastNameError('');
                        }}
                    />

                    <SimpleTitle title='Correo electrónico' />
                    <SimpleInput
                        placeholder='Correo electrónico'
                        length={65}
                        value={email}
                        error={emailError}
                        onChangeText={text => {
                            setEmail(text);
                            setEmailError('');
                        }}
                    />

                    <SimpleTitle title='Número de telefono' />
                    <SimpleInput
                        placeholder='Número de telefono'
                        length={10}
                        value={phone}
                        error={phoneError}
                        keyboardType='numeric'
                        onChangeText={text => {
                            setPhone(onlyNumber(text));
                            setPhoneError('');
                        }}
                    />

                    <SimpleTitle title='Provincia' />
                    <View style={{ paddingHorizontal: 15 }}>
                        <Picker
                            selectedValue={province_id}
                            style={{ width: '100%', }}
                            onValueChange={(itemValue, itemIndex) => handleChangeProvince(itemValue)}
                        >
                            {
                                provinces ?
                                    provinces.map((e, i) => {
                                        return (
                                            <Picker.Item key={e.id} label={e.name} value={e.id} />
                                        );
                                    })
                                    : null
                            }
                        </Picker>
                    </View>

                    <SimpleTitle title='Canton' />
                    <View style={{ paddingHorizontal: 15 }}>
                        <Picker
                            selectedValue={canton_id}
                            style={{ width: '100%', }}
                            onValueChange={(itemValue, itemIndex) => setCanton_id(itemValue)}
                        >
                            {
                                cantons ?
                                    cantons.map((e, i) => {
                                        return (
                                            <Picker.Item key={e.id} label={e.name} value={e.id} />
                                        );
                                    })
                                    : null
                            }
                        </Picker>
                    </View>

                    <SimpleTitle title='Dirección' />
                    <SimpleTextArea
                        placeholder='Dirección'
                        length={255}
                        value={address}
                        numberOfLines={5}
                        onChangeText={text => setAddress(text)}
                    />

                    {msg ? <Text style={{ fontSize: 13, color: 'red', paddingHorizontal: 20 }}>{msg}</Text> : null}


                    <View style={Styles.buttonContainer}>
                        <TouchableOpacity disabled={loading} style={Styles.button} onPress={handleSubmit}>
                            <Text style={Styles.buttonText}>{!loading ? 'GUARDAR' : 'GUARDANDO...'}</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView >
            </>
    );
}

export default EditUserProfile;

const Styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.All,
        padding: 10,
        width: '100%',
        borderRadius: 10
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
    }
});