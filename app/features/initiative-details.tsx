import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { mockInitiatives, Initiative, Comment } from '@/src/data/mockData';
import { Send } from 'lucide-react-native';

export default function InitiativeDetailsScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const { id } = useLocalSearchParams();

    const [initiative, setInitiative] = useState<Initiative | undefined>(
        mockInitiatives.find(i => i.id === id)
    );
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim() === '' || !initiative) return;

        const comment: Comment = {
            id: `c-${Date.now()}`,
            author: 'Вы',
            text: newComment,
            date: new Date().toISOString(),
        };

        const updatedInitiative = {
            ...initiative,
            comments: [...initiative.comments, comment],
        };
        setInitiative(updatedInitiative);
        setNewComment('');
    };

    if (!initiative) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Инициатива не найдена.</Text>
            </SafeAreaView>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <SafeAreaView style={styles.container} edges={['bottom']}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{initiative.title}</Text>
                        <Text style={styles.author}>Автор: {initiative.author}</Text>
                    </View>
                    <Text style={styles.description}>{initiative.description}</Text>

                    <View style={styles.commentsSection}>
                        <Text style={styles.commentsTitle}>Комментарии ({initiative.comments.length})</Text>
                        {initiative.comments.map(comment => (
                            <View key={comment.id} style={styles.commentContainer}>
                                <Text style={styles.commentAuthor}>{comment.author}</Text>
                                <Text style={styles.commentText}>{comment.text}</Text>
                                <Text style={styles.commentDate}>
                                    {new Date(comment.date).toLocaleString('ru-RU')}
                                </Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Написать комментарий..."
                        placeholderTextColor={theme.colors.subtext}
                        value={newComment}
                        onChangeText={setNewComment}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
                        <Send size={24} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const getStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
    },
    author: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        marginTop: 5,
    },
    description: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: theme.colors.text,
        lineHeight: 24,
        marginBottom: 30,
    },
    commentsSection: {
        marginTop: 20,
    },
    commentsTitle: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginBottom: 15,
    },
    commentContainer: {
        backgroundColor: theme.colors.card,
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    commentAuthor: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.primary,
        marginBottom: 5,
    },
    commentText: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.text,
        lineHeight: 20,
    },
    commentDate: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        textAlign: 'right',
        marginTop: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        backgroundColor: theme.colors.card,
    },
    textInput: {
        flex: 1,
        backgroundColor: theme.colors.background,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        color: theme.colors.text,
        marginRight: 10,
    },
    sendButton: {
        padding: 5,
    },
    errorText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
    },
}); 