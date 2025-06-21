import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { mockUsers } from '@/src/data/mockData';
import { UserCircle, Mail, Shield, LogOut, ChevronRight } from 'lucide-react-native';

export default function AdminProfileScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const adminUser = mockUsers.find(u => u.role === 'admin');

    const handleLogout = () => {
        Alert.alert(
            "Выход из системы",
            "Вы уверены, что хотите выйти?",
            [
                { text: "Отмена", style: "cancel" },
                { text: "Выйти", style: "destructive", onPress: () => router.replace('/auth') }
            ]
        );
    };

    if (!adminUser) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Администратор не найден</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.profileHeader}>
                    <UserCircle color={theme.colors.primary} size={90} strokeWidth={1.5} />
                    <Text style={styles.userName}>{adminUser.name}</Text>
                    <Text style={styles.userRole}>Администратор</Text>
                </View>

                <View style={styles.menuSection}>
                    <TouchableOpacity style={styles.menuItem}>
                        <Mail color={theme.colors.subtext} size={22} />
                        <Text style={styles.menuItemText}>{adminUser.email}</Text>
                        <ChevronRight color={theme.colors.subtext} size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Shield color={theme.colors.subtext} size={22} />
                        <Text style={styles.menuItemText}>Роли и права</Text>
                        <ChevronRight color={theme.colors.subtext} size={22} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <LogOut color={theme.colors.danger} size={22} />
                    <Text style={styles.logoutButtonText}>Выйти из системы</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const getStyles = (theme: any) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    scrollContainer: { paddingVertical: 20, paddingHorizontal: 15 },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
        padding: 20,
    },
    userName: {
        fontSize: 24,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginTop: 15,
    },
    userRole: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: theme.colors.primary,
        marginTop: 5,
        backgroundColor: `${theme.colors.primary}20`,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        overflow: 'hidden'
    },
    menuSection: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        marginBottom: 30,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    menuItemText: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        marginLeft: 15,
        flex: 1,
    },
    logoutButton: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    logoutButtonText: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.danger,
        marginLeft: 15,
    },
    errorText: {
        color: theme.colors.text,
        textAlign: 'center',
        marginTop: 50
    }
}); 