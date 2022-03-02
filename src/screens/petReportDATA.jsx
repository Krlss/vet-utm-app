import React, { useState, useContext } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SimpleInput, SimpleTitle } from '../components/Index';
import { namePet, race as RacePet } from '../core/utils';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import DatePicker from 'react-native-date-picker'

import ReportContext from "../context/Report/ReportContext";
import { theme } from '../core/theme';

const petReportDATA = ({ navigation }) => {

    const { ranimal_data, rsavePET } = useContext(ReportContext);
    console.log(ranimal_data);

    const [name, setName] = useState(ranimal_data.name);
    const [specie, setSpecie] = useState(ranimal_data.specie ? ranimal_data : 'canine');
    const [race, setRace] = useState(ranimal_data.race);
    const [sex, setSex] = useState(ranimal_data.sex ? ranimal_data.sex : 'M');
    const [birth, setBirth] = useState(ranimal_data.birth ? ranimal_data.birth : new Date);
    const [castrated, setCastrated] = useState(ranimal_data.castrated ? ranimal_data.castrated : true);

    const [nameError, setNameError] = useState('');
    const [raceError, setRaceError] = useState('');
    const [open, setOpen] = useState(false)

    const handleSubmit = async () => {

        const resn = namePet(name);
        const resr = RacePet(race);
        setNameError(resn);
        setRaceError(resr);

        if (resn || resr ) return;

        rsavePET({
            name,
            birth,
            sex,
            race,
            specie,
            castrated
        });

        navigation.pop();
    }

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={{ marginTop: 10 }}
            keyboardShouldPersistTaps='handled'
        >

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

            <View style={Styles.buttonContainer}>
                <TouchableOpacity style={Styles.button} onPress={handleSubmit}>
                    <Text style={Styles.buttonText}>AGREGAR</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

export default petReportDATA;

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