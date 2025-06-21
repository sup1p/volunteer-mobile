import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

interface AttendedEvent {
    id: string;
    title: string;
    date: string;
    hasFeedback: boolean;
}

export default function FeedbackScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [attendedEvents, setAttendedEvents] = useState<AttendedEvent[]>([
        {
            id: '1',
            title: 'Лекция: Как выявлять коррупцию',
            date: '2024-05-15',
            hasFeedback: true,
        },
        {
            id: '2',
            title: 'Флешмоб против коррупции',
            date: '2024-05-20',
            hasFeedback: false,
        },
        {
            id: '3',
            title: 'Антикоррупционный рейд',
            date: '2024-05-22',
            hasFeedback: false,
        },
    ]);

    const handleSelectEvent = (eventId: string) => {
        router.push({ pathname: '/features/feedback-form', params: { eventId } } as any);
    };

    const renderEvent = ({ item }: { item: AttendedEvent }) => (
        <TouchableOpacity
            style={styles.eventCard}
            onPress={() => handleSelectEvent(item.id)}
            disabled={item.hasFeedback}
        >
            <Calendar color={item.hasFeedback ? theme.colors.disabled : theme.colors.primary} size={24} style={styles.icon} />
            <View style={styles.eventInfo}>
                <Text style={[styles.eventTitle, item.hasFeedback && styles.disabledText]}>{item.title}</Text>
                <Text style={[styles.eventDate, item.hasFeedback && styles.disabledText]}>{item.date}</Text>
            </View>
            {item.hasFeedback ? (
                <Text style={styles.feedbackSubmitted}>Отправлено</Text>
            ) : (
                <ChevronRight color={theme.colors.disabled} size={24} />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <FlatList
                data={attendedEvents}
                renderItem={renderEvent}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={
                    <Text style={styles.headerText}>Выберите мероприятие, чтобы оставить отзыв.</Text>
                }
            />
        </SafeAreaView>
    );
}

const getStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    listContainer: {
        padding: 20,
    },
    headerText: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        textAlign: 'center',
        marginBottom: 20,
    },
    eventCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: theme.colors.text,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    icon: {
        marginRight: 15,
    },
    eventInfo: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
    },
    eventDate: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        marginTop: 4,
    },
    feedbackSubmitted: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.success,
    },
    disabledText: {
        color: theme.colors.disabled,
    },
}); 