import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';

interface PostFormProps {
    onSubmit: (content: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
    const [content, setContent] = useState('');
    const [notification, setNotification] = useState<{ type: string, message: string } | null>(null);

    const showNotification = (type: string, message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSubmit = () => {
        if (!content.trim()) return;
        
        onSubmit(content.trim());
        setContent('');
        showNotification('success', 'Post publié avec succès !');
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={content}
                    onChangeText={setContent}
                    style={styles.input}
                    placeholder="Quoi de neuf ?"
                    placeholderTextColor="#9ca3af"
                    multiline
                    maxLength={280}
                />
                <View style={styles.actions}>
                    <View style={styles.iconRow}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Feather name="image" size={24} color="#3b82f6" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Feather name="film" size={24} color="#3b82f6" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <AntDesign name="barschart" size={24} color="#3b82f6" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={[styles.submitButton, !content.trim() && styles.disabledButton]}
                        onPress={handleSubmit}
                        disabled={!content.trim()}
                    >
                        <Text style={styles.submitText}>Publier</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {notification && (
                <View style={[styles.notification]}>
                    <Text style={styles.notificationText}>{notification.message}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    input: {
        height: 60,
        fontSize: 16,
        textAlignVertical: 'top',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    iconRow: {
        flexDirection: 'row',
    },
    iconButton: {
        marginRight: 10,
    },
    submitButton: {
        backgroundColor: '#3b82f6',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    submitText: {
        color: 'white',
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
    notification: {
        position: 'absolute',
        bottom: 50,
        right: 10,
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    success: {
        backgroundColor: 'green',
    },
    error: {
        backgroundColor: 'red',
    },
    notificationText: {
        color: 'green',
        fontWeight: 'bold',
        
    },
});

export default PostForm;