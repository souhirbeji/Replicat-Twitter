import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import UserAvatar from '../UserAvatar';

interface Post {
    _id: string;
    name: string;
    author: string;
    content: string;
    createdAt: string;
    likes?: string[];
}

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <UserAvatar name={post.name} size={40} />

                {/* <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{post.name.charAt(0).toUpperCase()}</Text>
                </View> */}
                <View style={styles.contentContainer}>
                    <View style={styles.header}>
                        <Text style={styles.name}>{post.name}</Text>
                        <Text style={styles.username}>@{post.author}</Text>
                        <Text style={styles.time}>· {new Date(post.createdAt).toLocaleString()}</Text>
                    </View>
                    <Text style={styles.content}>{post.content}</Text>
                    <View style={styles.actions}>
                        <Feather name="message-circle" size={20} color="gray" />
                        <AntDesign name="retweet" size={20} color="gray" />
                        <TouchableOpacity>
                            <AntDesign name={post.likes?.length ? "heart" : "hearto"} size={20} color={post.likes?.length ? "red" : "gray"} />
                        </TouchableOpacity>
                        <Feather name="share" size={20} color="gray" />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#3b82f6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
        marginLeft: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontWeight: 'bold',
    },
    username: {
        color: 'gray',
        marginLeft: 5,
    },
    time: {
        color: 'gray',
        marginLeft: 5,
    },
    content: {
        marginTop: 5,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default PostCard;
