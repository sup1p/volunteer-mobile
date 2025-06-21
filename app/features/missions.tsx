import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { mockMissions, Mission } from '@/src/data/mockData';
import { Calendar, Clock, Star, Plus, Target } from 'lucide-react-native';

export default function MissionsScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return theme.colors.success;
            case 'medium':
                return theme.colors.warning;
            case 'hard':
                return theme.colors.danger;
            default:
                return theme.colors.subtext;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'daily':
                return <Clock size={14} color={theme.colors.primary} />;
            case 'weekly':
                return <Calendar size={14} color={theme.colors.primary} />;
            case 'special':
                return <Star size={14} color={theme.colors.warning} />;
            default:
                return <Target size={14} color={theme.colors.primary} />;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Все миссии</Text>
                {mockMissions.map(mission => (
                    <TouchableOpacity key={mission.id} style={styles.missionCard}>
                        <View style={styles.missionIcon}>
                            {getTypeIcon(mission.type)}
                        </View>
                        <View style={styles.missionDetails}>
                            <Text style={styles.missionTitle}>{mission.title}</Text>
                            <View style={styles.missionMeta}>
                                <Text style={[styles.missionDifficulty, { color: getDifficultyColor(mission.difficulty) }]}>
                                    {mission.difficulty}
                                </Text>
                                <Text style={styles.missionPoints}>
                                    <Star size={12} color={theme.colors.warning} /> {mission.points} баллов
                                </Text>
                            </View>
                        </View>
                        <View style={styles.missionAction}>
                            <Plus size={20} color={theme.colors.primary} />
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
    missionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    missionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    missionDetails: {
        flex: 1,
    },
    missionTitle: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        marginBottom: 5,
    },
    missionMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    missionDifficulty: {
        fontSize: 12,
        fontFamily: 'Inter-Medium',
        textTransform: 'capitalize',
        marginRight: 10,
    },
    missionPoints: {
        fontSize: 12,
        fontFamily: 'Inter-Medium',
        color: theme.colors.subtext,
        flexDirection: 'row',
        alignItems: 'center',
    },
    missionAction: {
        marginLeft: 10,
    },
}); 