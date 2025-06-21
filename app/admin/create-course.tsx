import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { mockCourses, Course } from '@/src/data/mockData';
import * as DocumentPicker from 'expo-document-picker';
import { UploadCloud, File as FileIcon, XCircle } from 'lucide-react-native';

export default function CreateCourseScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [certificate, setCertificate] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

    const handlePickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
            });

            if (!result.canceled) {
                setCertificate(result.assets[0]);
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const handleCreateCourse = () => {
        const newCourse: Course = {
            id: Date.now().toString(),
            title,
            description,
            certificateUrl: certificate?.uri,
            modules: [],
        };
        console.log('Creating course:', newCourse);
        mockCourses.unshift(newCourse);
        router.replace({ pathname: '/admin/course-details', params: { courseId: newCourse.id } } as any);
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

                <Text style={styles.label}>Certificate (Optional)</Text>
                {certificate ? (
                    <View style={styles.fileInfoContainer}>
                        <FileIcon color="#4f46e5" size={24} />
                        <Text style={styles.fileName} numberOfLines={1}>{certificate.name}</Text>
                        <TouchableOpacity onPress={() => setCertificate(null)}>
                            <XCircle color="#ef4444" size={24} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity style={styles.uploadButton} onPress={handlePickDocument}>
                        <UploadCloud color="#4f46e5" size={24} />
                        <Text style={styles.uploadButtonText}>Upload PDF</Text>
                    </TouchableOpacity>
                )}

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
    label: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: '#555',
        marginBottom: 10,
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
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e7ff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#c7d2fe',
        borderStyle: 'dashed',
    },
    uploadButtonText: {
        color: '#4338ca',
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        marginLeft: 10,
    },
    fileInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e7ff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#c7d2fe',
    },
    fileName: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: '#333',
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