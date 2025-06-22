import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, ChevronLeft, Calendar, MessageSquare, Award, Target, Users, Settings } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';

export default function NotificationsScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [notifications, setNotifications] = useState({
        push: true,
        events: true,
        messages: true,
        achievements: true,
        missions: true,
        community: false,
        system: true
    });

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const notificationTypes = [
        {
            key: 'push' as keyof typeof notifications,
            title: 'Push-уведомления',
            description: 'Получать уведомления на устройство',
            icon: Bell,
            color: theme.colors.primary
        },
        {
            key: 'events' as keyof typeof notifications,
            title: 'События',
            description: 'Уведомления о новых событиях и изменениях на почту',
            icon: Calendar,
            color: '#e74c3c'
        }
    ];

    return (
        <SafeAreaView style={styles.container}>


            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Настройки уведомлений</Text>
                    <Text style={styles.sectionDescription}>
                        Выберите, какие уведомления вы хотите получать
                    </Text>
                </View>

                <View style={styles.notificationsContainer}>
                    {notificationTypes.map((item) => (
                        <View key={item.key} style={styles.notificationItem}>
                            <View style={styles.notificationContent}>
                                <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                                    <item.icon color={item.color} size={20} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.notificationTitle}>{item.title}</Text>
                                    <Text style={styles.notificationDescription}>{item.description}</Text>
                                </View>
                            </View>
                            <Switch
                                value={notifications[item.key]}
                                onValueChange={() => toggleNotification(item.key)}
                                trackColor={{
                                    false: theme.colors.border,
                                    true: item.color + '40'
                                }}
                                thumbColor={notifications[item.key] ? item.color : '#f4f3f4'}
                                ios_backgroundColor={theme.colors.border}
                            />
                        </View>
                    ))}
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        flex: 1,
        textAlign: 'center',
    },
    headerSpacer: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    section: {
        marginTop: 24,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        lineHeight: 22,
    },
    notificationsContainer: {
        backgroundColor: theme.colors.card,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 24,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    notificationContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    notificationDescription: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        lineHeight: 18,
    },
    infoSection: {
        marginBottom: 24,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: theme.colors.primary + '10',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
    },
    infoText: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        marginLeft: 12,
        flex: 1,
        lineHeight: 20,
    },
}); 