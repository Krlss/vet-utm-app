import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { theme } from '../core/theme';
import { iconType, birthToAge, nameStringPrayer, sexAnimal, castratedAnimal } from '../core/utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { HeaderLostPet, Title, RowComponent, Value, Component, ViewSpacing } from '../components';

const { width, height } = Dimensions.get('screen');

const PetProfile = ({ navigation, route }) => {

    const { pet_id, name, birth, sex, specie,
        castrated, race, lost, n_lost } = route.params.pet;

    return (
        <View style={{ height: '100%' }}>

            <View style={Styles.backButton}>
                <TouchableOpacity onPress={() => { navigation.pop() }} >
                    <Ionicons name='ios-arrow-back-sharp' size={25} color='#333' />
                </TouchableOpacity>
            </View>

            <ImageBackground source={iconType('bg-image')} style={Styles.imageBg}></ImageBackground >
            <View style={Styles.card}>
                <Image
                    source={iconType(specie)}
                    style={Styles.imgUser}
                />
                <View style={Styles.cardData}>
                    <Text numberOfLines={1} style={Styles.nameF}>{name}</Text>
                    <Text numberOfLines={1} style={Styles.id}>{pet_id}</Text>
                </View>

                <TouchableOpacity style={Styles.edit} onPress={() => { navigation.navigate('EditPetProfile', {
                    data: route.params.pet
                }) }}>
                    <FontAwesome5 name='user-edit' size={20} color='#333' />
                </TouchableOpacity>
            </View>

            <View style={Styles.card2}>

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
                        value={n_lost}
                    />
                </RowComponent>

            </View>


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
    }
});

export default PetProfile;