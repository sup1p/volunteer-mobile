import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { Users, BarChart, CheckCircle, Star, TrendingUp, Activity } from 'lucide-react-native';
import { mockUsers } from '@/src/data/mockData';

// Mock data from rankings page for gamification stats
const gamificationStats = {
    totalPoints: 2800000,
    missionsCompleted: 12456,
    activeRegions: 156
};

export default function AnalyticsScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const totalUsers = mockUsers.length;
    const activeUsers = mockUsers.filter(u => u.status === 'active').length;
    const newUsersLast30Days = mockUsers.filter(u => new Date(u.registrationDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length;

    const statsCards = [
        {
            title: 'Всего пользователей',
            value: totalUsers,
            icon: Users,
            color: theme.colors.primary,
        },
        {
            title: 'Активных пользователей',
            value: activeUsers,
            icon: CheckCircle,
            color: theme.colors.success,
        },
        {
            title: 'Новых за 30 дней',
            value: newUsersLast30Days,
            icon: TrendingUp,
            color: '#3b82f6',
        },
        {
            title: 'Заработано баллов',
            value: (gamificationStats.totalPoints / 1000000).toFixed(1) + 'M',
            icon: Star,
            color: theme.colors.warning,
        },
        {
            title: 'Миссий выполнено',
            value: gamificationStats.missionsCompleted.toLocaleString('ru-RU'),
            icon: Activity,
            color: theme.colors.danger,
        },
        {
            title: 'Активных регионов',
            value: gamificationStats.activeRegions,
            icon: BarChart,
            color: '#6366f1',
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Аналитика и Метрики</Text>
                    <Text style={styles.headerSubtitle}>Обзор ключевых показателей платформы</Text>
                </View>
                <View style={styles.grid}>
                    {statsCards.map((card, index) => (
                        <View key={index} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <card.icon color={card.color} size={24} />
                                <Text style={styles.cardTitle}>{card.title}</Text>
                            </View>
                            <Text style={styles.cardValue}>{card.value}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const getStyles = (theme: any) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    scrollContainer: { padding: 20 },
    header: { marginBottom: 20 },
    headerTitle: { fontSize: 26, fontFamily: 'Inter-Bold', color: theme.colors.text },
    headerSubtitle: { fontSize: 16, fontFamily: 'Inter-Regular', color: theme.colors.subtext, marginTop: 5 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        padding: 20,
        width: '48%',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 4,
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    cardTitle: { fontSize: 15, fontFamily: 'Inter-SemiBold', color: theme.colors.subtext, marginLeft: 10, flex: 1 },
    cardValue: { fontSize: 32, fontFamily: 'Inter-Bold', color: theme.colors.text, textAlign: 'right' },
}); 