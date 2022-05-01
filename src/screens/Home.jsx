import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, StyleSheet, FlatList, ActivityIndicator, RefreshControl, ScrollView as ViewScroll } from 'react-native';

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from 'react-native-elements'
import { Image } from 'react-native-elements';
import { ImageIcon, HeaderHome } from '../components';
import { iconType } from '../core/utils';
import { getAnimalsLost } from '../core/utils-http';

const Home = ({
    navigation
}) => {

    const [pets, setPets] = useState([]);
    const [nPets, setNpets] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [res, setRes] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(async () => {
        const res = await getAnimalsLost();

        if (res !== 500 || res !== 404) {

            setPets(res.data);
            setRes(true);
            setRefreshing(false);
        };
    }, [refreshing])

    const LoadMoreItems = () => {
        console.log('Load more')
    }

    const renderLoader = () => {
        return (
            isLoading ?
                <View style={styles.Loader}>
                    <ActivityIndicator size='large' color='#aaa' />
                </View>
                : null
        );
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() =>
                navigation.navigate('LostAnimalScreen', {
                    petId: item.pet_id,
                })}>
                <View style={styles.containerParent}>
                    <View style={styles.container} >

                        {
                            item.image_specie ?
                                <Image
                                    source={{ uri: item.image_specie.url }}
                                    style={styles.image}
                                    PlaceholderContent={<ActivityIndicator />}
                                />
                                :
                                <Image
                                    source={iconType(item.sex ? (item.sex + 0) : 'desconocido')}
                                    style={styles.image}
                                    PlaceholderContent={<ActivityIndicator />}
                                />
                        }

                        <View style={styles.containerInternal}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.id}>#{item.pet_id}</Text>
                        </View>
                    </View>
                    <Icon
                        name='chevron-right'
                        type='font-awesome'
                        size={10}
                    />
                </View>
            </TouchableOpacity >
        )
    }

    return (
        <View
            style={{ backgroundColor: 'white', height: '100%' }}>
            <HeaderHome navigation={navigation} Touch={() => { navigation.navigate('StackMenuMain') }} />
            {
                res ?
                    pets ?
                        pets.length > 0 ?
                            <FlatList
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true) }} />}
                                data={pets}
                                renderItem={renderItem}
                                keyExtractor={item => item.pet_id}
                                ListFooterComponent={renderLoader}
                                onEndReached={LoadMoreItems}
                                onEndReachedThreshold={0}
                            /> :
                            <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 50, fontWeight: '700', textAlign: 'center' }}>
                                    NO HAY ANIMALES PERDIDOS
                                </Text>
                                <ImageIcon source={iconType(`affection`)} styles={{ width: 100, height: 100 }} />
                            </View> : null
                    : <View style={{ justifyContent: 'center', height: '90%' }}>
                        <ActivityIndicator size="large" color="#333" />
                    </View>
            }
        </View>
    );
}


const styles = StyleSheet.create({
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
    image: {
        width: 50,
        height: 50,
        marginRight: 15,
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
    Loader: {
        marginVertical: 15,
        alignItems: 'center'
    },
    iconContainer: {
        backgroundColor: 'red',
    },
    icon: {
        color: '#777',
    }
})

export default Home;