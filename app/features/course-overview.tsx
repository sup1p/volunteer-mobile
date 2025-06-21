import { useLocalSearchParams, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Book, FileText, ChevronDown, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { mockCourses, Course, Module, Lesson } from '@/src/data/mockData';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CourseOverviewScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const { courseId } = useLocalSearchParams();
    const [course, setCourse] = useState<Course | undefined>(undefined);
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

    useEffect(() => {
        const foundCourse = mockCourses.find((c: Course) => c.id === courseId);
        setCourse(foundCourse);
    }, [courseId]);

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

    const handleLessonClick = (lesson: Lesson) => {
        router.push({
            pathname: '/features/lesson-details' as any,
            params: { lessonId: lesson.id, courseId: course?.id }
        });
    }

    if (!course) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centered}>
                    <Text style={styles.sectionTitle}>Курс не найден</Text>
                </View>
            </SafeAreaView>
        );
    }

    const renderLesson = (item: Lesson) => (
        <TouchableOpacity style={styles.lessonItem} key={item.id} onPress={() => handleLessonClick(item)}>
            <FileText color={theme.colors.subtext} size={16} style={styles.itemIcon} />
            <Text style={styles.lessonTitle}>{item.title}</Text>
            <ChevronRight color={theme.colors.subtext} size={16} />
        </TouchableOpacity>
    );

    const renderModule = (item: Module) => {
        const isExpanded = expandedModules.has(item.id);
        return (
            <View style={styles.moduleCard} key={item.id}>
                <TouchableOpacity style={styles.moduleHeader} onPress={() => toggleModule(item.id)}>
                    <Book color={theme.colors.primary} size={20} style={styles.itemIcon} />
                    <Text style={styles.moduleTitle}>{item.title}</Text>
                    <ChevronDown color={theme.colors.primary} size={20} style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }} />
                </TouchableOpacity>
                {isExpanded && (
                    <View style={styles.lessonsContainer}>
                        {item.lessons.map(renderLesson)}
                    </View>
                )}
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.courseTitle}>{course.title}</Text>
                    <Text style={styles.courseDescription}>{course.description}</Text>
                </View>

                <View style={styles.modulesSection}>
                    <Text style={styles.sectionTitle}>Содержание курса</Text>
                    {course.modules.map(renderModule)}
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
    header: {
        backgroundColor: theme.colors.card,
        padding: 20,
        paddingBottom: 25,
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
        lineHeight: 24,
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
}); 