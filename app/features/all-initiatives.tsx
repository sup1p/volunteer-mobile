import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { mockInitiatives, Initiative } from '@/src/data/mockData';
import { ThumbsUp, MessageSquare } from 'lucide-react-native';

export default function AllInitiativesScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [initiatives, setInitiatives] = useState<Initiative[]>(mockInitiatives);
    const [likedInitiatives, setLikedInitiatives] = useState<Set<string>>(new Set());

    const handleLike = (initiativeId: string) => {
        if (likedInitiatives.has(initiativeId)) {
            return;
        }

        setInitiatives(currentInitiatives =>
            currentInitiatives.map(initiative =>
                initiative.id === initiativeId
                    ? { ...initiative, likes: initiative.likes + 1 }
                    : initiative
            )
        );

        setLikedInitiatives(currentLiked => {
            const newLiked = new Set(currentLiked);
            newLiked.add(initiativeId);
            return newLiked;
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Все инициативы</Text>
                {initiatives.map(initiative => (
                    <View key={initiative.id} style={styles.initiativeCard}>
                        <Text style={styles.initiativeTitle}>{initiative.title}</Text>
                        <Text style={styles.initiativeAuthor}>Автор: {initiative.author}</Text>
                        <Text style={styles.initiativeDescription}>{initiative.description}</Text>
                        <View style={styles.initiativeFooter}>
                            <TouchableOpacity
                                style={styles.initiativeButton}
                                onPress={() => handleLike(initiative.id)}
                                disabled={likedInitiatives.has(initiative.id)}
                            >
                                <ThumbsUp size={18} color={likedInitiatives.has(initiative.id) ? theme.colors.primary : theme.colors.subtext} />
                                <Text style={[styles.initiativeButtonText, likedInitiatives.has(initiative.id) && { color: theme.colors.primary }]}>
                                    {initiative.likes}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.initiativeButton}>
                                <MessageSquare size={18} color={theme.colors.subtext} />
                                <Text style={styles.initiativeButtonText}>Обсудить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const getStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginBottom: 20,
    },
    initiativeCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    initiativeTitle: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginBottom: 5,
    },
    initiativeAuthor: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        marginBottom: 10,
    },
    initiativeDescription: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.text,
        lineHeight: 20,
        marginBottom: 15,
    },
    initiativeFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: 15,
        marginTop: 5,
    },
    initiativeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    initiativeButtonText: {
        marginLeft: 8,
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.subtext,
    },
}); 