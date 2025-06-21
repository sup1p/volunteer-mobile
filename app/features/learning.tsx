import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, CheckCircle, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

interface Course {
    id: string;
    title: string;
    description: string;
}

export default function LearningScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [courses, setCourses] = useState([
        {
            title: 'Доступные курсы',
            data: [
                { id: '1', title: 'Основы антикоррупционного права', description: 'Изучите базовые принципы и законы.' },
                { id: '2', title: 'Продвинутые техники расследования', description: 'Научитесь выявлять сложные схемы.' },
            ],
        },
        {
            title: 'Пройденные курсы',
            data: [
                { id: '3', title: 'Знаток права', description: 'Прошли 3 курса по антикоррупционному правu' },
            ],
        },
    ]);

    const handlePressCourse = (courseId: string) => {
        router.push({ pathname: '/features/course-overview', params: { courseId } } as any);
    };

    const renderCourse = ({ item, section }: { item: Course, section: { title: string } }) => (
        <TouchableOpacity style={styles.courseCard} onPress={() => handlePressCourse(item.id)}>
            <View style={styles.courseIcon}>
                {section.title === 'Пройденные курсы' ? (
                    <CheckCircle color={theme.colors.success} size={24} />
                ) : (
                    <BookOpen color={theme.colors.primary} size={24} />
                )}
            </View>
            <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{item.title}</Text>
                <Text style={styles.courseDescription}>{item.description}</Text>
            </View>
            <ChevronRight color={theme.colors.disabled} size={24} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <SectionList
                sections={courses}
                keyExtractor={(item, index) => item.id + index}
                renderItem={renderCourse}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
}

const getStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    sectionHeader: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginBottom: 15,
        marginTop: 10,
    },
    courseCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: theme.colors.text,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    courseIcon: {
        marginRight: 15,
    },
    courseInfo: {
        flex: 1,
    },
    courseTitle: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
    },
    courseDescription: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        marginTop: 4,
    },
}); 