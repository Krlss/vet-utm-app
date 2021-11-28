import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, StyleSheet, FlatList } from 'react-native';

import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from 'react-native-elements'
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { ImageIcon, HeaderHome } from '../components';
import { iconType } from '../core/utils';

const Home = ({
    navigation
}) => {

    const [pets, setPets] = useState([]);
    const [nPets, setNpets] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const getPets = () => {
        try {
            axios.get(`http://192.168.100.101:5000/api/pets`).then(res => {
                setNpets(res.data.count);
                setPets(res.data.pets);
            }).catch(e => {
                console.log(e);
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPets();
    }, [])

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
            <TouchableOpacity delayLongPress={true} onPress={() =>
                navigation.navigate('LostAnimalScreen', {
                    petId: item.id,
                })}>
                <View style={styles.containerParent}>
                    <View style={styles.container} >
                        <Image
                            source={{ uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/puddin-animals-to-follow-on-instagram-1568303702.jpg' }}
                            style={styles.image}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                        <View style={styles.containerInternal}>
                            <Text style={styles.name}>{`${item.name}`}</Text>
                            <Text style={styles.id}>#{item.id}</Text>
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
        <View>
            <HeaderHome navigation={navigation} Touch={() => { navigation.navigate('StackMenuMain') }} />
            {
                pets.length > 0 ?
                    <FlatList
                        data={pets}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListFooterComponent={renderLoader}
                        onEndReached={LoadMoreItems}
                        onEndReachedThreshold={0}
                    /> :
                    <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 50, fontWeight: '700', textAlign: 'center' }}>
                            NO HAY ANIMALES PERDIDOS
                        </Text>
                        <ImageIcon source={iconType(`affection`)} styles={{ width: 100, height: 100 }} />
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
        borderRadius: 400 / 2,
    },
    containerInternal: {
        justifyContent: 'space-around'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    id: {
        color: '#777',
        fontSize: 13,
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