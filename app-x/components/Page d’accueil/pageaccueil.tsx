import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as Linking from 'expo-linking';

const TwitterPostBar = () => {
    const [tweet, setTweet] = useState('');

    const postToTwitter = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
        Linking.openURL(twitterUrl)
            .catch(() => {
                Alert.alert('Error', 'Unable to open Twitter');
            });
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="What's happening?"
                    value={tweet}
                    onChangeText={setTweet}
                    multiline={false}
                    placeholderTextColor="#666"
                />
                <View style={styles.buttonContainer}>
                    <Button title="Tweet" onPress={postToTwitter} color="#1DA1F2" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 90, // Déplace la barre de 3 cm plus bas
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        width: "90%",
        maxWidth: 450,
        alignSelf: "center",
        height: 40, // Ajustement pour plus de confort
        borderColor: "#888", // Gris neutre
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#A9A9A9", // Gris marqué
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    input: {
        flex: 1,
        borderWidth: 0,
        paddingHorizontal: 8,
        fontSize: 14,
        minHeight: 36,
        backgroundColor: "#C0C0C0",
        borderRadius: 5,
    },
    buttonContainer: {
        marginLeft: 6,
    },
});

export default TwitterPostBar;