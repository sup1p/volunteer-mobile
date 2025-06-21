import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { Mail, Search, User, Clock, ChevronRight } from 'lucide-react-native';

interface Report {
    id: string;
    title: string;
    user: string;
    date: string;
    isAnonymous: boolean;
}

export default function AdminReportsScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [reports, setReports] = useState<Report[]>([
        { id: '1', title: 'Некорректное начисление баллов', user: 'Дмитрий Сидоров', date: '2024-07-20', isAnonymous: false },
        { id: '2', title: 'Оскорбительное поведение на мероприятии', user: 'Анонимно', date: '2024-07-19', isAnonymous: true },
        { id: '3', title: 'Предложение по улучшению приложения', user: 'Елена Козлова', date: '2024-07-18', isAnonymous: false },
    ]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredReports = reports.filter(report =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.user.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }: { item: Report }) => (
        <TouchableOpacity style={styles.card} onPress={() => { /* Navigate to report details */ }}>
            <View style={styles.cardIconContainer}>
                <Mail color={theme.colors.warning} size={30} />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardRow}>
                    <User color={theme.colors.subtext} size={14} />
                    <Text style={[styles.cardSubtitle, item.isAnonymous && styles.anonymousUser]}>{item.user}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Clock color={theme.colors.subtext} size={14} />
                    <Text style={styles.cardSubtitle}>{item.date}</Text>
                </View>
            </View>
            <ChevronRight color={theme.colors.subtext} size={24} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Отчеты пользователей</Text>
                <View style={styles.searchContainer}>
                    <Search color={theme.colors.subtext} size={20} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Поиск по названию или автору..."
                        placeholderTextColor={theme.colors.subtext}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>
            <FlatList
                data={filteredReports}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const getStyles = (theme: any) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    header: { padding: 20, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    headerTitle: { fontSize: 24, fontFamily: 'Inter-Bold', color: theme.colors.text, marginBottom: 15 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.inputBackground, borderRadius: 10, paddingHorizontal: 10 },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, height: 45, color: theme.colors.text, fontSize: 16 },
    listContainer: { padding: 20 },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    cardIconContainer: {
        backgroundColor: `${theme.colors.warning}20`,
        padding: 15,
        borderRadius: 12,
        marginRight: 15
    },
    cardContent: { flex: 1 },
    cardTitle: { fontSize: 17, fontFamily: 'Inter-SemiBold', color: theme.colors.text, marginBottom: 8 },
    cardRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    cardSubtitle: { fontSize: 14, color: theme.colors.subtext, marginLeft: 6 },
    anonymousUser: { fontStyle: 'italic' },
});