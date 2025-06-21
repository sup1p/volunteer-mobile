import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { mockUsers, User } from '@/src/data/mockData';
import { router } from 'expo-router';
import { User as UserIcon, Edit, Trash2, Search } from 'lucide-react-native';

export default function UserManagementScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const [users, setUsers] = useState(mockUsers);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleStyle = (role: User['role']) => {
        if (role === 'admin') return styles.roleAdmin;
        if (role === 'moderator') return styles.roleModerator;
        return styles.roleUser;
    };

    const getStatusStyle = (status: User['status']) => {
        if (status === 'active') return styles.statusActive;
        return styles.statusBlocked;
    };

    const renderItem = ({ item }: { item: User }) => (
        <View style={styles.userCard}>
            <UserIcon color={theme.colors.subtext} size={40} style={styles.userAvatar} />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <View style={styles.tagsContainer}>
                    <View style={[styles.tag, getRoleStyle(item.role)]}>
                        <Text style={styles.tagText}>{item.role}</Text>
                    </View>
                    <View style={[styles.tag, getStatusStyle(item.status)]}>
                        <Text style={styles.tagText}>{item.status}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => router.push({ pathname: '/admin/edit-user' as any, params: { userId: item.id } })}>
                    <Edit color={theme.colors.primary} size={22} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 15 }}>
                    <Trash2 color={theme.colors.danger} size={22} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Управление пользователями</Text>
                <View style={styles.searchContainer}>
                    <Search color={theme.colors.subtext} size={20} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Поиск по имени или email..."
                        placeholderTextColor={theme.colors.subtext}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>
            <FlatList
                data={filteredUsers}
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
    userCard: {
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
    userAvatar: { marginRight: 15 },
    userInfo: { flex: 1 },
    userName: { fontSize: 18, fontFamily: 'Inter-SemiBold', color: theme.colors.text },
    userEmail: { fontSize: 14, color: theme.colors.subtext, marginVertical: 2 },
    tagsContainer: { flexDirection: 'row', marginTop: 5 },
    tag: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginRight: 5 },
    tagText: { color: theme.colors.lightText, fontFamily: 'Inter-Medium', fontSize: 12 },
    roleAdmin: { backgroundColor: theme.colors.danger },
    roleModerator: { backgroundColor: theme.colors.warning },
    roleUser: { backgroundColor: theme.colors.success },
    statusActive: { backgroundColor: theme.colors.primary },
    statusBlocked: { backgroundColor: theme.colors.subtext },
    actions: { flexDirection: 'row', alignItems: 'center' },
}); 