import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Palette, Languages, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsScreen() {
    const { theme, isDarkMode, toggleTheme } = useTheme();
    const styles = getStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Уведомления</Text>
                    <TouchableOpacity style={styles.row}>
                        <Bell color={theme.colors.subtext} size={22} style={styles.icon} />
                        <Text style={styles.rowTitle}>Настроить уведомления</Text>
                        <ChevronRight color={theme.colors.subtext} size={22} />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Внешний вид</Text>
                    <View style={styles.row}>
                        <Palette color={theme.colors.subtext} size={22} style={styles.icon} />
                        <Text style={styles.rowTitle}>Тёмная тема</Text>
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleTheme}
                            trackColor={{ false: '#767577', true: theme.colors.primary }}
                            thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Язык</Text>
                    <TouchableOpacity style={styles.row}>
                        <Languages color={theme.colors.subtext} size={22} style={styles.icon} />
                        <Text style={styles.rowTitle}>Русский</Text>
                        <ChevronRight color={theme.colors.subtext} size={22} />
                    </TouchableOpacity>
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
    scrollContainer: {
        paddingVertical: 24,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.subtext,
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 50,
    },
    icon: {
        marginRight: 16,
    },
    rowTitle: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: theme.colors.text,
    },
}); 