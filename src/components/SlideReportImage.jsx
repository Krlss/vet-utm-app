/* import React from 'react';
import { ParallaxImage } from 'react-native-snap-carousel';

import {
    View,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const SlideRepor = ({ item, index }, parallaxProps) => {
    return (
        <View style={styles.item}>
            <ParallaxImage
                source={{ uri: item.uri }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}
                {...parallaxProps}
            />
        </View>
    );
}

export default SlideRepor;

const styles = StyleSheet.create({
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
}); */