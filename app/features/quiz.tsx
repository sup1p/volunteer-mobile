import { useLocalSearchParams, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { mockCourses, QuizQuestion } from '@/src/data/mockData';
import { Check, X } from 'lucide-react-native';

export default function QuizScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const { lessonId, courseId } = useLocalSearchParams();

    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Map<string, number>>(new Map());

    useEffect(() => {
        const course = mockCourses.find(c => c.id === courseId);
        const lesson = course?.modules.flatMap(m => m.lessons).find(l => l.id === lessonId);
        setQuestions(lesson?.quiz || []);
    }, [courseId, lessonId]);

    const handleSelectAnswer = (questionId: string, answerIndex: number) => {
        const newAnswers = new Map(selectedAnswers);
        newAnswers.set(questionId, answerIndex);
        setSelectedAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleFinish = () => {
        const score = questions.reduce((acc, q, index) => {
            return selectedAnswers.get(q.id) === q.correctAnswerIndex ? acc + 1 : acc;
        }, 0);

        router.replace({
            pathname: '/features/quiz-results' as any,
            params: {
                score: score,
                total: questions.length,
                courseId: courseId,
            }
        });
    }

    if (questions.length === 0) {
        return <SafeAreaView style={styles.container}><Text style={styles.title}>Тест не найден.</Text></SafeAreaView>;
    }

    const question = questions[currentQuestionIndex];
    const selectedAnswer = selectedAnswers.get(question.id);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.progressText}>Вопрос {currentQuestionIndex + 1} из {questions.length}</Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }]} />
                </View>

                <Text style={styles.questionText}>{question.question}</Text>

                <View style={styles.optionsContainer}>
                    {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.optionButton, isSelected && styles.selectedOption]}
                                onPress={() => handleSelectAnswer(question.id, index)}
                            >
                                <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>{option}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.navigationContainer}>
                    {currentQuestionIndex < questions.length - 1 ? (
                        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                            <Text style={styles.navButtonText}>Следующий</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={[styles.navButton, styles.finishButton]} onPress={handleFinish}>
                            <Text style={styles.finishButtonText}>Завершить</Text>
                        </TouchableOpacity>
                    )}
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
        padding: 20,
    },
    progressText: {
        textAlign: 'center',
        fontFamily: 'Inter-Medium',
        color: theme.colors.subtext,
        marginBottom: 10,
    },
    progressBar: {
        height: 8,
        backgroundColor: theme.colors.border,
        borderRadius: 4,
        marginBottom: 30,
    },
    progressFill: {
        height: '100%',
        backgroundColor: theme.colors.success,
        borderRadius: 4,
    },
    questionText: {
        fontSize: 22,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginBottom: 30,
        textAlign: 'center',
    },
    optionsContainer: {
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: theme.colors.card,
        padding: 20,
        borderRadius: 15,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: theme.colors.border,
    },
    selectedOption: {
        borderColor: theme.colors.primary,
        backgroundColor: `${theme.colors.primary}20`,
    },
    optionText: {
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
    },
    selectedOptionText: {
        color: theme.colors.primary,
    },
    navigationContainer: {
        marginTop: 20,
    },
    navButton: {
        backgroundColor: theme.colors.primary,
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
    },
    navButtonText: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: theme.colors.lightText,
    },
    finishButton: {
        backgroundColor: theme.colors.success,
    },
    finishButtonText: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: theme.colors.lightText,
    },
    title: {
        fontSize: 26,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginBottom: 15,
    }
}); 