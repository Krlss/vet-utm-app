import React, { useState, useContext, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SimpleInput, SimpleTitle, SimpleTextArea } from '../components';
import { onlyNumber, nameValidator, emailValidator, phoneValidator, last_nameValidator } from '../core/utils';
import { getProvinces, getCantonsByProvince, updatedDataUser } from '../core/utils-http';

import AuthContext from "../context/auth/AuthContext";
import { theme } from '../core/theme';

const EditUserProfile = ({ navigation, route }) => {
    const { data } = route.params;
    console.log(data);
    const { user_data, saveUSER } = useContext(AuthContext);

    const [name, setName] = useState({ value: data.name, error: '' });
    const [specie, setSpecie] = useState({ value: data.specie, error: '' });
    const [race, setRace] = useState({ value: data.race, error: '' });
    const [sex, setSex] = useState({ value: data.sex, error: '' });
    const [birth, setBirth] = useState({ value: data.birth, error: '' });
    const [castrated, setCastrated] = useState({ value: data.castrated, error: '' });
    const [lost, setLost] = useState(data.lost);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        /* setLoading(true);   
        const res = await updatedDataUser({
            name: name.value, email: email.value, phone: phone.value,
            id_canton: canton_id, address,
            last_name1: last_name_arr[0],
            last_name2: last_name_arr[1],
        }, user_data.api_token);

        setLoading(false);
        if (res !== 404 || res !== 500 || res !== 401) {
            saveUSER(res.data)
            navigation.navigate('HomeScreen');
        } */
    }



    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={{ marginTop: 10 }}>

            <SimpleTitle title='Nombre' />
            <SimpleInput
                placeholder='Nombre'
                length={30}
                value={name.value}
                error={name.error}
                onChangeText={text => setName(text)}
            />

            <SimpleTitle title='Especie' />

            <View style={{ paddingHorizontal: 15 }}>
                <Picker
                    selectedValue={specie}
                    style={{ width: '100%', }}
                    onValueChange={(itemValue, itemIndex) => setSpecie(itemValue)}
                >
                    <Picker.Item label='Canina' value='canine' />
                    <Picker.Item label='Felina' value='feline' />
                </Picker>
            </View>

            <SimpleTitle title='Raza' />
            <SimpleInput
                placeholder='Raza'
                length={65}
                value={race.value}
                error={race.error}
                onChangeText={text => setRace(text)}
            />

            <SimpleTitle title='Sexo' />
            <View style={{ paddingHorizontal: 15 }}>
                <Picker
                    selectedValue={sex}
                    style={{ width: '100%', }}
                    onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
                >
                    <Picker.Item label='Macho' value='M' />
                    <Picker.Item label='Hembra' value='F' />
                </Picker>
            </View>

            <SimpleTitle title='Fecha de nacimiento' />
            <SimpleInput
                placeholder='ejm. 2021-12-09'
                length={10}
                value={birth.value}
                error={birth.error}
                onChangeText={text => setBirth(text)}
            />

            <SimpleTitle title='Castrado' />
            <View style={{ paddingHorizontal: 15 }}>
                <Picker
                    selectedValue={castrated}
                    style={{ width: '100%', }}
                    onValueChange={(itemValue, itemIndex) => setCastrated(itemValue)}
                >
                    <Picker.Item label='Si' value={true} />
                    <Picker.Item label='No' value={false} />
                </Picker>
            </View>

            <SimpleTitle title='Perdido' />
            <View style={{ paddingHorizontal: 15 }}>
                <Picker
                    selectedValue={lost}
                    style={{ width: '100%', }}
                    onValueChange={(itemValue, itemIndex) => setLost(itemValue)}
                >
                    <Picker.Item label='Si' value={true} />
                    <Picker.Item label='No' value={false} />
                </Picker>
            </View>

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