import React, { useRef, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

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

import { deleteItemArr } from '../core/utils';
import { ItemList, TitleAndButton } from '../components';

const images = [
    { uri: 'https://i.imgur.com/UYiroysl.jpg', },
    { uri: 'https://i.imgur.com/UPrs1EWl.jpg', },
    { uri: 'https://i.imgur.com/MABUbpDl.jpg', },
    { uri: 'https://i.imgur.com/KZsmUi2l.jpg', },
    { uri: 'https://i.imgur.com/2nCt3Sbl.jpg', },
];
const { width: screenWidth } = Dimensions.get('window');


const ReporterPet = ({ navigation }) => {
    const [data, setData] = useState([]);
    const carouselRef = useRef(null);

    useEffect(async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Lo siento, necesitas dar permisos para que esto funcione!');
            }
        }
    })

    const deleteItem = (item, index) => {
        index === 0 && carouselRef == null;
        index === data.length - 1 && carouselRef.current.snapToNext();
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


                <TitleAndButton title='Datos del dueño' optional='Opcional' onPress={() => {navigation.navigate('userReportDATA')}} />
                <TitleAndButton title='Datos del animal' optional='Algunos obligatorios' onPress={() => {navigation.navigate('petReportDATA')}} />

                <View style={{ paddingVertical: 25, backgroundColor: '#333' }}>
                    <FlatList
                        keyExtractor={(item) => item.uri}
                        data={images}
                        horizontal
                        renderItem={({ item }) => {
                            return (
                                <View style={{ marginHorizontal: 10 }}>
                                    <Image source={{ uri: item.uri }} style={styles.Imageflat} />
                                </View>
                            );
                        }}
                    />
                </View>
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
        backgroundColor: '#333',
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