import { useLocalSearchParams, router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { Award, BookOpen } from 'lucide-react-native';

export default function QuizResultsScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const { score, total, courseId } = useLocalSearchParams();

    const numericScore = Number(score);
    const numericTotal = Number(total);
    const percentage = numericTotal > 0 ? (numericScore / numericTotal) * 100 : 0;

    const getFeedback = () => {
        if (percentage === 100) return "Отлично! Все ответы верны!";
        if (percentage >= 75) return "Хорошая работа!";
        if (percentage >= 50) return "Неплохо, но можно лучше.";
        return "Стоит попробовать еще раз.";
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Award color={theme.colors.success} size={80} />
                <Text style={styles.header}>Тест завершен!</Text>
                <Text style={styles.resultText}>
                    Ваш результат: {numericScore} из {numericTotal}
                </Text>
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
                    </View>
                    <Text style={styles.percentageText}>{percentage.toFixed(0)}%</Text>
                </View>

                <Text style={styles.feedbackText}>{getFeedback()}</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.replace({ pathname: '/features/course-overview' as any, params: { courseId } })}
                >
                    <BookOpen color={theme.colors.lightText} size={20} />
                    <Text style={styles.buttonText}>Вернуться к курсу</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const getStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginTop: 20,
        marginBottom: 10,
    },
    resultText: {
        fontSize: 20,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.subtext,
        marginBottom: 30,
    },
    progressContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    progressBar: {
        width: '80%',
        height: 20,
        backgroundColor: theme.colors.border,
        borderRadius: 10,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: theme.colors.success,
    },
    percentageText: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        color: theme.colors.success,
        marginTop: 10,
    },
    feedbackText: {
        fontSize: 18,
        fontFamily: 'Inter-Medium',
        color: theme.colors.text,
        textAlign: 'center',
        marginVertical: 30,
    },
    button: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 15,
        width: '100%',
    },
    buttonText: {
        color: theme.colors.lightText,
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        marginLeft: 10,
    }
}); 