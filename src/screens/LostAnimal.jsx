import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Dimensions, Animated, ActivityIndicator, Text } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { iconType, nameStringPrayer, birthToAge, sexAnimal, castratedAnimal } from '../core/utils';
import { getOneAnimalLost } from '../core/utils-http';
import { HeaderLostPet, Title, RowComponent, Value, Component, ViewSpacing } from '../components';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width;
const ITEM_HEIHT = height * .80;
const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const PetProfile = ({
    route,
    navigation
}) => {

    const { petId } = route.params;
    const [petProfile, setPetProfile] = useState();
    const [images, setImages] = useState([]);

    useEffect(async () => {
        const res = await getOneAnimalLost(petId);
        if (res !== 500 || res != 404) {
            setPetProfile(res.data.pet)
            setImages(res.data.images);
        }
    }, [])

    const ScrollY = React.useRef(new Animated.Value(0)).current;

    return (
        petProfile ?
            <View style={Styles.container}>
                {
                    images.length ?
                        <View style={Styles.ImagesContainer}>
                            <Animated.FlatList
                                data={images}
                                KeyExtractor={(item) => item.id}
                                snapToInterval={ITEM_HEIHT}
                                decelerationRate='fast'
                                showsVerticalScrollIndicator={false}
                                bounces={false}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: ScrollY } } }],
                                    { useNativeDriver: true }
                                )}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            <Image source={{ uri: item.url }} style={Styles.Imageflat} />
                                        </View>
                                    );
                                }}
                            />
                            <View style={Styles.pagination}>
                                {
                                    images.map((_, index) => {
                                        return (
                                            <Animated.View
                                                key={index}
                                                style={Styles.dot} />
                                        );
                                    })
                                }
                                <Animated.View style={[Styles.dotIndicator, {
                                    transform: [{
                                        translateY: Animated.divide(ScrollY, ITEM_HEIHT).interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, DOT_INDICATOR_SIZE]
                                        })
                                    }]
                                }]} />
                            </View>
                        </View>
                        :
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <Text style={{ fontSize: 30, textTransform: 'uppercase', textAlign: 'center', fontWeight: '700' }}>
                                No tiene fotos
                            </Text>
                        </View>
                }
                <BottomSheet
                    initialSnapIndex={0}
                    snapPoints={[height - ITEM_HEIHT, height * .65]}
                >
                    <BottomSheetScrollView>
                        <View style={{ flexDirection: 'column', padding: 40 }}>

                            <HeaderLostPet
                                name={petProfile.name}
                                id={petProfile.pet_id}
                            />
                            {/* Raza + edad (una fila) */}

                            <RowComponent>

                                {
                                    petProfile.image_specie ?
                                        <Component
                                            flex={{ flex: 2 }}
                                            uri={{ uri: petProfile.image_specie }}
                                            title='Raza'
                                            value={nameStringPrayer(petProfile.race.name)}
                                        /> :
                                        <Component
                                            flex={{ flex: 2 }}
                                            source={iconType(petProfile.sex ? (petProfile.sex + 0) : 'desconocido')}
                                            title='Raza'
                                            value={nameStringPrayer(petProfile.race ? petProfile.race.name : 'Desconocida')}
                                        />
                                }

                                {petProfile.birth ?
                                    <Component
                                        flex={{ flex: 1 }}
                                        title='Edad'
                                        value={birthToAge(petProfile.birth)}
                                    /> : null
                                }
                            </RowComponent>

                            {
                                <RowComponent>
                                    {petProfile.sex ?
                                        <Component
                                            flex={{ flex: 2 }}
                                            source={iconType(petProfile.sex)}
                                            title='Género'
                                            truncate={true}
                                            value={sexAnimal(petProfile.sex)}
                                        /> :
                                        <Component
                                            flex={{ flex: 2 }}
                                            source={iconType('sexo')}
                                            title='Género'
                                            truncate={true}
                                            value='Desconocido'
                                        />
                                    }
                                    <Component
                                        flex={{ flex: 1 }}
                                        title='Estado'
                                        value={castratedAnimal(petProfile.castrated)}
                                    />
                                </RowComponent>
                            }
                            {petProfile.user_id ?
                                <RowComponent>
                                    <Component
                                        flex={{ flex: 1 }}
                                        source={iconType('owner_pet')}
                                        title='Dueño'
                                        values={[
                                            `${nameStringPrayer(petProfile.user.name)} ${nameStringPrayer(petProfile.user.last_name1)} ${nameStringPrayer(petProfile.user.last_name2)}`,
                                            petProfile.user.email,
                                            petProfile.user.canton ? nameStringPrayer(petProfile.user.canton.name) : null
                                        ]}
                                    />
                                </RowComponent> :
                                <View style={{ alignItems: 'center', marginTop: 10 }}>
                                    <Text style={{ fontWeight: '700', fontSize: 20 }}>Sin dueño</Text>
                                </View>
                            }


                            {
                                petProfile.description ?
                                    <>
                                        <Title title='Descripción' />
                                        <Value value={nameStringPrayer(petProfile.description)} />
                                    </> : null
                            }
                        </View>
                    </BottomSheetScrollView>
                </BottomSheet>
            </View > : null
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
    Imageflat: {
        width: ITEM_WIDTH,
        height: ITEM_HEIHT,
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

export default PetProfile;