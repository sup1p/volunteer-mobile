import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';

export default function InitiativeScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [title, setTitle] = useState('');
    const [problem, setProblem] = useState('');
    const [solution, setSolution] = useState('');

    const handleSubmit = () => {
        const initiativeData = { title, problem, solution };
        console.log('Submitting initiative:', initiativeData);
        // API call to submit the initiative would go here
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.form}>
                    <Text style={styles.label}>Название инициативы</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Краткое и ясное название"
                        placeholderTextColor={theme.colors.subtext}
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.label}>Описание проблемы</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Опишите проблему, которую решает инициатива"
                        placeholderTextColor={theme.colors.subtext}
                        value={problem}
                        onChangeText={setProblem}
                        multiline
                    />

                    <Text style={styles.label}>Предлагаемое решение</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Опишите, как ваша инициатива поможет решить проблему"
                        placeholderTextColor={theme.colors.subtext}
                        value={solution}
                        onChangeText={setSolution}
                        multiline
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Опубликовать инициативу</Text>
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
    form: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        marginBottom: 10,
    },
    input: {
        backgroundColor: theme.colors.inputBackground,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: theme.colors.text,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: theme.colors.warning,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: theme.colors.lightText,
        fontSize: 16,
        fontFamily: 'Inter-Bold',
    },
}); 