import React, { useState, useEffect, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import ReportContext from '../context/Report/ReportContext';

import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
    FlatList,
    Image
} from 'react-native';
import { Icon } from 'react-native-elements'

import { deleteItemArr, deleteSpace } from '../core/utils';
import { ItemList, TitleAndButton, Title, Value } from '../components';


const ReporterPet = ({ navigation }) => {
    const [data, setData] = useState([]);

    const { user_data } = useContext(ReportContext);

    useEffect(async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Lo siento, necesitas dar permisos para que esto funcione!');
            }
        }
    })

    const deleteItem = (item, index) => {
        setData(deleteItemArr(data, item));
    };

    const selectImage = async () => {
        if (data.length >= 5) return alert('Solo se pueden subir 5 fotos!')
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setData([...data, { uri: result.uri }]);
        }

        console.log(data)

    }

    return (
        <View style={styles.container}>
            <View>
                <TitleAndButton title='Datos del dueño' optional='Opcional' onPress={() => {
                    navigation.navigate('userReportDATA')
                }}>

                    {/* {user_data.userID ?
                        (<>
                            <Title title='Cedula o RUC' />
                            <Value value={user_data.userID} />
                        </>) : null}

                    {user_data.first_name || user_data.last_name ?
                        (<>
                            <Title title='Nombre' />
                            <Value value={deleteSpace(`${user_data.last_name ? user_data.last_name : ''} ${user_data.first_name ? user_data.first_name : ''}`).toUpperCase()} />
                        </>) : null}

                    {user_data.email ?
                        (<>
                            <Title title='Correo electrónico' />
                            <Value value={user_data.email} />
                        </>) : null}

                    {user_data.phone ?
                        (<>
                            <Title title='Número telefónico' />
                            <Value value={user_data.phone} />
                        </>) : null} */}


                </TitleAndButton>

                <TitleAndButton title='Datos del animal' optional='Algunos obligatorios' onPress={() => {
                    navigation.navigate('petReportDATA')
                }} />

                {
                    data.length > 0 ?
                        <View style={{ paddingVertical: 25, backgroundColor: '#DCDCDC', marginTop: 50 }}>
                            <FlatList
                                keyExtractor={(item) => item.uri}
                                data={data}
                                horizontal
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ marginHorizontal: 5 }}>
                                            <Image source={{ uri: item.uri }} style={styles.Imageflat} />
                                            <View style={{ position: 'absolute', top: 10, right: 10 }}>
                                                <TouchableOpacity onPress={() => deleteItem(item.uri)}>
                                                    <Icon
                                                        name='delete'
                                                        color='tomato'
                                                        size={25}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    );
                                }}
                            />
                        </View> : null
                }
            </View>

            <View style={styles.addImage}>
                <TouchableOpacity style={styles.buttonAdd} onPress={selectImage} >
                    <Icon
                        name='image'
                        color='white'
                        size={25}
                    />
                </TouchableOpacity>
            </View>

        </View >
    );
};

export default ReporterPet;

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    item: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    delete: {
        position: 'absolute',
        top: 25,
        right: 25,
        elevation: 2
    },
    addImage: {
        position: 'absolute',
        bottom: 25,
        left: 25
    },
    buttonAdd: {
        backgroundColor: '#FF8C00',
        height: 50,
        width: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Imageflat: {
        width: 200,
        height: 300,
        resizeMode: 'cover'
    },
});