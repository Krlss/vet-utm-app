import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { iconType } from '../core/utils';
import { theme } from '../core/theme';

const UserProfile = () => {
    return (
        <View style={Styles.container}>
            <View style={Styles.containerImgUser}>
                <Image
                    source={iconType('user-default')}
                    style={Styles.imgUser}
                />
            </View>
            <Text>Carlos Pico</Text>
        </View>
    );
}


const Styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 15,
        marginTop: 20
    },
    imgUser: {
        width: 100,
        height: 100,
    },
    containerImgUser: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 200,
        width: 100,
        height: 100,
    }
});


export default UserProfile;