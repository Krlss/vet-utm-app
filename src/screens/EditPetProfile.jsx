import React, { useState, useContext, useRef } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SimpleInput, SimpleTitle } from '../components/Index';
import { namePet, race as RacePet, birthPet, deleteItemArr } from '../core/utils';
import { updatedDataPet } from '../core/utils-http';
import { Icon } from 'react-native-elements'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { useToast } from "react-native-toast-notifications";

import AuthContext from "../context/auth/AuthContext";
import { theme } from '../core/theme';

import DatePicker from 'react-native-date-picker'

const EditUserProfile = ({ navigation, route }) => {
    const { data, api_token } = route.params;
    const { user_data, saveUSER } = useContext(AuthContext);

    const [name, setName] = useState(data.name);
    const [specie, setSpecie] = useState(data.specie);
    const [race, setRace] = useState(data.race);
    const [sex, setSex] = useState(data.sex);
    const [birth, setBirth] = useState(data.birth ? new Date(data.birth) : new Date);
    const [castrated, setCastrated] = useState(data.castrated);
    const [lost, setLost] = useState(data.lost);
    const [open, setOpen] = useState(false)
    const [images, setImages] = useState(data.images);

    const [loading, setLoading] = useState(false);

    const [nameError, setNameError] = useState('');
    const [raceError, setRaceError] = useState('');
    const imagesRef = useRef('images');
    const toast = useToast();

    const handleSubmit = async () => {
        Keyboard.dismiss();

        const resn = namePet(name);
        const resr = RacePet(race);
        setNameError(resn);
        setRaceError(resr);

        if (resn || resr) return;

        setLoading(true);
        const res = await updatedDataPet({
            name, specie, race, birth, sex, castrated, lost, pet_id: data.pet_id, images
        }, api_token);

        setLoading(false);
        if (res !== 404 || res !== 500 || res !== 401) {
            saveUSER(res.data)
            navigation.navigate('HomeScreen');
            return toast.show("Los datos de tu mascota se actualizaron!", { type: 'success', duration: 4000, offset: 30, animationType: "slide-in" });
        }
    }

    const deleteItem = (item, index) => {
        if (index === images.length - 1) imagesRef.current.scrollToIndex({ Animated: false, index: images.length - 1 });
        setImages(deleteItemArr(images, item));
    };

    const selectImage = async () => {
        if (images.length >= 6) return toast.show("Solo se pueden subir 6 fotos!", { type: "custom", placement: "bottom", duration: 4000, offset: 30, animationType: "slide-in" });
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
            allowsMultipleSelection: true,
            base64: true,
            exif: true
        });


        if (!result.cancelled) {

            var arr = result.uri.split('/');
            var namefile = arr[arr.length - 1];

            setImages([...images, { name: namefile, url: result.uri, base64: result.base64 }]);
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
                onChangeText={text => setName(text)}
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
                onChangeText={text => setRace(text)}
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

            <SimpleTitle title='Fotos de tu mascota' />
            <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                <FlatList
                    style={{ marginTop: 10 }}
                    keyExtractor={(item) => item.url}
                    data={images}
                    horizontal
                    ref={imagesRef}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ marginHorizontal: 5 }}>
                                <Image source={{ uri: item.url }} style={Styles.Imageflat} />
                                {
                                    !loading ?
                                        <View style={{ position: 'absolute', top: 10, right: 10 }}>
                                            <TouchableOpacity onPress={() => deleteItem(item.url, index)}>
                                                <Icon
                                                    name='delete'
                                                    color='tomato'
                                                    size={25}
                                                />
                                            </TouchableOpacity>
                                        </View> : null
                                }
                            </View>
                        );
                    }}
                />
                {
                    !loading ?
                        <TouchableOpacity style={Styles.button} onPress={() => { selectImage() }}>
                            <MaterialIcon name='image-plus' size={25} color='#333' />
                        </TouchableOpacity> : null
                }
            </View>

            <View style={Styles.buttonContainer}>
                <TouchableOpacity disabled={loading} style={Styles.buttonSend} onPress={handleSubmit}>
                    <Text style={Styles.buttonText}>{!loading ? 'GUARDAR' : 'GUARDANDO...'}</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

export default EditUserProfile;

const Styles = StyleSheet.create({
    buttonSend: {
        backgroundColor: theme.colors.All,
        padding: 10,
        width: '100%',
        borderRadius: 10
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginTop: 5,
        marginBottom: 50,
        alignItems: 'center'
    },
    buttonText: {
        color: '#333',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '700'
    },
    Imageflat: {
        width: 200,
        height: 300,
        resizeMode: 'cover'
    },
    button: {
        padding: 10,
        borderRadius: 100,
        backgroundColor: theme.colors.All,
        width: 45,
        marginTop: 20
    },
});