import React, { useState, useEffect, useContext, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import ReportContext from '../context/Report/ReportContext';

import axios from 'axios';

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
import { theme } from '../core/theme';

import { deleteItemArr, deleteSpace } from '../core/utils';
import { ItemList, TitleAndButton, Title, Value } from '../components';


const ReporterPet = ({ navigation }) => {
    const [data, setData] = useState([]);

    const { user_data } = useContext(ReportContext);
    const imagesRef = useRef('images');

    useEffect(async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Lo siento, necesitas dar permisos para que esto funcione!');
            }
        }
    })

    const deleteItem = (item, index) => {
        if (index === data.length - 1) imagesRef.current.scrollToIndex({ Animated: false, index: data.length - 1 });
        setData(deleteItemArr(data, item));
    };

    const selectImage = async () => {
        if (data.length >= 6) return alert('Solo se pueden subir 6 fotos!')
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

            setData([...data, { name: namefile, url: result.uri, base64: result.base64 }]);

            axios.post('http://192.168.100.101:5000/api/pets/createLostPet', {
                images: data
            }).then(res => {
                console.log(res);
            }).catch(e => {
                console.log(e);
            })
        }

    }

    return (
        <View style={styles.container}>
            <View>
                <TitleAndButton title='Datos del dueño' onPress={() => { navigation.navigate('userReportDATA') }} />

                <TitleAndButton title='Datos de la mascota' onPress={() => { navigation.navigate('petReportDATA') }} />

                {
                    data.length ?
                        <View style={{ paddingVertical: 25, backgroundColor: '#DCDCDC', marginTop: 50 }}>
                            <FlatList
                                keyExtractor={(item) => item.url}
                                data={data}
                                horizontal
                                ref={imagesRef}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={{ marginHorizontal: 5 }}>
                                            <Image source={{ uri: item.url }} style={styles.Imageflat} />
                                            <View style={{ position: 'absolute', top: 10, right: 10 }}>
                                                <TouchableOpacity onPress={() => deleteItem(item.url, index)}>
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
                        color='#333'
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
        backgroundColor: theme.colors.All,
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