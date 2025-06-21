import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { mockNews } from '@/src/data/mockData';
import { Eye, MessageSquare, Share2 } from 'lucide-react-native';
import { useMissions } from '@/src/context/MissionContext';
import * as Clipboard from 'expo-clipboard';

const NewsDetailScreen = () => {
    const { id } = useLocalSearchParams();
    const { theme } = useTheme();
    const { completeMission, getMissionById } = useMissions();
    const newsArticle = mockNews.find(article => article.id === id);
    const shareMissionId = '1';

    const handleShare = async () => {
        if (!newsArticle) return;

        const mission = getMissionById(shareMissionId);

        Alert.alert(
            'Поделиться новостью',
            `URL: ${newsArticle.shareUrl}`,
            [
                {
                    text: 'Отмена',
                    style: 'cancel',
                },
                {
                    text: 'Копировать ссылку',
                    onPress: async () => {
                        await Clipboard.setStringAsync(newsArticle.shareUrl);
                        if (mission && !mission.completed) {
                            completeMission(shareMissionId);
                            Alert.alert('Ссылка скопирована!', 'Ежедневное задание "Поделиться статьей" выполнено!');
                        } else {
                            Alert.alert('Ссылка скопирована!');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

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
        metaLeft: {
            flex: 1,
        },
        metaRight: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        metaText: {
            fontSize: 14,
            fontFamily: 'Inter-Regular',
            color: theme.colors.subtext,
            flexDirection: 'row',
            alignItems: 'center',
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
            lineHeight: 26,
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
        },
        shareButton: {
            marginLeft: 16,
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
                    <View style={styles.metaLeft}>
                        <Text style={styles.metaText}><Text style={styles.category}>{newsArticle.category}</Text> • {newsArticle.timestamp}</Text>
                    </View>
                    <View style={styles.metaRight}>
                        <View style={styles.statsContainer}>
                            <Eye size={16} color={theme.colors.subtext} />
                            <Text style={styles.statsText}>{newsArticle.views}</Text>
                            <MessageSquare size={16} color={theme.colors.subtext} style={{ marginLeft: 16 }} />
                            <Text style={styles.statsText}>{newsArticle.comments}</Text>
                        </View>
                        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
                            <Share2 size={22} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Image source={{ uri: newsArticle.imageUrl }} style={styles.image} />
                <Text style={styles.description}>{newsArticle.description}</Text>
            </ScrollView>
        </>
    );
};

export default NewsDetailScreen; 