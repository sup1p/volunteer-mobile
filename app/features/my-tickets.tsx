import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { AppEvent, mockEvents, mockUserRegistrations, UserEventRegistration } from '@/src/data/mockData';
import QRCode from 'react-native-qrcode-svg';
import { X, Calendar, Clock } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CURRENT_USER_ID = '2';

export default function MyTicketsScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [ticketModalVisible, setTicketModalVisible] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<{ event: AppEvent; registration: UserEventRegistration } | null>(null);

    const userRegistrations = mockUserRegistrations.filter(reg => reg.userId === CURRENT_USER_ID && reg.status === 'registered');
    const userTickets = userRegistrations.map(reg => {
        const event = mockEvents.find(e => e.id === reg.eventId);
        return { event, registration: reg };
    }).filter(item => item.event) as { event: AppEvent; registration: UserEventRegistration }[];

    const handleTicketPress = (ticket: { event: AppEvent; registration: UserEventRegistration }) => {
        setSelectedTicket(ticket);
        setTicketModalVisible(true);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Мои билеты</Text>
                {userTickets.length > 0 ? (
                    userTickets.map((ticket, index) => (
                        <TouchableOpacity key={ticket.registration.registrationId} style={[styles.ticketItem, index === userTickets.length - 1 && styles.lastTicketItem]} onPress={() => handleTicketPress(ticket)}>
                            <View style={styles.ticketDetails}>
                                <Text style={styles.ticketTitle}>{ticket.event.title}</Text>
                                <View style={styles.eventMeta}>
                                    <View style={styles.metaItem}>
                                        <Calendar size={14} color={theme.colors.subtext} />
                                        <Text style={styles.metaText}>{formatDate(ticket.event.date)}</Text>
                                    </View>
                                    <View style={styles.metaItem}>
                                        <Clock size={14} color={theme.colors.subtext} />
                                        <Text style={styles.metaText}>{formatTime(ticket.event.date)}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.qrIcon}>
                                <Text style={styles.qrIconText}>QR</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noTicketsText}>У вас нет активных билетов.</Text>
                )}
            </ScrollView>

            {selectedTicket && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={ticketModalVisible}
                    onRequestClose={() => setTicketModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setTicketModalVisible(false)}>
                                <X size={24} color={theme.colors.subtext} />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>Билет на событие</Text>
                            <View style={styles.qrContainer}>
                                <QRCode
                                    value={JSON.stringify({
                                        userId: selectedTicket.registration.userId,
                                        eventId: selectedTicket.registration.eventId,
                                        registrationId: selectedTicket.registration.registrationId
                                    })}
                                    size={width * 0.6}
                                    backgroundColor={theme.colors.card}
                                    color={theme.colors.text}
                                />
                            </View>
                            <Text style={styles.ticketEventTitle}>{selectedTicket.event.title}</Text>
                            <Text style={styles.ticketEventDate}>
                                {new Date(selectedTicket.event.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </Text>
                            <Text style={styles.ticketInstruction}>Покажите этот QR-код организатору на входе</Text>
                        </View>
                    </View>
                </Modal>
            )}
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
    ticketItem: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    lastTicketItem: {
        borderBottomWidth: 0,
    },
    ticketDetails: {
        flex: 1,
    },
    ticketTitle: {
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        marginBottom: 10,
    },
    eventMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        marginLeft: 6,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        fontSize: 12,
    },
    qrIcon: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    qrIconText: {
        color: theme.colors.lightText,
        fontFamily: 'Inter-Bold',
        fontSize: 16,
    },
    noTicketsText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: theme.colors.card,
        borderRadius: 20,
        padding: 25,
        width: width * 0.9,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginBottom: 20,
    },
    qrContainer: {
        padding: 20,
        backgroundColor: theme.colors.lightText,
        borderRadius: 15,
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    ticketEventTitle: {
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: 5,
    },
    ticketEventDate: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        textAlign: 'center',
        marginBottom: 20,
    },
    ticketInstruction: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        textAlign: 'center',
    }
}); 