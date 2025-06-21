import { Stack } from 'expo-router';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function FeaturesLayout() {
    const { theme } = useTheme();

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.card,
                },
                headerTintColor: theme.colors.text,
                headerTitleStyle: {
                    color: theme.colors.text,
                },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="report" options={{ title: 'Подать сигнал' }} />
            <Stack.Screen name="initiative" options={{ title: 'Создать инициативу' }} />
            <Stack.Screen name="feedback" options={{ title: 'Обратная связь' }} />
            <Stack.Screen name="feedback-form" options={{ title: 'Оставить отзыв' }} />
            <Stack.Screen name="learning" options={{ title: 'Обучение' }} />
            <Stack.Screen name="course-overview" options={{ title: 'Обзор курса' }} />
            <Stack.Screen name="lesson-details" options={{ title: 'Урок' }} />
            <Stack.Screen name="quiz" options={{ title: 'Тест' }} />
            <Stack.Screen name="quiz-results" options={{ title: 'Результаты теста' }} />
            <Stack.Screen name="edit-profile" options={{ title: 'Редактировать профиль' }} />
            <Stack.Screen name="settings" options={{ title: 'Настройки' }} />
        </Stack>
    );
} 