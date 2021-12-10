import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, ImageBackground, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { theme } from '../core/theme';
import { iconType, birthToAge, nameStringPrayer, sexAnimal, castratedAnimal } from '../core/utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { RowComponent, Component, ViewSpacing } from '../components';

import { updatedDataPet } from '../core/utils-http';

const { width, height } = Dimensions.get('screen');

const PetProfile = ({ navigation, route }) => {

    const { pet_id, name, birth, sex, specie,
        castrated, race, lost, n_lost, images } = route.params.pet;

    const [loading, setLoading] = useState(false);

    const deletePet = (data, token, navigation) =>
        Alert.alert(
            "¿Estás seguro que deseas eliminar a tu mascota de tu perfil?",
            "Una vez eliminada la mascota de tu perfil, si deseas recuperarla deberás ponerte en contacto con la clínica veterinaria de la universidad técnica de manabí.",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Si", onPress: async () => {
                        setLoading(true);
                        const res = await updatedDataPet(data, token);
                        if (res !== 400 || res !== 500 || res !== 401) navigation.navigate('HomeScreen');
                        if (res === 400 || res === 500 || res === 401) setLoading(false);
                    }
                }
            ]
        );

    const changeOwner = (data, token, navigation) =>
        Alert.alert(
            "¿Estás seguro que deseas cambiar de dueño a tu mascota?",
            "Una vez cambies de dueño a tu mascota, solo te la puede devolver el dueño destinario o puedes ponerte en contacto con la clínica veterinaria de la universidad técnica de manabí.",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Si", onPress: () => {
                        navigation.navigate('ChangeOwner', {
                            data,
                            token
                        });
                    }
                }
            ]
        );

    return (
        <View style={{ height: '100%' }}>

            <View style={Styles.backButton}>
                <TouchableOpacity disabled={loading} onPress={() => { navigation.pop() }} >
                    <Ionicons name='ios-arrow-back-sharp' size={25} color='#333' />
                </TouchableOpacity>
            </View>

            <ImageBackground source={iconType('bg-image')} style={Styles.imageBg}></ImageBackground >
            <View style={Styles.card}>
                {
                    loading ?
                        <ActivityIndicator style={Styles.imgUser} size='large' /> :
                        <Image
                            source={iconType(specie)}
                            style={Styles.imgUser}
                        />
                }
                <View style={Styles.cardData}>
                    <Text numberOfLines={1} style={Styles.nameF}>{name}</Text>
                    <Text numberOfLines={1} style={Styles.id}>{pet_id}</Text>
                </View>

                <TouchableOpacity disabled={loading} style={Styles.edit} onPress={() => {
                    navigation.navigate('EditPetProfile', {
                        data: route.params.pet,
                        api_token: route.params.api_token
                    })
                }}>
                    <FontAwesome5 name='user-edit' size={20} color='#333' />
                </TouchableOpacity>

                <TouchableOpacity disabled={loading} style={Styles.changeOwner} onPress={() =>
                    changeOwner({ pet_id, name }, route.params.api_token, navigation)}>
                    <FontAwesome5 name='exchange-alt' size={25} color='#333' />
                </TouchableOpacity>

                <TouchableOpacity disabled={loading} style={Styles.deletePet} onPress={() =>
                    deletePet({ pet_id, user_id: null }, route.params.api_token, navigation)}>
                    <MaterialCommunityIcons name='delete-alert-outline' size={25} color='#333' />
                </TouchableOpacity>
            </View>


            <ScrollView style={Styles.card2} showsVerticalScrollIndicator={false}>

                {
                    specie || race || birth ?
                        <RowComponent>
                            {specie && race ?
                                <Component
                                    flex={{ flex: 2 }}
                                    source={iconType(specie)}
                                    title='Raza'
                                    value={nameStringPrayer(race)}
                                /> : <ViewSpacing />
                            }
                            {birth ?
                                <Component
                                    flex={{ flex: 1 }}
                                    title='Edad'
                                    value={birthToAge(birth)}
                                /> : null
                            }
                        </RowComponent> : null
                }


                <RowComponent>
                    <Component
                        flex={{ flex: 2 }}
                        source={iconType(sex)}
                        title='Género'
                        truncate={true}
                        value={sexAnimal(sex)}
                    />
                    <Component
                        flex={{ flex: 1 }}
                        title='Estado'
                        value={castratedAnimal(castrated)}
                    />
                </RowComponent>

                <RowComponent>
                    <Component
                        flex={{ flex: 2 }}
                        source={iconType('lost')}
                        title='Perdido'
                        truncate={true}
                        value={lost ? 'Si' : 'No'}
                    />
                </RowComponent>

                <RowComponent>
                    <Component
                        flex={{ flex: 1 }}
                        title='Cantidad de veces perdido'
                        value={n_lost ? n_lost : 'Ninguna'}
                    />
                </RowComponent>

                {
                    images.length ?
                        <View style={{ paddingVertical: 10 }}>
                            <Component
                                flex={{ flex: 1 }}
                                title='Fotos de tu mascota'
                            />
                            <FlatList
                                keyExtractor={(item) => item.url}
                                data={images}
                                horizontal
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={{ marginHorizontal: 5 }}>
                                            <Image source={{ uri: item.url }} style={Styles.Imageflat} />
                                        </View>
                                    );
                                }}
                            />
                        </View> : <Component
                            flex={{ flex: 1 }}
                            title='Tu mascota no tiene fotos'
                            value='Edita su perfil para agregar fotos, solo se pueden 6'
                        />
                }


            </ScrollView>


        </View>
    );
}


const Styles = StyleSheet.create({
    imageBg: {
        height: 175,
        backgroundColor: theme.colors.All,
        overflow: 'hidden'
    },
    card: {
        flexDirection: 'column',
        marginTop: -100,
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 15,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        elevation: 2,
        paddingVertical: 20
    },
    card2: {
        flexDirection: 'column',
        marginTop: 20,
        marginHorizontal: 20,
        flex: 1
    },
    cardData: {
        flex: 1,
        alignItems: 'center',
        height: '100%',
        marginTop: 15,
    },
    imgUser: {
        width: 75,
        height: 75,
        borderRadius: 50,
        borderColor: '#DCDCDC',
        borderWidth: 1
    },
    nameF: {
        fontSize: 15,
        fontWeight: '600',
        overflow: 'hidden',
        textTransform: 'uppercase'
    },
    containerParent: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 15,
        flex: 1,
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
        flex: 1,
    },
    containerInternal: {
        justifyContent: 'space-around'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    id: {
        color: '#777',
        fontSize: 13,
        textTransform: 'uppercase'
    },
    edit: {
        position: 'absolute',
        top: 10,
        right: 7
    },
    backButton: {
        position: 'absolute',
        top: height * .02,
        left: width * .04,
        zIndex: 10
    },
    deletePet: {
        position: 'absolute',
        bottom: 10,
        right: 7
    },
    changeOwner: {
        position: 'absolute',
        bottom: 50,
        right: 7
    },
    Imageflat: {
        width: 200,
        height: 300,
        resizeMode: 'cover'
    },
});

export default PetProfile;