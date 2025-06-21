import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { mockCourses, Course } from '@/src/data/mockData';
import { BookOpen, Search, Plus, ChevronRight } from 'lucide-react-native';

export default function AdminCoursesScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const [courses, setCourses] = useState(mockCourses);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }: { item: Course }) => (
        <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: '/admin/course-details' as any, params: { courseId: item.id } })}>
            <BookOpen color={theme.colors.primary} size={30} style={styles.cardIcon} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.modules.length} модулей</Text>
            </View>
            <ChevronRight color={theme.colors.subtext} size={24} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Управление курсами</Text>
                <View style={styles.searchContainer}>
                    <Search color={theme.colors.subtext} size={20} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Поиск курсов..."
                        placeholderTextColor={theme.colors.subtext}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>
            <FlatList
                data={filteredCourses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <TouchableOpacity style={styles.addButton} onPress={() => router.push('/admin/create-course' as any)}>
                        <Plus color={theme.colors.lightText} size={20} />
                        <Text style={styles.addButtonText}>Создать новый курс</Text>
                    </TouchableOpacity>
                }
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
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    cardIcon: { marginRight: 15 },
    cardContent: { flex: 1 },
    cardTitle: { fontSize: 17, fontFamily: 'Inter-SemiBold', color: theme.colors.text },
    cardSubtitle: { fontSize: 14, color: theme.colors.subtext, marginTop: 3 },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    addButtonText: {
        color: theme.colors.lightText,
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        marginLeft: 10,
    },
}); 