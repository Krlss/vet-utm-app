import React, { useState, useContext, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SimpleInput, SimpleTitle, SimpleTextArea } from '../components';
import { onlyNumber } from '../core/utils';
import ReportContext from "../context/Report/ReportContext";
import { Picker } from "@react-native-picker/picker";

const petReport = ({ navigation }) => {


    const { savePET, animal_data } = useContext(ReportContext);

    const [name, setName] = useState(animal_data.name);
    const [birth, setBirth] = useState(animal_data.birth);
    const [sex, setSex] = useState(animal_data.sex);
    const [castrated, setCastrated] = useState(animal_data.castrated);
    const [description, setDescription] = useState(animal_data.description);
    const [specie, setSpecie] = useState(animal_data.specie);
    const [race, setRace] = useState(animal_data.race);

    const handleSubmit = () => {
        savePET({
            name,
            birth,
            description,
            sex,
            castrated,
            specie,
            race
        });
        navigation.pop();
    }

    return (
        <ScrollView keyboardShouldPersistTaps='handled'>

            <SimpleTitle title='Nombre' />
            <SimpleInput
                placeholder='opcional'
                length={50}
                value={name}
                onChangeText={text => setName(text)}
            />

            <SimpleTitle title='Sexo' />

            <View style={{ paddingHorizontal: 13 }}>
                <Picker
                    selectedValue={sex}
                    onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
                >
                    <Picker.Item label='Hembra' value='H' />
                    <Picker.Item label='Macho' value='M' />
                </Picker>
            </View>

            <SimpleTitle title='Especie' />
            <SimpleInput
                placeholder='Especie'
                length={30}
                value={specie}
                onChangeText={text => setSpecie(text)}
            />

            <SimpleTitle title='Raza' />
            <SimpleInput
                placeholder='Raza'
                length={65}
                value={race}
                onChangeText={text => setRace(text)}
            />

            <SimpleTitle title='Última vez visto' />
            <SimpleInput
                placeholder='Última vez visto'
                length={65}
                value={race}
                onChangeText={text => setRace(text)}
            /> 

            <SimpleTitle title='Descripción' />
            <SimpleTextArea
                placeholder='Descripción'
                length={255}
                value={description}
                numberOfLines={5}
                onChangeText={text => setDescription(text)}
            />


            <View style={Styles.buttonContainer}>
                <TouchableOpacity
                    style={Styles.button}
                    onPress={handleSubmit}>
                    <Text style={Styles.buttonText}>TERMINAR</Text>
                </TouchableOpacity>
            </View>


        </ScrollView>
    );
}

const Styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF8C00',
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
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '700'
    }
});

export default petReport;


{/* <View style={{ paddingHorizontal: 13 }}>
    <Picker
        selectedValue={province}
        onValueChange={(itemValue, itemIndex) => handlePicker(itemValue)}
    >
        {
            apiProvinces ?
                apiProvinces.data.map((e, index) =>
                    <Picker.Item key={index} label={e.name} value={e.id} />) : null
        }
    </Picker>
</View> */}

