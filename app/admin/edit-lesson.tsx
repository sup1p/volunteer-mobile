import { useLocalSearchParams, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { mockCourses, Lesson, QuizQuestion } from '@/src/data/mockData';
import { Plus, Trash2, Save, FileText, Video, ChevronsUpDown } from 'lucide-react-native';

type ContentBlock = Lesson['content'][0];

export default function EditLessonScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const { lessonId, courseId } = useLocalSearchParams();

    // Find the original lesson from the mock data source.
    const originalLesson = mockCourses
        .find(c => c.id === courseId)?.modules
        .flatMap(m => m.lessons)
        .find(l => l.id === lessonId);

    // Use local state to manage edits. Initialize with a deep copy of the original lesson.
    const [lesson, setLesson] = useState<Lesson | null>(() => {
        return originalLesson ? JSON.parse(JSON.stringify(originalLesson)) : null;
    });

    useEffect(() => {
        // This effect will re-initialize the state if the user navigates
        // between different lessons while on this screen (e.g. via deep link).
        const foundLesson = mockCourses
            .find(c => c.id === courseId)?.modules
            .flatMap(m => m.lessons)
            .find(l => l.id === lessonId);
        setLesson(foundLesson ? JSON.parse(JSON.stringify(foundLesson)) : null);
    }, [courseId, lessonId]);

    const handleSave = () => {
        if (!lesson || !originalLesson) {
            Alert.alert("Ошибка", "Не удалось найти урок для сохранения.");
            return;
        }

        // Find the course and module to update the lesson in the global mockData.
        const course = mockCourses.find(c => c.id === courseId);
        if (course) {
            let lessonUpdated = false;
            for (const module of course.modules) {
                const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
                if (lessonIndex !== -1) {
                    // Replace the old lesson object with the new, edited one.
                    module.lessons[lessonIndex] = lesson;
                    lessonUpdated = true;
                    break;
                }
            }
            if (lessonUpdated) {
                console.log("Saving lesson:", lesson);
                Alert.alert("Сохранено", "Изменения в уроке сохранены.");
                router.back();
            } else {
                Alert.alert("Ошибка", "Не удалось найти урок в структуре курса.");
            }
        } else {
            Alert.alert("Ошибка", "Не удалось найти курс.");
        }
    };

    const updateContentBlock = (index: number, newContent: Partial<ContentBlock>) => {
        setLesson(l => {
            if (!l) return null;
            const updatedContent = [...l.content];
            updatedContent[index] = { ...updatedContent[index], ...newContent };
            return { ...l, content: updatedContent };
        });
    };

    const addContentBlock = () => {
        setLesson(l => {
            if (!l) return null;
            const newBlock: ContentBlock = { type: 'text', content: '' };
            return { ...l, content: [...l.content, newBlock] };
        });
    };

    const deleteContentBlock = (index: number) => {
        Alert.alert("Удалить блок?", "Вы уверены, что хотите удалить этот блок контента?", [
            { text: "Отмена" },
            {
                text: "Удалить", style: 'destructive', onPress: () => {
                    setLesson(l => {
                        if (!l) return null;
                        const updatedContent = l.content.filter((_, i) => i !== index);
                        return { ...l, content: updatedContent };
                    });
                }
            }
        ]);
    };

    const updateQuizQuestion = (qIndex: number, newQuestion: Partial<QuizQuestion>) => {
        setLesson(l => {
            if (!l || !l.quiz) return null;
            const updatedQuiz = [...l.quiz];
            updatedQuiz[qIndex] = { ...updatedQuiz[qIndex], ...newQuestion };
            return { ...l, quiz: updatedQuiz };
        });
    };

    const addQuizQuestion = () => {
        setLesson(l => {
            if (!l) return null;
            const newQuestion: QuizQuestion = {
                id: `q${Date.now()}`,
                question: '',
                options: ['', '', '', ''],
                correctAnswerIndex: 0,
            };
            const quiz = l.quiz ? [...l.quiz, newQuestion] : [newQuestion];
            return { ...l, quiz };
        });
    };

    const deleteQuizQuestion = (qIndex: number) => {
        Alert.alert("Удалить вопрос?", "Вы уверены, что хотите удалить этот вопрос?", [
            { text: "Отмена" },
            {
                text: "Удалить", style: 'destructive', onPress: () => {
                    setLesson(l => {
                        if (!l || !l.quiz) return null;
                        const updatedQuiz = l.quiz.filter((_, i) => i !== qIndex);
                        return { ...l, quiz: updatedQuiz };
                    });
                }
            }
        ]);
    };

    const updateOptionText = (qIndex: number, oIndex: number, text: string) => {
        setLesson(l => {
            if (!l || !l.quiz) return null;
            const updatedQuiz = [...l.quiz];
            const updatedOptions = [...updatedQuiz[qIndex].options];
            updatedOptions[oIndex] = text;
            updatedQuiz[qIndex] = { ...updatedQuiz[qIndex], options: updatedOptions };
            return { ...l, quiz: updatedQuiz };
        });
    };

    if (!lesson) {
        return <SafeAreaView style={styles.container}><Text style={styles.title}>Загрузка...</Text></SafeAreaView>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Редактор урока</Text>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Save color={theme.colors.lightText} size={20} />
                        <Text style={styles.saveButtonText}>Сохранить</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Название урока</Text>
                    <TextInput
                        style={styles.input}
                        value={lesson.title}
                        onChangeText={text => setLesson(l => l ? { ...l, title: text } : null)}
                        placeholder="Введите название урока"
                        placeholderTextColor={theme.colors.subtext}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Контент</Text>
                    {lesson.content.map((block, index) => (
                        <View key={index} style={styles.contentBlock}>
                            <View style={styles.contentHeader}>
                                <Text style={styles.contentHeaderTitle}>Блок {index + 1}: {block.type === 'text' ? 'Текст' : 'Видео'}</Text>
                                <View style={styles.contentActions}>
                                    <TouchableOpacity onPress={() => updateContentBlock(index, { type: block.type === 'text' ? 'video' : 'text' })} style={styles.actionButton}>
                                        <ChevronsUpDown color={theme.colors.primary} size={18} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteContentBlock(index)} style={styles.actionButton}>
                                        <Trash2 color={theme.colors.danger} size={18} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TextInput
                                style={styles.input}
                                value={block.content}
                                onChangeText={text => updateContentBlock(index, { content: text })}
                                placeholder={block.type === 'text' ? 'Введите текст...' : 'Введите ID видео YouTube...'}
                                placeholderTextColor={theme.colors.subtext}
                                multiline={block.type === 'text'}
                                numberOfLines={block.type === 'text' ? 4 : 1}
                            />
                        </View>
                    ))}
                    <TouchableOpacity style={styles.addButton} onPress={addContentBlock}>
                        <Plus color={theme.colors.primary} size={16} />
                        <Text style={styles.addButtonText}>Добавить блок контента</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Тест</Text>
                    {lesson.quiz?.map((q, qIndex) => (
                        <View key={q.id} style={styles.quizBlock}>
                            <View style={styles.contentHeader}>
                                <Text style={styles.contentHeaderTitle}>Вопрос {qIndex + 1}</Text>
                                <TouchableOpacity onPress={() => deleteQuizQuestion(qIndex)} style={styles.actionButton}>
                                    <Trash2 color={theme.colors.danger} size={18} />
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={styles.input}
                                value={q.question}
                                onChangeText={text => updateQuizQuestion(qIndex, { question: text })}
                                placeholder="Введите текст вопроса..."
                                placeholderTextColor={theme.colors.subtext}
                            />
                            <Text style={styles.optionsLabel}>Варианты ответа:</Text>
                            {q.options.map((option, oIndex) => (
                                <View key={oIndex} style={styles.optionInputContainer}>
                                    <TextInput
                                        style={styles.optionInput}
                                        value={option}
                                        onChangeText={text => updateOptionText(qIndex, oIndex, text)}
                                        placeholder={`Вариант ${oIndex + 1}`}
                                        placeholderTextColor={theme.colors.subtext}
                                    />
                                    <TouchableOpacity
                                        style={[styles.radio, q.correctAnswerIndex === oIndex && styles.radioSelected]}
                                        onPress={() => updateQuizQuestion(qIndex, { correctAnswerIndex: oIndex })}
                                    >
                                        {q.correctAnswerIndex === oIndex && <View style={styles.radioInner} />}
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    ))}
                    <TouchableOpacity style={styles.addButton} onPress={addQuizQuestion}>
                        <Plus color={theme.colors.primary} size={16} />
                        <Text style={styles.addButtonText}>Добавить вопрос</Text>
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
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    saveButtonText: {
        color: theme.colors.lightText,
        fontFamily: 'Inter-SemiBold',
        marginLeft: 8,
    },
    formGroup: {
        marginBottom: 25,
    },
    label: {
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        marginBottom: 10,
    },
    input: {
        backgroundColor: theme.colors.inputBackground,
        color: theme.colors.text,
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
        textAlignVertical: 'top',
    },
    contentBlock: {
        backgroundColor: theme.colors.card,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    contentHeaderTitle: {
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        fontSize: 16,
    },
    contentActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        padding: 5,
        marginLeft: 10,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        padding: 10,
        backgroundColor: `${theme.colors.primary}20`,
        borderRadius: 10,
    },
    addButtonText: {
        color: theme.colors.primary,
        fontFamily: 'Inter-SemiBold',
        marginLeft: 8,
    },
    quizBlock: {
        backgroundColor: theme.colors.card,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    optionsLabel: {
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.subtext,
        fontSize: 14,
        marginTop: 15,
        marginBottom: 5,
    },
    optionInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    optionInput: {
        flex: 1,
        backgroundColor: theme.colors.inputBackground,
        color: theme.colors.text,
        padding: 12,
        borderRadius: 8,
        fontSize: 15,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    radio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioSelected: {
        backgroundColor: theme.colors.primary,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: theme.colors.lightText,
    },
}); 