import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Dimensions, TouchableOpacity, Text, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { deleteItemArr } from '../core/utils';
import { Icon } from 'react-native-elements'
import { createLostPetunknown } from '../core/utils-http';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width;
const ITEM_HEIHT = height * .80;
const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const ReporterPetUnknown = () => {

    const [images, setImages] = useState([]);
    const [disabled, setDisable] = useState(false);

    useEffect(async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Lo siento, necesitas dar permisos para que esto funcione!');
            }
        }
    })

    const deleteItem = (item, index) => {
        setImages(deleteItemArr(images, item));
    };


    const handleSubmit = async () => {
        setDisable(true);
        const res = await createLostPetunknown(images);
        console.log(res)
        if (res) {
            alert('Se envió el reporte correctamente.')
            setImages([]);
            setDisable(false);
        } else {
            alert('Hubo un error de conexión!')
            setDisable(false);
        }
    }


    const selectImage = async () => {
        if (images.length >= 6) return alert('Solo se pueden subir 6 fotos!')
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
            setImages([...images, { name: namefile, uri: result.uri, base64: result.base64 }]);
        }
    }

    return (
        <View style={Styles.container}>
            {
                images.length ?
                    <View style={Styles.ImagesContainer}>
                        <FlatList
                            data={images}
                            keyExtractor={(item, index) => item.uri.toString()}
                            snapToInterval={width}
                            decelerationRate='fast'
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ padding: 1 }}>
                                        <Image source={{ uri: item.uri }} style={Styles.Imageflat} />
                                        <View style={{ position: 'absolute', bottom: 20, right: 15 }}>
                                            {
                                                !disabled ?
                                                    <TouchableOpacity onPress={() => deleteItem(item.uri)}>
                                                        <Icon
                                                            name='delete'
                                                            color='tomato'
                                                            size={25}
                                                        />
                                                    </TouchableOpacity> : null
                                            }
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View> : null
            }

            <View style={Styles.containerButton}>
                <View style={{ flexDirection: 'row' }}>
                    {
                        !disabled ?
                            <TouchableOpacity style={Styles.button} onPress={() => { selectImage() }}>
                                <Text style={Styles.text}>
                                    Seleccionar fotos
                                </Text>
                            </TouchableOpacity> : null
                    }

                    {
                        images.length > 0 ?
                            < TouchableOpacity disabled={disabled ? true : false}
                                style={[Styles.button, { opacity: disabled ? .5 : 1 }]}
                                onPress={handleSubmit}>
                                <Text style={Styles.text}>
                                    {disabled ? 'Enviando las fotos...' : 'Enviar'}
                                </Text>
                            </TouchableOpacity> : null
                    }
                </View>
            </View>
        </View >
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    ImagesContainer: {
        height: ITEM_HEIHT,
        overflow: 'hidden'
    },
    containerButton: {
        width: '100%',
        position: 'absolute',
        bottom: 20,
        paddingHorizontal: 20,
    },
    button: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF8C00',
        marginHorizontal: 2
    },
    text: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: 'white'
    },
    Imageflat: {
        width: width / 2,
        height: ITEM_HEIHT / 3,
        resizeMode: 'cover'
    },
    pagination: {
        position: 'absolute',
        top: ITEM_HEIHT / 2,
        left: 20
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE,
        backgroundColor: '#333',
        marginBottom: DOT_SPACING
    },
    dotIndicator: {
        width: DOT_INDICATOR_SIZE,
        height: DOT_INDICATOR_SIZE,
        backgroundColor: '#333',
        borderRadius: 100,
        position: 'absolute',
        top: -DOT_SIZE / 2,
        left: -DOT_SIZE / 2
    },
    containerName: {
        position: 'absolute',
        top: ITEM_HEIHT * .75,
        left: ITEM_WIDTH / 10,
        backgroundColor: '#FF6347',
        padding: 10,
        borderRadius: 20,
        maxWidth: 250,
    },
    nameText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18
    },
    imageSpecie: {
        width: 40,
        height: 40,
    },
    containerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginRight: 100,
    },
    containerImage: {
        marginRight: 15
    }
});

export default ReporterPetUnknown;