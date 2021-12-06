import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Dimensions, Animated, ActivityIndicator } from 'react-native';
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
            setPetProfile(res.data)
            /* setImages(res.images); */
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
                        </View> : null
                }
                <BottomSheet
                    initialSnapIndex={0}
                    snapPoints={[height - ITEM_HEIHT, height]}
                >
                    <BottomSheetScrollView>
                        <View style={{ flexDirection: 'column', padding: 40 }}>

                            <HeaderLostPet
                                name={petProfile.name}
                                id={petProfile.pet_id}
                            />
                            {/* Raza + edad (una fila) */}
                            {
                                petProfile.specie || petProfile.race || petProfile.birth ?
                                    <RowComponent>
                                        {petProfile.specie && petProfile.race ?
                                            <Component
                                                flex={{ flex: 2 }}
                                                source={iconType(petProfile.specie)}
                                                title='Raza'
                                                value={nameStringPrayer(petProfile.race)}
                                            /> : <ViewSpacing />
                                        }
                                        {petProfile.birth ?
                                            <Component
                                                flex={{ flex: 1 }}
                                                title='Edad'
                                                value={birthToAge(petProfile.birth)}
                                            /> : null
                                        }
                                    </RowComponent> : null
                            }

                            {
                                petProfile.sex || petProfile.castrated ?
                                    <RowComponent>
                                        {petProfile.sex ?
                                            <Component
                                                flex={{ flex: 2 }}
                                                source={iconType(petProfile.sex)}
                                                title='Género'
                                                truncate={true}
                                                value={sexAnimal(petProfile.sex)}
                                            /> : <ViewSpacing />
                                        }
                                        {petProfile.castrated ?
                                            <Component
                                                flex={{ flex: 1 }}
                                                title='Estado'
                                                value={castratedAnimal(petProfile.castrated)}
                                            /> : null
                                        }
                                    </RowComponent> : null
                            }
                            {petProfile.user ?
                                <RowComponent>
                                    <Component
                                        flex={{ flex: 1 }}
                                        source={iconType('owner_pet')}
                                        title='Dueño'
                                        values={[
                                            `${nameStringPrayer(petProfile.user.first_name)} ${nameStringPrayer(petProfile.user.last_name)}`,
                                            petProfile.user.email,
                                            nameStringPrayer(petProfile.user.canton.name)
                                        ]}
                                    />
                                </RowComponent> : null
                            }


                            {
                                petProfile.description ?
                                    <>
                                        <Title title='Descripción' />
                                        <Value value={nameStringPrayer(petProfile.description)} />
                                    </> : null
                            }
                            <Title title='Última vez visto' />
                            <Value value={nameStringPrayer('It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).')} />

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