import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { mockHomeEvents, HomeEvent } from '@/src/data/mockData';
import { Calendar, Users, MapPin } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function EventsScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Все мероприятия</Text>
                {mockHomeEvents.map(event => (
                    <TouchableOpacity key={event.id} style={styles.eventCard}>
                        <View style={styles.eventCardHeader}>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                        </View>
                        <View style={styles.eventMeta}>
                            <View style={styles.eventMetaItem}>
                                <Calendar size={14} color={theme.colors.subtext} />
                                <Text style={styles.eventMetaText}>{event.date}</Text>
                            </View>
                            <View style={styles.eventMetaItem}>
                                <MapPin size={14} color={theme.colors.subtext} />
                                <Text style={styles.eventMetaText}>{event.location}</Text>
                            </View>
                        </View>
                        <View style={styles.eventFooter}>
                            <View style={styles.eventParticipants}>
                                <Users size={14} color={theme.colors.primary} />
                                <Text style={styles.eventParticipantsText}>
                                    {event.participants} / {event.maxParticipants}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.registerButton}>
                                <Text style={styles.registerButtonText}>Участвовать</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
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
    eventCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    eventCardHeader: {
        marginBottom: 10,
    },
    eventTitle: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
    },
    eventMeta: {
        marginBottom: 15,
    },
    eventMetaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    eventMetaText: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: theme.colors.subtext,
        marginLeft: 8,
    },
    eventFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: 10,
    },
    eventParticipants: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eventParticipantsText: {
        marginLeft: 6,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.primary,
    },
    registerButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    registerButtonText: {
        color: '#fff',
        fontFamily: 'Inter-Bold',
        fontSize: 12,
    },
}); 