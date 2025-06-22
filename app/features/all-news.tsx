import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { mockNews, NewsArticle } from '@/src/data/mockData';
import { router, Stack } from 'expo-router';
import { Eye, MessageSquare } from 'lucide-react-native';

const AllNewsScreen = () => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        contentContainer: {
            padding: 16,
        },
        newsItem: {
            flexDirection: 'row',
            marginBottom: 16,
            backgroundColor: theme.colors.card,
            borderRadius: 8,
            padding: 12,
        },
        newsImage: {
            width: 100,
            height: 100,
            borderRadius: 8,
            marginRight: 12,
        },
        newsTextContainer: {
            flex: 1,
            justifyContent: 'space-between',
        },
        newsTitle: {
            fontSize: 16,
            fontFamily: 'Inter-SemiBold',
            color: theme.colors.text,
            marginBottom: 4,
        },
        newsMetaContainer: {
            marginTop: 8,
        },
        newsMeta: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        newsMetaText: {
            fontSize: 12,
            fontFamily: 'Inter-Regular',
            color: theme.colors.text,
        },
        newsInfo: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        newsInfoText: {
            marginLeft: 4,
            fontSize: 12,
            fontFamily: 'Inter-Regular',
            color: theme.colors.text,
        },
        category: {
            color: '#E53935',
            fontFamily: 'Inter-Medium',
            marginRight: 8,
        }
    });

    return (
        <>
            <Stack.Screen options={{ title: 'Все новости' }} />
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {mockNews.map((item: NewsArticle) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.newsItem}
                        onPress={() => router.push({ pathname: '/features/news-detail', params: { id: item.id } } as any)}
                    >
                        <Image source={{ uri: item.imageUrl }} style={styles.newsImage} />
                        <View style={styles.newsTextContainer}>
                            <View>
                                <Text style={styles.newsTitle}>{item.title}</Text>
                            </View>
                            <View style={styles.newsMetaContainer}>
                                <View style={styles.newsMeta}>
                                    <Text style={styles.newsMetaText}><Text style={styles.category}>{item.category}</Text> {item.timestamp}</Text>
                                    <View style={styles.newsInfo}>
                                        <Eye size={14} color={theme.colors.text} />
                                        <Text style={styles.newsInfoText}>{item.views}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </>
    );
};

export default AllNewsScreen; 