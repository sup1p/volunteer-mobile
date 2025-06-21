import { useLocalSearchParams, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Book, FileText, PlayCircle, HelpCircle } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { mockCourses, Lesson } from '@/src/data/mockData';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function LessonDetailsScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const { lessonId, courseId } = useLocalSearchParams();
    const [lesson, setLesson] = useState<Lesson | undefined>(undefined);

    useEffect(() => {
        const course = mockCourses.find(c => c.id === courseId);
        const foundLesson = course?.modules.flatMap(m => m.lessons).find(l => l.id === lessonId);
        setLesson(foundLesson);
    }, [courseId, lessonId]);

    const handleQuizStart = () => {
        router.push({
            pathname: '/features/quiz' as any,
            params: { lessonId: lesson?.id, courseId: courseId }
        });
    }

    if (!lesson) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centered}>
                    <Text style={styles.title}>Урок не найден</Text>
                </View>
            </SafeAreaView>
        );
    }

    const renderContent = () => {
        return lesson.content.map((item, index) => {
            if (item.type === 'text') {
                return <Text key={index} style={styles.textContent}>{item.content}</Text>;
            }
            if (item.type === 'video') {
                return (
                    <View key={index} style={styles.videoContainer}>
                        <YoutubePlayer
                            height={220}
                            play={false}
                            videoId={item.content}
                            onChangeState={(event: string) => {
                                if (event === 'error') {
                                    Alert.alert('Ошибка', 'Не удалось загрузить видео.');
                                }
                            }}
                        />
                    </View>
                );
            }
            return null;
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>{lesson.title}</Text>
                <View style={styles.divider} />
                {renderContent()}

                {lesson.quiz && lesson.quiz.length > 0 && (
                    <TouchableOpacity style={styles.quizButton} onPress={handleQuizStart}>
                        <HelpCircle color={theme.colors.lightText} size={20} />
                        <Text style={styles.quizButtonText}>Начать тест</Text>
                    </TouchableOpacity>
                )}
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginBottom: 15,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: 15,
    },
    textContent: {
        fontSize: 17,
        fontFamily: 'Inter-Regular',
        color: theme.colors.text,
        lineHeight: 26,
        marginBottom: 20,
    },
    videoContainer: {
        marginVertical: 10,
        borderRadius: 15,
        overflow: 'hidden',
    },
    quizButton: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
    },
    quizButtonText: {
        color: theme.colors.lightText,
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        marginLeft: 10,
    }
}); 