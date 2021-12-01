import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import { iconType } from '../core/utils';
import ImageIcon from '../components/LostPet/ImageIcon';
import { theme } from '../core/theme';
const HeaderHome = ({ Touch, back }) => {

    return (
        <View style={back ? Styles.containerBack : Styles.container} >
            <View style={Styles.containerLogo}>
                <ImageIcon source={iconType('logo')} styles={Styles.Logo} />
                {/* <Text style={Styles.textLogo}>
                    Clínica Veterinaria
                </Text> */}
            </View>

            {
                Touch ?
                    <TouchableOpacity onPress={Touch} >
                        <Icon name='menu' size={25} color='#333' />
                    </TouchableOpacity> : null
            }

            {/* {
                Touch ?
                    <TouchableOpacity onPress={() => { navigation.navigate('SettingsScreen') }} >
                        <Icon name='menu' size={25} color='#333' />
                    </TouchableOpacity> : null
            } */}

        </View>
    );
}


const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        backgroundColor: theme.colors.All,
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3
    },
    containerBack: {
        paddingRight: 25,
        paddingLeft: 50,
        paddingVertical: 25,
        flexDirection: 'row',
        backgroundColor: '#FFA500',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textLogo: {
        fontSize: 20,
        width: 120,
        fontWeight: '700',
        textAlign: 'justify'
    },
    containerLogo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    Logo: {
        width: 55,
        height: 55,
        marginRight: 5
    }
});


export default HeaderHome;