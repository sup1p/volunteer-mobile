import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Star } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function FeedbackFormScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const { eventId } = useLocalSearchParams();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        const feedbackData = { eventId, rating, comment };
        console.log('Submitting feedback:', feedbackData);
        // API call to submit the feedback would go here
    };

    const StarRating = () => {
        return (
            <View style={styles.starContainer}>
                {[...Array(5)].map((_, index) => {
                    const starNumber = index + 1;
                    return (
                        <TouchableOpacity key={starNumber} onPress={() => setRating(starNumber)}>
                            <Star
                                size={40}
                                color={starNumber <= rating ? theme.colors.warning : theme.colors.disabled}
                                fill={starNumber <= rating ? theme.colors.warning : 'none'}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.form}>
                    <Text style={styles.header}>Оцените мероприятие</Text>
                    <Text style={styles.subHeader}>Event ID: {eventId}</Text>

                    <StarRating />

                    <Text style={styles.label}>Комментарий</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Поделитесь вашими впечатлениями..."
                        placeholderTextColor={theme.colors.subtext}
                        value={comment}
                        onChangeText={setComment}
                        multiline
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Отправить отзыв</Text>
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
        alignItems: 'center',
    },
    header: {
        fontSize: 22,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginBottom: 5,
    },
    subHeader: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        marginBottom: 25,
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
        width: '80%',
    },
    label: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        marginBottom: 10,
        alignSelf: 'flex-start'
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
        width: '100%',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: theme.colors.success,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    submitButtonText: {
        color: theme.colors.lightText,
        fontSize: 16,
        fontFamily: 'Inter-Bold',
    },
}); 