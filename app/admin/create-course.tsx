import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function CreateCourseScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateCourse = () => {
        const courseData = {
            title,
            description,
        };
        console.log('Creating course:', courseData);
        // In a real app, you'd get a courseId from the API
        const newCourseId = Date.now().toString();
        router.replace({ pathname: '/admin/course-details', params: { courseId: newCourseId } } as any);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Create New Course</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Course Title"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Course Description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
                <TouchableOpacity style={styles.createButton} onPress={handleCreateCourse}>
                    <Text style={styles.createButtonText}>Create and Add Modules</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        padding: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: 'Inter-Bold',
        color: '#333',
    },
    form: {
        padding: 20,
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    createButton: {
        backgroundColor: '#10b981',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Inter-Bold',
    },
}); 