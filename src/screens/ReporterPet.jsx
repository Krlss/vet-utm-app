import React, { useState, useContext, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import ReportContext from '../context/Report/ReportContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useToast } from "react-native-toast-notifications";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    FlatList,
    Image,
    ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements'
import { theme } from '../core/theme';

import { deleteItemArr } from '../core/utils';
import { reportPet } from '../core/utils-http';
import { TitleAndButton } from '../components/Index';


const ReporterPet = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [disabled, setDisable] = useState(false);

    const { ruser_data, ranimal_data, rsaveUSER, rsavePET } = useContext(ReportContext);

    const { name, user_id, last_name1, last_name2, email, phone, id_province, id_canton, address } = ruser_data;
    const { birth, sex, castrated, specie, race } = ranimal_data;

    const toast = useToast();

    const imagesRef = useRef('images');

    const deleteItem = (item, index) => {
        if (index === data.length - 1) imagesRef.current.scrollToIndex({ Animated: false, index: data.length - 1 });
        setData(deleteItemArr(data, item));
    };

    const selectImage = async () => {
        if (data.length >= 6) return toast.show("Solo se pueden subir 6 fotos!", {
            type: "custom",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in"
        });
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
        }

    }


    const handleSubmit = async ({ navigation }) => {
        setDisable(true);


        const res = await reportPet({
            user: {
                name, user_id, last_name1,
                last_name2, email, phone,
                id_province, id_canton, address
            },
            birth, sex, castrated, specie, race,
            namepet: ranimal_data.name, images: data
        });
        setDisable(false);

        if (res) {
            toast.show("El reporte fué enviado a un administrador, será revisado para ser publicadas.", {
                type: "success",
                placement: "bottom",
                duration: 4000,
                offset: 30,
                animationType: "slide-in"
            });
            setData([]);
            setDisable(false);
            rsaveUSER({
                user_id: null,
                name: null,
                last_name1: '',
                last_name2: '',
                email: null,
                phone: null,
                id_province: null,
                id_canton: null,
                address: null
            });
            rsavePET({
                name: null,
                birth: null,
                sex: null,
                castrated: null,
                specie: null,
                race: null,
            });
            navigation.navigate('HomeScreen');
        } else {
            toast.show("Al parecer hubo un error de conexión, intentalo más tarde.", {
                type: "danger",
                placement: "bottom",
                duration: 4000,
                offset: 30,
                animationType: "slide-in"
            });
            setDisable(false);
        }

    }


    return (
        <View style={styles.container}>
            <View>
                <TitleAndButton disabled={disabled} title='Datos del dueño' onPress={() => { navigation.navigate('UserReportDATA') }} />

                <TitleAndButton disabled={disabled} title='Datos de la mascota' onPress={() => { navigation.navigate('PetReportDATA') }} />

                {
                    data.length ?
                        <View style={{ paddingVertical: 25, marginTop: 15 }}>
                            <FlatList
                                keyExtractor={(item) => item.url}
                                data={data}
                                horizontal
                                ref={imagesRef}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={{ marginHorizontal: 5 }}>
                                            <Image source={{ uri: item.url }} style={styles.Imageflat} />
                                            {
                                                !disabled ?
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
                        </View> : null
                }
            </View>

            <View style={[styles.containerButton, { alignItems: disabled ? 'center' : null, left: disabled ? 0 : 10 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {
                        !disabled ?
                            <TouchableOpacity style={styles.button} onPress={() => { selectImage() }}>
                                <MaterialIcon name='image-plus' size={25} color='#333' />
                            </TouchableOpacity> : null
                    }

                    {
                        data.length > 0 &&
                            name && user_id && last_name1 && last_name2 &&
                            email && phone && id_province && id_canton && address && birth && sex && castrated && specie && race && ranimal_data.name
                            ?
                            < TouchableOpacity disabled={disabled ? true : false}
                                style={[styles.buttonSend, { opacity: disabled ? .8 : 1, backgroundColor: disabled ? 'transparent' : theme.colors.All }]}
                                onPress={handleSubmit}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.text}>
                                        {disabled ? 'Enviando el reporte' : <Ionicons name='ios-send' size={20} color='#333' />}
                                    </Text>
                                    {disabled ? <ActivityIndicator style={{ marginLeft: 5 }} size="small" color="#333" /> : null}
                                </View>
                            </TouchableOpacity> : null
                    }
                </View>
            </View>

        </View >
    );
};

export default ReporterPet;

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 100,
        backgroundColor: theme.colors.All
    },
    containerButton: {
        width: '100%',
        bottom: 20,
        paddingHorizontal: 20,
        position: 'absolute',
        elevation: 5,
        zIndex: 1
    },
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
    buttonSend: {
        marginLeft: 10,
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 20
    },
});