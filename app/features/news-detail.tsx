import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { mockNews } from '@/src/data/mockData';
import { Eye, MessageSquare } from 'lucide-react-native';

const NewsDetailScreen = () => {
    const { id } = useLocalSearchParams();
    const { theme } = useTheme();
    const newsArticle = mockNews.find(article => article.id === id);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        contentContainer: {
            padding: 16,
        },
        image: {
            width: '100%',
            height: 250,
            borderRadius: 12,
            marginBottom: 16,
        },
        title: {
            fontSize: 24,
            fontFamily: 'Inter-Bold',
            color: theme.colors.text,
            marginBottom: 12,
        },
        metaContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
            paddingBottom: 12,
        },
        metaText: {
            fontSize: 14,
            fontFamily: 'Inter-Regular',
            color: theme.colors.subtext,
        },
        statsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        statsText: {
            marginLeft: 6,
            fontSize: 14,
            fontFamily: 'Inter-Regular',
            color: theme.colors.subtext,
        },
        description: {
            fontSize: 16,
            fontFamily: 'Inter-Regular',
            color: theme.colors.text,
            lineHeight: 26,
        },
        category: {
            fontFamily: 'Inter-Medium',
            color: theme.colors.danger,
        }
    });

    if (!newsArticle) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={{ color: theme.colors.text, marginTop: 10 }}>Новость не найдена</Text>
            </View>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: newsArticle.category, headerBackTitle: 'Назад' }} />
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>{newsArticle.title}</Text>
                <View style={styles.metaContainer}>
                    <Text style={styles.metaText}><Text style={styles.category}>{newsArticle.category}</Text> • {newsArticle.timestamp}</Text>
                    <View style={styles.statsContainer}>
                        <Eye size={16} color={theme.colors.subtext} />
                        <Text style={styles.statsText}>{newsArticle.views}</Text>
                        <MessageSquare size={16} color={theme.colors.subtext} style={{ marginLeft: 16 }} />
                        <Text style={styles.statsText}>{newsArticle.comments}</Text>
                    </View>
                </View>
                <Image source={{ uri: newsArticle.imageUrl }} style={styles.image} />
                <Text style={styles.description}>{newsArticle.description}</Text>
            </ScrollView>
        </>
    );
};

export default NewsDetailScreen; 