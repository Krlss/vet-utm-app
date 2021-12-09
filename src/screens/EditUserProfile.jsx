import React, { useState, useContext, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SimpleInput, SimpleTitle, SimpleTextArea } from '../components';
import { onlyNumber, nameValidator, emailValidator, phoneValidator, last_nameValidator } from '../core/utils';
import { getProvinces, getCantonsByProvince, updatedDataUser } from '../core/utils-http';

import AuthContext from "../context/auth/AuthContext";
import { theme } from '../core/theme';

const EditUserProfile = ({ navigation }) => {
    const { user_data, saveUSER } = useContext(AuthContext);

    const [name, setName] = useState({ value: user_data.name, error: '' });
    const [last_name, setLastName] = useState({ value: user_data.last_name1 + " " + user_data.last_name2, error: '' });
    const [email, setEmail] = useState({ value: user_data.email, error: '' });
    const [phone, setPhone] = useState({ value: user_data.phone, error: '' });
    const [province_id, setProvince_id] = useState({ value: user_data.province ? user_data.province.id : null, error: '' });
    const [canton_id, setCanton_id] = useState({ value: user_data.canton ? user_data.canton.id : null, error: '' });
    const [address, setAddress] = useState(user_data.address);

    //data api
    const [provinces, setProvinces] = useState();
    const [cantons, setCantons] = useState();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        const nameError = nameValidator(name.value);
        const last_nameError = last_nameValidator(last_name.value);
        const emailError = emailValidator(email.value);
        const phoneError = phoneValidator(phone.value);

        if (emailError || nameError || last_nameError || phoneError) {
            setEmail({ ...email, error: emailError });
            setName({ ...name, error: nameError });
            setLastName({ ...last_name, error: last_nameError });
            setPhone({ ...phone, error: phoneError });
            return;
        }

        var last_name_arr = last_name.value.split(' ');

        const res = await updatedDataUser({
            name: name.value, email: email.value, phone: phone.value,
            id_canton: canton_id, address,
            last_name1: last_name_arr[0],
            last_name2: last_name_arr[1],
        }, user_data.api_token);

        setLoading(false);
        if (res !== 404 || res !== 500 || res !== 401) {
            saveUSER(res.data)
            navigation.pop();
        }
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
        if (res !== 500 || res !== 404) {
            setProvinces(res.data);
        }
    }, [])

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={{ marginTop: 10 }}>

            <SimpleTitle title='Nombres' />
            <SimpleInput
                placeholder='Nombres'
                length={30}
                value={name.value}
                error={name.error}
                onChangeText={text => setName(text)}
            />

            <SimpleTitle title='Apellidos' />
            <SimpleInput
                placeholder='Apellidos'
                length={30}
                value={last_name.value}
                error={last_name.error}
                onChangeText={text => setLastName(text)}
            />

            <SimpleTitle title='Correo electrónico' />
            <SimpleInput
                placeholder='Correo electrónico'
                length={65}
                value={email.value}
                error={email.error}
                onChangeText={text => setEmail(text)}
            />

            <SimpleTitle title='Número de telefono' />
            <SimpleInput
                placeholder='Número de telefono'
                length={10}
                value={phone.value}
                error={phone.error}
                keyboardType='numeric'
                onChangeText={text => setPhone(onlyNumber(text))}
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

            <View style={Styles.buttonContainer}>
                <TouchableOpacity disabled={loading} style={Styles.button} onPress={handleSubmit}>
                    <Text style={Styles.buttonText}>{!loading ? 'GUARDAR' : 'GUARDANDO...'}</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
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