import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { iconType } from '../core/utils';
const Logo = () => (
    <Image source={iconType('logo')} style={styles.image} />
);

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 128,
        marginBottom: 12
    },
});

export default memo(Logo);