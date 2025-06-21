import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { Megaphone, Search, User, ThumbsUp, ChevronRight } from 'lucide-react-native';

interface Initiative {
    id: string;
    title: string;
    user: string;
    votes: number;
}

export default function AdminInitiativesScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [initiatives, setInitiatives] = useState<Initiative[]>([
        { id: '1', title: 'Организовать курсы по первой помощи', user: 'Анна Федорова', votes: 128 },
        { id: '2', title: 'Создать мобильные бригады для помощи пожилым', user: 'Игорь Волков', votes: 97 },
        { id: '3', title: 'Провести акцию по высадке деревьев', user: 'Сергей Морозов', votes: 75 },
    ]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredInitiatives = initiatives.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.user.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }: { item: Initiative }) => (
        <TouchableOpacity style={styles.card} onPress={() => { /* Navigate to initiative details */ }}>
            <View style={styles.cardIconContainer}>
                <Megaphone color={'#ec4899'} size={30} />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardRow}>
                    <User color={theme.colors.subtext} size={14} />
                    <Text style={styles.cardSubtitle}>{item.user}</Text>
                </View>
            </View>
            <View style={styles.votesContainer}>
                <ThumbsUp color={theme.colors.success} size={18} />
                <Text style={styles.votesText}>{item.votes}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Инициативы пользователей</Text>
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
                data={filteredInitiatives}
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
        backgroundColor: '#ec489920',
        padding: 15,
        borderRadius: 12,
        marginRight: 15
    },
    cardContent: { flex: 1 },
    cardTitle: { fontSize: 17, fontFamily: 'Inter-SemiBold', color: theme.colors.text, marginBottom: 8 },
    cardRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    cardSubtitle: { fontSize: 14, color: theme.colors.subtext, marginLeft: 6 },
    votesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: `${theme.colors.success}20`,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    votesText: {
        fontSize: 14,
        fontFamily: 'Inter-Bold',
        color: theme.colors.success,
        marginLeft: 6
    }
}); 