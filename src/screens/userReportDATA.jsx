import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View } from 'react-native';

import { SimpleInput, SimpleTitle } from '../components';
import { onlyNumber } from '../core/utils';
import { Picker } from '@react-native-picker/picker';

import { Text } from 'react-native';

import axios from 'axios';

const userReport = () => {


    const [cedula, setCedula] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [province, setProvince] = useState('');
    const [canton, setCanton] = useState('');
    const [address, setAddress] = useState('');


    const [apiProvinces, setApiProvinces] = useState();
    const [apiCantons, setApiCantons] = useState();

    const getProvinces = async () => {
        try {
            return axios.get(`http://192.168.100.101:5000/api/provinces`).then(res => {
                setApiProvinces(res.data);
            }).catch(e => { console.log(e) })
        } catch (error) { console.log(error); }
    }

    const handlePicker = (itemValue) => {
        setProvince(itemValue)
        console.log(itemValue)
    }

    useEffect(() => {
        getProvinces();
    }, [])

    return (
        <ScrollView style={{ marginTop: 15 }}>

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

            <SimpleTitle title='Provincia' />

            <Picker
                selectedValue={province}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => handlePicker(itemValue)}
            >
                {
                    apiProvinces ?
                        apiProvinces.data.map((e, index) => <Picker.Item key={index} label={e.name} value={e.id} />) : null
                }
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>

            {/* <Picker
                selectedValue={canton}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setCanton(itemValue)}
            >
                {
                    apiProvinces && province ?
                        apiProvinces.data[province].map((e, index) => <Picker.Item key={index} label={e.name} value={e.id} />) : null
                }
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker> */}

            <SimpleTitle title='Cantón' />
            <SimpleInput
                placeholder='Cantón'
                length={65}
                value={email}
                onChangeText={text => setEmail(text)}
            />

            <SimpleTitle title='Dirección' />
            <SimpleInput
                placeholder='Correo electrónico'
                length={65}
                value={email}
                onChangeText={text => setEmail(text)}
            />
        </ScrollView>
    );
}

export default userReport;