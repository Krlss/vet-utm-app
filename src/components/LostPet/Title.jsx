import React from 'react';

import { Text, StyleSheet } from 'react-native';

const Title = ({ title }) => {
    return (
        title ?
            <Text style={Styles.text}>
                {title}
            </Text> : null
    );
}

export default Title;

const Styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#777'
    }
});