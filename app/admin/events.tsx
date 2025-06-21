import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { Calendar, Search, Plus, MapPin, Users } from 'lucide-react-native';

// Using the same Event interface from calendar.tsx for consistency
interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    participants: number;
    maxParticipants: number;
    type: 'lecture' | 'raid' | 'flashmob' | 'training' | 'meeting';
    points: number;
    registered: boolean;
    attendees: number;
}

export default function AdminEventsScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [events, setEvents] = useState<Event[]>([
        {
            id: '1',
            title: 'Лекция: Как выявлять коррупцию',
            description: 'Подробная лекция о методах выявления коррупционных схем в государственных органах и частном секторе.',
            date: '2024-05-15',
            time: '18:00',
            location: 'Центр волонтёров, ул. Ленина 45',
            participants: 24,
            maxParticipants: 50,
            type: 'lecture',
            points: 25,
            registered: false,
            attendees: 45,
        },
        {
            id: '2',
            title: 'Флешмоб против коррупции',
            description: 'Мирная акция привлечения внимания к проблемам коррупции в городе.',
            date: '2024-05-20',
            time: '12:00',
            location: 'Центральная площадь',
            participants: 156,
            maxParticipants: 200,
            type: 'flashmob',
            points: 50,
            registered: true,
            attendees: 28,
        },
        {
            id: '3',
            title: 'Сбор гуманитарной помощи',
            description: 'Сбор средств для помощи людям, пострадавшим от стихийных бедствий или военных действий.',
            date: '2024-09-01',
            time: '10:00',
            location: 'Склад "Надежда"',
            participants: 112,
            maxParticipants: 150,
            type: 'raid',
            points: 75,
            registered: true,
            attendees: 112,
        },
    ]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }: { item: Event }) => (
        <TouchableOpacity style={styles.card} onPress={() => router.push(`/admin/event/${item.id}` as any)}>
            <View style={styles.cardIconContainer}>
                <Calendar color={theme.colors.primary} size={30} />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardRow}>
                    <MapPin color={theme.colors.subtext} size={14} />
                    <Text style={styles.cardSubtitle}>{item.location}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Users color={theme.colors.subtext} size={14} />
                    <Text style={styles.cardSubtitle}>{item.attendees} участников</Text>
                </View>
            </View>
            <View style={styles.dateContainer}>
                <Text style={styles.dateDay}>{new Date(item.date).getDate()}</Text>
                <Text style={styles.dateMonth}>{new Date(item.date).toLocaleString('ru-RU', { month: 'short' })}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Управление событиями</Text>
                <View style={styles.searchContainer}>
                    <Search color={theme.colors.subtext} size={20} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Поиск событий..."
                        placeholderTextColor={theme.colors.subtext}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>
            <FlatList
                data={filteredEvents}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <TouchableOpacity style={styles.addButton} onPress={() => router.push('/admin/create-event' as any)}>
                        <Plus color={theme.colors.lightText} size={20} />
                        <Text style={styles.addButtonText}>Создать новое событие</Text>
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
        backgroundColor: `${theme.colors.primary}20`,
        padding: 15,
        borderRadius: 12,
        marginRight: 15
    },
    cardContent: { flex: 1 },
    cardTitle: { fontSize: 17, fontFamily: 'Inter-SemiBold', color: theme.colors.text, marginBottom: 8 },
    cardRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    cardSubtitle: { fontSize: 14, color: theme.colors.subtext, marginLeft: 6 },
    dateContainer: { alignItems: 'center', marginLeft: 10, backgroundColor: theme.colors.background, padding: 10, borderRadius: 10 },
    dateDay: { fontSize: 20, fontFamily: 'Inter-Bold', color: theme.colors.primary },
    dateMonth: { fontSize: 12, fontFamily: 'Inter-SemiBold', color: theme.colors.primary, textTransform: 'uppercase' },
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