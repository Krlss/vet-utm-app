import React, { useState, useContext } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SimpleInput, SimpleTitle } from '../components';
import { namePet, race as RacePet } from '../core/utils';
import { CreatedNewPet } from '../core/utils-http';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker'
import { useToast } from "react-native-toast-notifications";

import AuthContext from "../context/auth/AuthContext";
import { theme } from '../core/theme';

const AddPet = ({ navigation, route }) => {

    const { api_token } = route.params;

    const { saveUSER } = useContext(AuthContext);

    const [name, setName] = useState();
    const [specie, setSpecie] = useState('canine');
    const [race, setRace] = useState();
    const [sex, setSex] = useState('M');
    const [birth, setBirth] = useState(new Date);
    const [castrated, setCastrated] = useState(true);
    const [lost, setLost] = useState(false);

    const [loading, setLoading] = useState(false);

    const [nameError, setNameError] = useState('');
    const [raceError, setRaceError] = useState('');
    const [open, setOpen] = useState(false)
    const toast = useToast();

    const handleSubmit = async () => {

        const resn = namePet(name);
        const resr = RacePet(race);
        setNameError(resn);
        setRaceError(resr);

        if (resn || resr) return;

        setLoading(true);
        const res = await CreatedNewPet({
            name, specie, race, birth, sex, castrated, lost
        }, api_token);
        console.log(res);
        setLoading(false);
        if (res != 404 || res != 500 || res != 401 || res != 405) {
            saveUSER(res.data)
            navigation.navigate('HomeScreen');
            return toast.show('Mascota agregada a tu perfil', { type: 'success', duration: 4000, offset: 30, animationType: "slide-in" });
        }
    }

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={{ marginTop: 10 }}>

            <SimpleTitle title='Nombre' />
            <SimpleInput
                placeholder='Nombre'
                length={25}
                value={name}
                error={nameError}
                onChangeText={text => {
                    setNameError('')
                    setName(text)
                }}
            />

            <SimpleTitle title='Especie' />

            <View style={{ paddingHorizontal: 15 }}>
                <Picker
                    selectedValue={specie}
                    style={{ width: '100%', }}
                    onValueChange={(itemValue, itemIndex) => { setSpecie(itemValue) }}
                >
                    <Picker.Item label='Canina' value='canine' />
                    <Picker.Item label='Felina' value='feline' />
                </Picker>
            </View>

            <SimpleTitle title='Raza' />
            <SimpleInput
                placeholder='Raza'
                length={65}
                value={race}
                error={raceError}
                onChangeText={text => {
                    setRaceError('')
                    setRace(text)
                }}
            />

            <SimpleTitle title='Fecha de nacimiento' />

            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 7,
                alignItems: 'center'
            }}>
                {birth ? <View><Text>{birth.getDate() + '/' + (birth.getMonth() + 1) + '/' + birth.getFullYear()}</Text></View> : null}

                <TouchableOpacity style={Styles.buttonDate} onPress={() => setOpen(true)}>
                    <MaterialIcon name='update' size={25} color='#333' />
                </TouchableOpacity>
            </View>

            <DatePicker
                date={birth}
                onDateChange={setBirth}
                mode='date'
                locale='es'
                modal
                open={open}
                title='Fecha de nacimiento'
                confirmText="Confirmar"
                cancelText="Cancelar"
                maximumDate={new Date()}
                onConfirm={(birth) => {
                    setOpen(false)
                    setBirth(birth)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
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
                    <Text style={Styles.buttonText}>{!loading ? 'AGREGAR' : 'AGREGANDO...'}</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

export default AddPet;

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