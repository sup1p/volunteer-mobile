import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, BarChart2, BookOpen, Calendar, Mail, Megaphone, CheckSquare } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const cardMargin = 10;
const cardWidth = (width - cardMargin * 3) / 2;


export default function AdminDashboardScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const menuItems = [
        { title: 'Пользователи', icon: Users, path: '/admin/users', color: theme.colors.primary, },
        { title: 'Аналитика', icon: BarChart2, path: '/admin/analytics', color: theme.colors.success, },
        { title: 'Курсы', icon: BookOpen, path: '/admin/courses', color: theme.colors.warning, },
        { title: 'События', icon: Calendar, path: '/admin/events', color: theme.colors.danger, },
        { title: 'Отчеты', icon: Mail, path: '/admin/reports', color: '#6366f1' },
        { title: 'Инициативы', icon: Megaphone, path: '/admin/initiatives', color: '#ec4899' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <LinearGradient
                    colors={[theme.colors.card, theme.colors.background]}
                    style={styles.header}
                >
                    <Text style={styles.headerTitle}>Добро пожаловать!</Text>
                    <Text style={styles.headerSubtitle}>Выберите раздел для управления</Text>
                </LinearGradient>

                <View style={styles.menuGrid}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.card} onPress={() => router.push(item.path as any)}>
                            <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                                <item.icon color={item.color} size={32} />
                            </View>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardSubtitle}>Управление</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.summarySection}>
                    <Text style={styles.sectionTitle}>Быстрый обзор</Text>
                    <View style={styles.summaryCard}>
                        <CheckSquare color={theme.colors.success} size={24} />
                        <View style={styles.summaryTextContainer}>
                            <Text style={styles.summaryValue}>3 новых отчета</Text>
                            <Text style={styles.summaryLabel}>Требуют вашего внимания</Text>
                        </View>
                    </View>
                    <View style={styles.summaryCard}>
                        <Users color={theme.colors.primary} size={24} />
                        <View style={styles.summaryTextContainer}>
                            <Text style={styles.summaryValue}>2 новых пользователя</Text>
                            <Text style={styles.summaryLabel}>За последнюю неделю</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const getStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    header: {
        padding: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
    },
    headerSubtitle: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        marginTop: 4,
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingHorizontal: cardMargin / 2,
        marginTop: -20,
    },
    card: {
        width: cardWidth,
        height: cardWidth,
        backgroundColor: theme.colors.card,
        borderRadius: 20,
        margin: cardMargin / 2,
        padding: 15,
        justifyContent: 'space-between',
        shadowColor: theme.colors.text,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
    },
    cardSubtitle: {
        fontSize: 13,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
    },
    summarySection: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginBottom: 15,
    },
    summaryCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: theme.colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    summaryTextContainer: {
        marginLeft: 15,
    },
    summaryValue: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
    },
    summaryLabel: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
    },
}); 