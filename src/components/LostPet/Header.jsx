import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const HeaderLostPet = ({ name, id }) => {
    return (
        <View style={{ marginBottom: 20 }}>
            {
                name ?
                    <Text style={Styles.name}>
                        {`${name}`.toUpperCase()}
                    </Text> : null
            }
            {
                id ?
                    <Text style={Styles.id}>
                        {`#${id}`.toUpperCase()}
                    </Text> : null
            }
        </View>
    );
}

const Styles = StyleSheet.create({
    name: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    id: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#777'
    },
});

export default HeaderLostPet;