import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { theme } from '../core/theme';
import { nameStringPrayer, iconType } from '../core/utils';
import AuthContext from '../context/auth/AuthContext';

const { height, width } = Dimensions.get('window');

const UserProfile = () => {
    const { user_data } = useContext(AuthContext);
    const [name, setName] = useState(/* user_data.name.split(' ') */);
    return (
        <View style={{ height: '100%' }}>
            <ImageBackground source={iconType('bg-image')} style={Styles.imageBg}></ImageBackground >
            <View style={Styles.card}>
                <Image
                    source={user_data.profile_photo_url ? user_data.profile_photo_url : iconType('user-default')}
                    style={Styles.imgUser}
                />
                <View style={Styles.cardData}>
                    <Text>Carlos Pico</Text>
                    <Text>Carlos Pico</Text>
                    <Text>Carlos Pico</Text>
                </View>
            </View>


        </View>

        /*  <View style={Styles.container}>
             <View style={Styles.containerImgUser}>
                 <Image
                     source={user_data.profile_photo_url ? user_data.profile_photo_url : iconType('user-default')}
                     style={Styles.imgUser}
                 />
             </View>
             <Text style={Styles.nameF}>{nameStringPrayer(name[0])}</Text>
         </View> */
    );
}


const Styles = StyleSheet.create({
    imageBg: {
        height: height * 0.3,
        backgroundColor: theme.colors.All
    },
    card: {
        flexDirection: 'row',
        marginTop: -100,
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 50,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        elevation: 10,
    },
    cardData: {
        flex: 2,
        marginLeft: 20,
        alignItems: 'flex-start',
        height: '100%',
        paddingVertical: 20
    },
    imgUser: {
        width: 120,
        height: 120,
        flex: 1
    },
    nameF: {
        marginTop: 5,
        fontSize: 15,
        fontWeight: 'bold'
    }
});


export default UserProfile;