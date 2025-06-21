import { useLocalSearchParams, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Book, File, Edit, Trash2, ChevronDown } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { mockCourses, Course, Module, Lesson } from '@/src/data/mockData';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AdminCourseDetailsScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const { courseId } = useLocalSearchParams();

    // In a real app, this state would be managed with a global state manager (like Redux/Zustand)
    // and API calls. For this mock, we modify the global mockData array directly.
    const [course, setCourse] = useState<Course | undefined>(() => mockCourses.find(c => c.id === courseId));
    const [_, setForceUpdate] = useState(0); // Helper to force re-renders on mutation
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

    // This effect is less critical now but can be used for debugging or re-finding if ID changes
    useEffect(() => {
        const foundCourse = mockCourses.find(c => c.id === courseId);
        setCourse(foundCourse);
    }, [courseId]);

    const forceUpdate = () => setForceUpdate(f => f + 1);

    const toggleModule = (moduleId: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const newSet = new Set(expandedModules);
        if (newSet.has(moduleId)) {
            newSet.delete(moduleId);
        } else {
            newSet.add(moduleId);
        }
        setExpandedModules(newSet);
    };

    const handleAddModule = () => {
        if (!course) return;
        const newModule: Module = {
            id: `m${Date.now()}`,
            title: 'Новый модуль',
            lessons: [],
        };
        course.modules.push(newModule);
        forceUpdate();
    };

    const handleAddLesson = (moduleId: string) => {
        if (!course) return;

        const module = course.modules.find(m => m.id === moduleId);
        if (!module) return;

        const newLesson: Lesson = {
            id: `l${Date.now()}`,
            title: 'Новый урок',
            content: [{ type: 'text', content: '' }],
            quiz: [],
        };

        module.lessons.push(newLesson);

        router.push({ pathname: '/admin/edit-lesson' as any, params: { courseId, lessonId: newLesson.id } });
    };

    const handleEditLesson = (lesson: Lesson) => {
        // Navigate to a new screen for editing lessons
        router.push({ pathname: '/admin/edit-lesson' as any, params: { courseId, lessonId: lesson.id } });
    }

    const handleDeleteLesson = (moduleId: string, lessonId: string) => {
        Alert.alert("Удалить урок?", "Это действие нельзя будет отменить.", [
            { text: "Отмена" },
            {
                text: "Удалить", style: 'destructive', onPress: () => {
                    if (!course) return;
                    const module = course.modules.find(m => m.id === moduleId);
                    if (module) {
                        module.lessons = module.lessons.filter(l => l.id !== lessonId);
                        forceUpdate();
                    }
                }
            }
        ]);
    };

    if (!course) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centered}>
                    <Text style={styles.sectionTitle}>Курс не найден</Text>
                </View>
            </SafeAreaView>
        );
    }

    const renderLesson = (module: Module, lesson: Lesson) => (
        <View style={styles.lessonItem} key={lesson.id}>
            <File color={theme.colors.subtext} size={16} style={styles.itemIcon} />
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <TouchableOpacity style={styles.iconButton} onPress={() => handleEditLesson(lesson)}>
                <Edit color={theme.colors.primary} size={18} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => handleDeleteLesson(module.id, lesson.id)}>
                <Trash2 color={theme.colors.danger} size={18} />
            </TouchableOpacity>
        </View>
    );

    const renderModule = (module: Module) => {
        const isExpanded = expandedModules.has(module.id);
        return (
            <View style={styles.moduleCard} key={module.id}>
                <TouchableOpacity style={styles.moduleHeader} onPress={() => toggleModule(module.id)}>
                    <Book color={theme.colors.primary} size={20} style={styles.itemIcon} />
                    <Text style={styles.moduleTitle}>{module.title}</Text>
                    <ChevronDown color={theme.colors.primary} size={20} style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }} />
                </TouchableOpacity>

                {isExpanded && (
                    <View style={styles.lessonsContainer}>
                        {module.lessons.map(lesson => renderLesson(module, lesson))}
                        <TouchableOpacity style={styles.addButton} onPress={() => handleAddLesson(module.id)}>
                            <Plus color={theme.colors.primary} size={16} />
                            <Text style={styles.addButtonText}>Добавить урок</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.courseHeader}>
                    <Text style={styles.courseTitle}>{course.title}</Text>
                    <Text style={styles.courseDescription}>{course.description}</Text>
                </View>

                <View style={styles.modulesSection}>
                    <Text style={styles.sectionTitle}>Модули курса</Text>
                    {course.modules.map(renderModule)}
                    <TouchableOpacity style={styles.addModuleButton} onPress={handleAddModule}>
                        <Plus color={theme.colors.lightText} size={18} />
                        <Text style={styles.addModuleButtonText}>Добавить модуль</Text>
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    courseHeader: {
        backgroundColor: theme.colors.card,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    courseTitle: {
        fontSize: 24,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
    },
    courseDescription: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        marginTop: 10,
    },
    modulesSection: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        marginBottom: 15,
    },
    moduleCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        marginBottom: 15,
        padding: 20,
        overflow: 'hidden',
    },
    moduleHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moduleTitle: {
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        flex: 1,
    },
    lessonsContainer: {
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: 5,
    },
    lessonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    lessonTitle: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: theme.colors.text,
        flex: 1,
    },
    itemIcon: {
        marginRight: 10,
    },
    iconButton: {
        padding: 5,
        marginLeft: 10,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        padding: 10,
        backgroundColor: `${theme.colors.primary}20`,
        borderRadius: 10,
    },
    addButtonText: {
        color: theme.colors.primary,
        fontFamily: 'Inter-SemiBold',
        marginLeft: 5,
    },
    addModuleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.success,
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    addModuleButtonText: {
        color: theme.colors.lightText,
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        marginLeft: 10,
    },
}); 