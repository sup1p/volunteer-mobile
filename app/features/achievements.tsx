import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { Award, Star, Shield, TrendingUp } from 'lucide-react-native';

const achievements = [
    { id: '1', title: 'Первый шаг', description: 'Завершить первое событие', icon: Star, date: '2023-05-10' },
    { id: '2', title: 'Активный участник', description: 'Посетить 5 событий', icon: Award, date: '2023-08-20' },
    { id: '3', title: 'Эксперт сообщества', description: 'Провести 3 лекции', icon: Shield, date: '2024-01-15' },
    { id: '4', title: 'Лидер мнений', description: 'Собрать 1000 баллов', icon: TrendingUp, date: '2024-03-30' },
];

export default function AchievementsScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Достижения</Text>
                {achievements.map((item, index) => (
                    <View key={item.id} style={[styles.achievementItem, index === achievements.length - 1 && styles.lastAchievementItem]}>
                        <View style={styles.iconContainer}>
                            <item.icon color={theme.colors.primary} size={32} />
                        </View>
                        <View style={styles.achievementDetails}>
                            <Text style={styles.achievementTitle}>{item.title}</Text>
                            <Text style={styles.achievementDescription}>{item.description}</Text>
                            <Text style={styles.achievementDate}>Получено: {new Date(item.date).toLocaleDateString('ru-RU')}</Text>
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
    achievementItem: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    lastAchievementItem: {
        borderBottomWidth: 0,
    },
    iconContainer: {
        marginRight: 20,
    },
    achievementDetails: {
        flex: 1,
    },
    achievementTitle: {
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    achievementDescription: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        marginBottom: 8,
    },
    achievementDate: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
    },
}); 