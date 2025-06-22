import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { Mail, Search, User, Clock, ChevronRight, Filter } from 'lucide-react-native';

interface Report {
    id: string;
    title: string;
    user: string;
    date: string;
    isAnonymous: boolean;
    category: string;
}

const mockReports: Report[] = [
    { id: '1', title: 'Некорректное начисление баллов', user: 'Дмитрий Сидоров', date: '2024-07-20', isAnonymous: false, category: 'Техническая проблема' },
    { id: '2', title: 'Оскорбительное поведение на мероприятии', user: 'Анонимно', date: '2024-07-19', isAnonymous: true, category: 'Жалоба на пользователя' },
    { id: '3', title: 'Предложение по улучшению приложения', user: 'Елена Козлова', date: '2024-07-18', isAnonymous: false, category: 'Предложение по улучшению' },
    { id: '4', title: 'Не работает кнопка регистрации', user: 'Петр Иванов', date: '2024-07-21', isAnonymous: false, category: 'Техническая проблема' },
    { id: '5', title: 'Нарушение правил в чате', user: 'Анонимно', date: '2024-07-20', isAnonymous: true, category: 'Нарушение правил' },
    { id: '6', title: 'Проблема с отображением контента', user: 'Анна Петрова', date: '2024-07-22', isAnonymous: false, category: 'Проблема с контентом' },
    { id: '7', title: 'Общие вопросы по системе', user: 'Сергей Волков', date: '2024-07-21', isAnonymous: false, category: 'Другое' },
];

const categories = [
    'Все категории',
    'Техническая проблема',
    'Жалоба на пользователя',
    'Предложение по улучшению',
    'Нарушение правил',
    'Проблема с контентом',
    'Другое'
];

export default function AdminReportsScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [reports, setReports] = useState<Report[]>(mockReports);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Все категории');
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);

    const filteredReports = reports.filter(report => {
        const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'Все категории' || report.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const groupedReports = filteredReports.reduce((acc, report) => {
        const category = report.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(report);
        return acc;
    }, {} as { [key: string]: Report[] });

    const sections = Object.keys(groupedReports).map(category => ({
        title: category,
        data: groupedReports[category]
    }));

    const getCategoryTagStyle = (category: string) => {
        switch (category) {
            case 'Техническая проблема': return { backgroundColor: '#f39c1230', color: '#f39c12' };
            case 'Жалоба на пользователя': return { backgroundColor: '#e74c3c30', color: '#e74c3c' };
            case 'Предложение по улучшению': return { backgroundColor: '#3498db30', color: '#3498db' };
            case 'Нарушение правил': return { backgroundColor: '#9b59b630', color: '#9b59b6' };
            case 'Проблема с контентом': return { backgroundColor: '#e67e2230', color: '#e67e22' };
            case 'Другое': return { backgroundColor: '#95a5a630', color: '#7f8c8d' };
            default: return { backgroundColor: '#bdc3c730', color: '#7f8c8d' };
        }
    }

    const renderItem = ({ item }: { item: Report }) => (
        <TouchableOpacity style={styles.card} onPress={() => { /* Navigate to report details */ }}>
            <View style={styles.cardIconContainer}>
                <Mail color={theme.colors.warning} size={30} />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={[styles.tag, { backgroundColor: getCategoryTagStyle(item.category).backgroundColor }]}>
                    <Text style={[styles.tagText, { color: getCategoryTagStyle(item.category).color }]}>{item.category}</Text>
                </View>
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
                        placeholder="Поиск по названию, автору или категории..."
                        placeholderTextColor={theme.colors.subtext}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setFilterModalVisible(true)}
                >
                    <Filter color={theme.colors.primary} size={20} />
                    <Text style={styles.filterButtonText}>Фильтр: {selectedCategory}</Text>
                </TouchableOpacity>
            </View>
            <SectionList
                sections={sections}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            <Modal
                transparent={true}
                visible={isFilterModalVisible}
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setFilterModalVisible(false)}
                >
                    <View style={styles.filterModal}>
                        <Text style={styles.filterModalTitle}>Выберите категорию</Text>
                        {categories.map((category, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.filterOption,
                                    selectedCategory === category && styles.filterOptionSelected
                                ]}
                                onPress={() => {
                                    setSelectedCategory(category);
                                    setFilterModalVisible(false);
                                }}
                            >
                                <Text style={[
                                    styles.filterOptionText,
                                    selectedCategory === category && styles.filterOptionTextSelected
                                ]}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const getStyles = (theme: any) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    header: { padding: 20, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    headerTitle: { fontSize: 24, fontFamily: 'Inter-Bold', color: theme.colors.text, marginBottom: 15 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.inputBackground, borderRadius: 10, paddingHorizontal: 10, marginBottom: 15 },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, height: 45, color: theme.colors.text, fontSize: 16 },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    filterButtonText: {
        marginLeft: 8,
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: theme.colors.text,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    filterModal: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        padding: 20,
        width: '80%',
        maxHeight: '70%',
    },
    filterModalTitle: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginBottom: 20,
        textAlign: 'center',
    },
    filterOption: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: theme.colors.background,
    },
    filterOptionSelected: {
        backgroundColor: theme.colors.primary,
    },
    filterOptionText: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: theme.colors.text,
    },
    filterOptionTextSelected: {
        color: theme.colors.lightText,
        fontFamily: 'Inter-SemiBold',
    },
    listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
    sectionHeader: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 5
    },
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
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    tagText: {
        fontSize: 12,
        fontFamily: 'Inter-Medium',
    },
    cardRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    cardSubtitle: { fontSize: 14, color: theme.colors.subtext, marginLeft: 6 },
    anonymousUser: { fontStyle: 'italic' },
});