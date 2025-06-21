import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { mockEvents, mockUsers, mockUserRegistrations, UserEventRegistration } from '@/src/data/mockData';
import { CameraView, Camera } from 'expo-camera';
import { QrCode, CheckCircle, UserX } from 'lucide-react-native';

export default function AdminEventDetailsScreen() {
    const { id } = useLocalSearchParams();
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [event, setEvent] = useState(mockEvents.find(e => e.id === id));
    const [registrations, setRegistrations] = useState(mockUserRegistrations.filter(r => r.eventId === id));

    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const [showScanner, setShowScanner] = useState(false);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
        setScanned(true);
        setShowScanner(false);

        try {
            const ticket: { userId: string; eventId: string; registrationId: string } = JSON.parse(data);

            if (ticket.eventId !== id) {
                Alert.alert("Ошибка", "Этот билет от другого события.");
                return;
            }

            const registrationIndex = registrations.findIndex(r => r.registrationId === ticket.registrationId);

            if (registrationIndex === -1) {
                Alert.alert("Ошибка", "Участник не найден в списке зарегистрированных.");
                return;
            }

            const updatedRegistrations = [...registrations];
            if (updatedRegistrations[registrationIndex].status === 'attended') {
                Alert.alert("Информация", "Статус этого участника уже был подтвержден.");
            } else {
                updatedRegistrations[registrationIndex].status = 'attended';
                setRegistrations(updatedRegistrations);
                Alert.alert("Успех!", `Статус участника ${mockUsers.find(u => u.id === ticket.userId)?.name} обновлен на "Посетил".`);
            }
        } catch (e) {
            Alert.alert("Ошибка", "Неверный формат QR-кода.");
        }
    };

    if (!event) {
        return <SafeAreaView style={styles.container}><Text style={styles.errorText}>Событие не найдено</Text></SafeAreaView>;
    }

    if (showScanner) {
        if (hasPermission === null) {
            return <View />;
        }
        if (hasPermission === false) {
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.errorText}>Нет доступа к камере</Text>
                    <Button title={'Разрешить доступ'} onPress={() => Camera.requestCameraPermissionsAsync()} />
                </SafeAreaView>
            );
        }
        return (
            <View style={styles.scannerContainer}>
                <CameraView
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                <View style={styles.scannerOverlay}>
                    <Text style={styles.scannerText}>Наведите камеру на QR-код билета</Text>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setShowScanner(false)}>
                        <Text style={styles.cancelButtonText}>Отмена</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle} numberOfLines={1}>{event.title}</Text>
            </View>

            <View style={styles.statsContainer}>
                <Text style={styles.sectionTitle}>Статистика</Text>
                <View style={styles.stats}>
                    <Text style={styles.statText}>Зарегистрировано: {registrations.length}</Text>
                    <Text style={styles.statText}>Посетили: {registrations.filter(r => r.status === 'attended').length}</Text>
                </View>
            </View>

            <View style={styles.listContainer}>
                <Text style={styles.sectionTitle}>Участники</Text>
                {registrations.map(reg => {
                    const user = mockUsers.find(u => u.id === reg.userId);
                    return (
                        <View key={reg.registrationId} style={styles.userItem}>
                            <Text style={styles.userName}>{user?.name || 'Неизвестный'}</Text>
                            {reg.status === 'attended' ? (
                                <View style={styles.statusBadgeSuccess}>
                                    <CheckCircle size={16} color="#fff" />
                                    <Text style={styles.statusBadgeText}>Посетил</Text>
                                </View>
                            ) : (
                                <View style={styles.statusBadgeRegistered}>
                                    <Text style={styles.statusBadgeText}>Записан</Text>
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>

            <TouchableOpacity style={styles.scanButton} onPress={() => { setScanned(false); setShowScanner(true); }}>
                <QrCode size={24} color="#fff" />
                <Text style={styles.scanButtonText}>Сканировать QR-код</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const getStyles = (theme: any) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    scannerContainer: { flex: 1, backgroundColor: 'black' },
    scannerOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    scannerText: { color: '#fff', fontSize: 18, fontFamily: 'Inter-SemiBold', marginBottom: 20 },
    cancelButton: { position: 'absolute', bottom: 50, backgroundColor: 'rgba(255,255,255,0.2)', padding: 15, borderRadius: 10 },
    cancelButtonText: { color: '#fff', fontSize: 16, fontFamily: 'Inter-Bold' },
    header: { padding: 20, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    headerTitle: { fontSize: 22, fontFamily: 'Inter-Bold', color: theme.colors.text, textAlign: 'center' },
    statsContainer: { padding: 20, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    sectionTitle: { fontSize: 18, fontFamily: 'Inter-Bold', color: theme.colors.text, marginBottom: 15 },
    stats: { flexDirection: 'row', justifyContent: 'space-around' },
    statText: { fontSize: 16, fontFamily: 'Inter-Medium', color: theme.colors.subtext },
    listContainer: { flex: 1, padding: 20 },
    userItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.colors.card, padding: 15, borderRadius: 10, marginBottom: 10 },
    userName: { fontSize: 16, fontFamily: 'Inter-SemiBold', color: theme.colors.text },
    statusBadgeSuccess: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.success, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7 },
    statusBadgeRegistered: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.subtext, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7 },
    statusBadgeText: { color: '#fff', marginLeft: 5, fontFamily: 'Inter-Bold', fontSize: 12 },
    scanButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.primary, padding: 20, margin: 20, borderRadius: 15 },
    scanButtonText: { color: '#fff', fontSize: 18, fontFamily: 'Inter-Bold', marginLeft: 10 },
    errorText: { textAlign: 'center', marginTop: 50, fontSize: 18, color: theme.colors.text }
}); 