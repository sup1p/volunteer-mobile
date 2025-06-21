import { Stack, router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { UserCircle } from 'lucide-react-native';
import { mockUsers } from '@/src/data/mockData'; // Assuming current admin is the first user

export default function AdminLayout() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    // Mock getting current admin user
    const adminUser = mockUsers.find(u => u.role === 'admin');

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.card,
                },
                headerTintColor: theme.colors.text,
                headerTitleStyle: {
                    fontFamily: 'Inter-SemiBold'
                },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: 'Панель управления',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => router.push('/admin/profile' as any)} style={styles.headerRightContainer}>
                            <View>
                                <Text style={styles.adminName}>Администратор</Text>
                                <Text style={styles.adminEmail}>{adminUser?.email}</Text>
                            </View>
                            <UserCircle color={theme.colors.primary} size={32} style={styles.icon} />
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen name="events" options={{ title: 'Управление событиями' }} />
            <Stack.Screen name="courses" options={{ title: 'Управление курсами' }} />
            <Stack.Screen name="reports" options={{ title: 'User Reports' }} />
            <Stack.Screen name="initiatives" options={{ title: 'User Initiatives' }} />
            <Stack.Screen name="create-event" options={{ title: 'Create Event' }} />
            <Stack.Screen name="event-attendees" options={{ title: 'Участники события' }} />
            <Stack.Screen name="create-course" options={{ title: 'Создание курса' }} />
            <Stack.Screen name="course-details" options={{ title: 'Детали курса' }} />
            <Stack.Screen name="edit-lesson" options={{ title: 'Редактор урока' }} />
            <Stack.Screen name="users" options={{ title: 'Управление пользователями' }} />
            <Stack.Screen name="edit-user" options={{ title: 'Редактировать профиль' }} />
            <Stack.Screen name="analytics" options={{ title: 'Аналитика и Метрики' }} />
            <Stack.Screen name="profile" options={{ title: 'Профиль' }} />
        </Stack>
    );
}

const getStyles = (theme: any) => StyleSheet.create({
    headerRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10
    },
    adminName: {
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        fontSize: 14,
        textAlign: 'right',
    },
    adminEmail: {
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        fontSize: 12,
        textAlign: 'right',
    },
    icon: {
        marginLeft: 10,
    }
}); 