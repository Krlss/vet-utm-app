import React, { useState, useContext, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Keyboard, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SimpleInput, SimpleTitle, SimpleTextArea } from '../components';
import { namePet, race as RacePet } from '../core/utils';
import { CreatedNewPet, getSpecies, getRacesBySpecie } from '../core/utils-http';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useToast } from "react-native-toast-notifications";

import AuthContext from "../context/auth/AuthContext";
import { theme } from '../core/theme';

const AddPet = ({ navigation, route }) => {

    const { api_token } = route.params;

    const { saveUSER, user_data } = useContext(AuthContext);

    const [name, setName] = useState();
    const [specie, setSpecie] = useState('canine');
    const [race, setRace] = useState();
    const [sex, setSex] = useState('M');
    const [birth, setBirth] = useState(new Date);
    const [castrated, setCastrated] = useState(true);
    const [lost, setLost] = useState(false);
    const [characteristic, setCharacteristic] = useState();
    const [loading, setLoading] = useState(false);

    const [nameError, setNameError] = useState('');
    const [raceError, setRaceError] = useState('');
    const [show, setShow] = useState(false);
    const toast = useToast();

    //data api
    const [species, setSpecies] = useState();
    const [races, setRaces] = useState();

    const [loadingScreen, setLoadingScreen] = useState(true);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || birth;
        setShow(Platform.OS === 'ios');
        setBirth(currentDate);
    };

    const handleChangeSpecie = async (id) => {
        setSpecie(id);
        const res = await getRacesBySpecie(id);
        if (res !== 500 || res !== 404) {
            setRaces(res.data);
            setRace(res.data[0].id);
        }
    }

    useEffect(async () => {
        const res = await getSpecies();
        const res1 = await getRacesBySpecie(res.data[0].id);
        setLoadingScreen(false);
        if (res !== 500 || res !== 404) {
            setSpecies(res.data);
            setRaces(res1.data);
        }
    }, [])


    const handleSubmit = async () => {

        const resn = namePet(name);
        const resr = RacePet(race);
        setNameError(resn);
        setRaceError(resr);
        Keyboard.dismiss();
        if (resn || resr) return;

        setLoading(true);
        const res = await CreatedNewPet({
            name, id_specie: specie, id_race: race, birth, sex, castrated, lost, characteristic
        }, api_token);
        console.log(res);
        setLoading(false);
        if (res != 404 || res != 500 || res != 401 || res != 405) {
            navigation.navigate('HomeScreen');
            return toast.show('Mascota agregada a tu perfil', { type: 'success', duration: 4000, offset: 30, animationType: "slide-in" });
        }
    }

    return (
        loadingScreen ?
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#333" />
            </View>
            :
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
                        onValueChange={(itemValue, itemIndex) => handleChangeSpecie(itemValue)}
                    >
                        {
                            species ?
                                species.map((e, i) => {
                                    return (
                                        <Picker.Item key={e.id} label={e.name} value={e.id} />
                                    );
                                })
                                : null
                        }
                    </Picker>
                </View>

                <SimpleTitle title='Raza' />

                <View style={{ paddingHorizontal: 15 }}>
                    <Picker
                        selectedValue={race}
                        style={{ width: '100%', }}
                        onValueChange={(itemValue, itemIndex) => setRace(itemValue)}
                    >
                        {
                            races ?
                                races.map((e, i) => {
                                    return (
                                        <Picker.Item key={e.id} label={e.name} value={e.id} />
                                    );
                                })
                                : null
                        }
                    </Picker>
                </View>

                <SimpleTitle title='Fecha de nacimiento' />

                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 7,
                    alignItems: 'center'
                }}>
                    {birth ? <View><Text>{birth.getDate() + '/' + (birth.getMonth() + 1) + '/' + birth.getFullYear()}</Text></View> : null}

                    <TouchableOpacity style={Styles.buttonDate} onPress={() => setShow(true)}>
                        <MaterialIcon name='update' size={25} color='#333' />
                    </TouchableOpacity>
                </View>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={birth}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        maximumDate={new Date()}
                        minimumDate={new Date(2000, 1, 1)}
                    />
                )}

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

                <SimpleTitle title='Característica' />
                <SimpleTextArea
                    placeholder='Característica'
                    value={characteristic}
                    onChangeText={text => setCharacteristic(text)}
                    numberOfLines={1}
                />

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