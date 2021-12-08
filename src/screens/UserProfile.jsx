import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { theme } from '../core/theme';
import { nameStringPrayer, iconType } from '../core/utils';
import AuthContext from '../context/auth/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements'

const { height, width } = Dimensions.get('window');

const UserProfile = () => {
    const { user_data } = useContext(AuthContext);
    const [name, setName] = useState();



    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity /* onPress={() =>
                navigation.navigate('LostAnimalScreen', {
                    petId: item.pet_id,
                })} */>
                <View style={Styles.containerParent}>
                    <View style={Styles.container} >
                        <Image
                            source={iconType(item.specie)}
                            style={Styles.image}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                        <View style={Styles.containerInternal}>
                            <Text style={Styles.name}>{item.name}</Text>
                            <Text style={Styles.id}>#{item.pet_id}</Text>
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
        <View style={{ height: '100%' }}>
            <ImageBackground source={iconType('bg-image')} style={Styles.imageBg}></ImageBackground >
            <View style={Styles.card}>
                <Image
                    source={user_data.profile_photo_url ? { uri: user_data.profile_photo_url } : iconType('user-default')}
                    style={Styles.imgUser}
                />
                <View style={Styles.cardData}>
                    <Text numberOfLines={1} style={Styles.nameF}>{`${user_data.name} ${user_data.last_name1} ${user_data.last_name2}`}</Text>
                </View>
            </View>

            <View style={Styles.card2}>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <MaterialIcons size={25} name='email' style={{ marginRight: 10 }} />
                    <Text>{`${user_data.email}`}</Text>
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Ionicons size={25} name='phone-portrait-outline' style={{ marginRight: 10 }} />
                    <Text>{`${user_data.phone}`}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons size={25} name='location' style={{ marginRight: 10 }} />
                        <Text>{`${user_data.province ? user_data.province.name : 'Sin provincia'}`}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>{`${user_data.canton ? user_data.canton.name : 'Sin canton'}`}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>Dirección</Text>
                    <Text>{`${user_data.address ? user_data.address : 'Sin dirección'}`}</Text>
                </View>

                {
                    user_data.pet.length ?
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '700' }}>Mascotas {`(${user_data.pet.length})`}</Text>
                            <FlatList
                                data={user_data.pet}
                                renderItem={renderItem}
                                keyExtractor={item => item.pet_id}
                                showsVerticalScrollIndicator={false}
                                onEndReachedThreshold={0}
                            />
                        </View> :
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '700' }}>No tienes mascotas</Text>
                }
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
        alignItems: 'flex-start',
        height: '100%',
        marginTop: 15
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
        textTransform: 'capitalize'
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
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    id: {
        color: '#777',
        fontSize: 13,
        textTransform: 'uppercase'
    },
});


export default UserProfile;