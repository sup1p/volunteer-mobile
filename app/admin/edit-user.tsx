import { useLocalSearchParams, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { mockUsers, User } from '@/src/data/mockData';
import { Save, User as UserIcon, Shield, Lock, Trash2 } from 'lucide-react-native';

// A simple segment control component
const SegmentedControl = ({ options, selectedOption, onSelect, theme }: any) => {
    const styles = getStyles(theme);
    return (
        <View style={styles.segmentedControlContainer}>
            {options.map((option: any) => (
                <TouchableOpacity
                    key={option.value}
                    style={[
                        styles.segmentButton,
                        selectedOption === option.value && styles.segmentButtonActive
                    ]}
                    onPress={() => onSelect(option.value)}
                >
                    <Text style={[
                        styles.segmentButtonText,
                        selectedOption === option.value && styles.segmentButtonTextActive
                    ]}>
                        {option.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};


export default function EditUserScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const { userId } = useLocalSearchParams();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const foundUser = mockUsers.find(u => u.id === userId);
        setUser(foundUser ? { ...foundUser } : null);
    }, [userId]);

    const handleSave = () => {
        if (!user) return;
        const userIndex = mockUsers.findIndex(u => u.id === userId);
        if (userIndex > -1) {
            mockUsers[userIndex] = user;
        }
        Alert.alert("Сохранено", `Данные пользователя ${user.name} обновлены.`);
        router.back();
    };

    if (!user) {
        return <SafeAreaView style={styles.container}><Text style={styles.title}>Пользователь не найден.</Text></SafeAreaView>;
    }

    const roleOptions = [
        { label: 'User', value: 'user' },
        { label: 'Moderator', value: 'moderator' },
        { label: 'Admin', value: 'admin' },
    ];

    const statusOptions = [
        { label: 'Active', value: 'active' },
        { label: 'Blocked', value: 'blocked' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Редактор профиля</Text>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Save color={theme.colors.lightText} size={20} />
                        <Text style={styles.saveButtonText}>Сохранить</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.profileHeader}>
                    <UserIcon color={theme.colors.primary} size={80} />
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Роль</Text>
                    <SegmentedControl
                        options={roleOptions}
                        selectedOption={user.role}
                        onSelect={(role: User['role']) => setUser(u => u ? { ...u, role } : null)}
                        theme={theme}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Статус</Text>
                    <SegmentedControl
                        options={statusOptions}
                        selectedOption={user.status}
                        onSelect={(status: User['status']) => setUser(u => u ? { ...u, status } : null)}
                        theme={theme}
                    />
                </View>

                <TouchableOpacity style={styles.deleteButton}>
                    <Trash2 color={theme.colors.lightText} size={18} />
                    <Text style={styles.deleteButtonText}>Удалить пользователя</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const getStyles = (theme: any) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    scrollContainer: { padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, },
    title: { fontSize: 26, fontFamily: 'Inter-Bold', color: theme.colors.text, },
    saveButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.primary, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, },
    saveButtonText: { color: theme.colors.lightText, fontFamily: 'Inter-SemiBold', marginLeft: 8, },
    profileHeader: { alignItems: 'center', marginBottom: 30, padding: 20, backgroundColor: theme.colors.card, borderRadius: 15 },
    userName: { fontSize: 22, fontFamily: 'Inter-Bold', color: theme.colors.text, marginTop: 15 },
    userEmail: { fontSize: 16, fontFamily: 'Inter-Regular', color: theme.colors.subtext, marginTop: 5 },
    formGroup: { marginBottom: 25 },
    label: { fontSize: 18, fontFamily: 'Inter-SemiBold', color: theme.colors.text, marginBottom: 15, },
    segmentedControlContainer: { flexDirection: 'row', backgroundColor: theme.colors.inputBackground, borderRadius: 10, padding: 4 },
    segmentButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
    segmentButtonActive: { backgroundColor: theme.colors.primary },
    segmentButtonText: { fontFamily: 'Inter-SemiBold', color: theme.colors.text },
    segmentButtonTextActive: { color: theme.colors.lightText },
    deleteButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.danger, padding: 15, borderRadius: 10, marginTop: 20, },
    deleteButtonText: { color: theme.colors.lightText, fontFamily: 'Inter-Bold', marginLeft: 10, fontSize: 16 },
}); 