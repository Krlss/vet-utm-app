import React, { useState, useContext } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { SimpleInput, SimpleTitle } from '../components';
import { onlyNumber } from '../core/utils';

import ReportContext from "../context/Report/ReportContext";

const userReport = ({ navigation }) => {

    const { saveUSER, user_data } = useContext(ReportContext);

    const [cedula, setCedula] = useState(user_data.user_id);
    const [first_name, setFirst_name] = useState(user_data.first_name);
    const [last_name, setLastName] = useState(user_data.last_name);
    const [email, setEmail] = useState(user_data.email);
    const [phone, setPhone] = useState(user_data.phone);


    /* const [province, setProvince] = useState();
    const [canton, setCanton] = useState();
    const [address, setAddress] = useState();

    //Datos que vienen de la api...
    const [apiProvinces, setApiProvinces] = useState();
    const [apiCantons, setApiCantons] = useState(); */

    /* const handlePicker = async (itemValue) => {
        const res = await getCantonsByProvince(itemValue);
        if (res !== 404 || res !== 500) {
            setProvince(res.id);
            setCanton(res.cantons[0].id);
            setApiCantons(res.cantons);
        };
    } */


    const handleSubmit = () => {

        saveUSER({
            user_id: cedula,
            first_name,
            last_name,
            email,
            phone
        }); 
        navigation.pop()
    }

    /*  useEffect(async () => {
         const res = await getProvinces();
         if (res !== 404 || res !== 500) { setApiProvinces(res); }
     }, []) */

    return (
        <ScrollView keyboardShouldPersistTaps='handled'>

            <SimpleTitle title='Cédula o RUC' />
            <SimpleInput
                placeholder='Cédula o RUC'
                length={13}
                value={cedula}
                keyboardType='numeric'
                onChangeText={text => setCedula(onlyNumber(text))}
            />

            <SimpleTitle title='Nombres' />
            <SimpleInput
                placeholder='Nombres'
                length={30}
                value={first_name}
                onChangeText={text => setFirst_name(text)}
            />

            <SimpleTitle title='Apellidos' />
            <SimpleInput
                placeholder='Apellidos'
                length={30}
                value={last_name}
                onChangeText={text => setLastName(text)}
            />

            <SimpleTitle title='Correo electrónico' />
            <SimpleInput
                placeholder='Correo electrónico'
                length={65}
                value={email}
                onChangeText={text => setEmail(text)}
            />

            <SimpleTitle title='Número de telefono' />
            <SimpleInput
                placeholder='Número de telefono'
                length={10}
                value={phone}
                keyboardType='numeric'
                onChangeText={text => setPhone(onlyNumber(text))}
            />

            {/* <SimpleTitle title='Provincia' />
            <SimpleInput
                placeholder='Número de telefono'
                length={10}
                value={phone}
                keyboardType='numeric'
                onChangeText={text => setPhone(onlyNumber(text))}
            />


            <SimpleTitle title='Cantón' />
            <SimpleInput
                placeholder='Número de telefono'
                length={10}
                value={phone}
                keyboardType='numeric'
                onChangeText={text => setPhone(onlyNumber(text))}
            /> */}


            {/* <SimpleTitle title='Dirección' />
            <SimpleTextArea
                placeholder='Dirección'
                length={255}
                value={address}
                numberOfLines={5}
                onChangeText={text => setAddress(text)}
            /> */}

            <View style={Styles.buttonContainer}>
                <TouchableOpacity style={Styles.button} onPress={handleSubmit}>
                    <Text style={Styles.buttonText}>TERMINAR</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

const Styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFDD00',
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
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '700'
    }
});

export default userReport;


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

{/* <View style={{ paddingHorizontal: 13 }}>
    <Picker
        selectedValue={canton}
        onValueChange={(itemValue, itemIndex) => setCanton(itemValue)}
    >
        {
            apiCantons ?
                apiCantons.map((e, index) =>
                    <Picker.Item key={index} label={e.name} value={e.id} />) : null
        }
    </Picker>
</View> */}