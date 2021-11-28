import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
    <Image source={{
        uri: 'https://i.pinimg.com/originals/96/de/6f/96de6fd0e1a27ce1840eaf5430b7155c.png'
    }} style={styles.image} />
);

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 128,
        marginBottom: 12,
        borderRadius: 200
    },
});

export default memo(Logo);