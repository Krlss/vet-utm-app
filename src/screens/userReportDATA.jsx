import React, { useState, useContext, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SimpleInput, SimpleTitle, SimpleTextArea } from '../components/Index';
import { onlyNumber, nameValidator, emailValidator, phoneValidator, last_nameValidator, CedulaValidator, addressValidator } from '../core/utils';
import { getProvinces, getCantonsByProvince } from '../core/utils-http';

import ReportContext from "../context/Report/ReportContext";

import { theme } from '../core/theme';

const userReportDATA = ({ navigation }) => {
    const { rsaveUSER, ruser_data } = useContext(ReportContext);

    const { last_name1, last_name2 } = ruser_data;

    const [cedula, setCedula] = useState(ruser_data.user_id);
    const [name, setName] = useState(ruser_data.name);
    const [last_name, setLastName] = useState(last_name1 && last_name2 ? last_name1 + " " + last_name2 : '');
    const [email, setEmail] = useState(ruser_data.email);
    const [phone, setPhone] = useState(ruser_data.phone);
    const [province_id, setProvince_id] = useState(ruser_data.id_province);
    const [canton_id, setCanton_id] = useState(ruser_data.id_canton);
    const [address, setAddress] = useState(ruser_data.address);

    //data api
    const [provinces, setProvinces] = useState();
    const [cantons, setCantons] = useState();

    const [loadingScreen, setLoadingScreen] = useState(true);


    const [cedulaError, setCedulaError] = useState('');
    const [nameError, setNameError] = useState('');
    const [lastnameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');

    const handleSubmit = async () => {

        const resc = CedulaValidator(cedula);
        const resn = nameValidator(name);
        const resl = last_nameValidator(last_name);
        const rese = emailValidator(email);
        const resp = phoneValidator(phone);
        const resa = addressValidator(address);

        setCedulaError(resc);
        setNameError(resn);
        setLastNameError(resl);
        setEmailError(rese);
        setPhoneError(resp);
        setAddressError(resa);

        if (resn || resl || rese || resp || cedulaError) return;


        var last_name_arr = last_name.split(' ');
        rsaveUSER({
            user_id: cedula,
            name,
            last_name1: last_name_arr[0],
            last_name2: last_name_arr[1],
            email,
            phone,
            id_province: province_id,
            id_canton: canton_id,
            address
        });
        navigation.pop()
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
        if (res !== 500 || res !== 404) {
            setProvinces(res.data);
            setCantons(res1.data);
        }
    }, [])


    return (

        loadingScreen ?
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#333" />
            </View>
            :
            <>
                <ScrollView keyboardShouldPersistTaps='handled' style={{ marginTop: 10 }}>

                    <SimpleTitle title='Cédula o RUC' />
                    <SimpleInput
                        placeholder='Cédula o RUC'
                        length={13}
                        value={cedula}
                        error={cedulaError}
                        keyboardType='numeric'
                        onChangeText={text => {
                            setCedula(text);
                            setCedulaError('');
                        }}
                    />

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
                        error={addressError}
                        numberOfLines={5}
                        onChangeText={text => {
                            setAddress(text)
                            setAddressError('')
                        }}
                    />

                    <View style={Styles.buttonContainer}>
                        <TouchableOpacity style={Styles.button} onPress={handleSubmit}>
                            <Text style={Styles.buttonText}>AGREGAR</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView >
            </>
    );
}

export default userReportDATA;

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