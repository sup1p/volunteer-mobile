import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';

interface Attendee {
    id: string;
    name: string;
    email: string;
}

export default function EventAttendeesScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const { eventId } = useLocalSearchParams();

    // Mock data for attendees
    const attendees: Attendee[] = [
        { id: '1', name: 'Мария Иванова', email: 'maria@example.com' },
        { id: '2', name: 'Дмитрий Сидоров', email: 'dmitry@example.com' },
        { id: '3', name: 'Елена Козлова', email: 'elena@example.com' },
    ];

    const renderAttendee = ({ item }: { item: Attendee }) => (
        <View style={styles.attendeeCard}>
            <Text style={styles.attendeeName}>{item.name}</Text>
            <Text style={styles.attendeeEmail}>{item.email}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Event Attendees</Text>
                <Text style={styles.subHeader}>Event ID: {eventId}</Text>
            </View>
            <FlatList
                data={attendees}
                renderItem={renderAttendee}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
}

const getStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        padding: 20,
        backgroundColor: theme.colors.card,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
    },
    subHeader: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        marginTop: 4,
    },
    listContainer: {
        padding: 20,
    },
    attendeeCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    attendeeName: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
    },
    attendeeEmail: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
    },
}); 