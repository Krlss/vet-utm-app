import React from 'react';

import { Image, StyleSheet } from 'react-native';

const ImageIcon = ({ source, styles }) => {
    return (
        source ?
            <Image
                style={!styles ? Styles.image : styles}
                source={source}
            /> : null
    );
}

export default ImageIcon;

const Styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        marginRight: 10
    },
});