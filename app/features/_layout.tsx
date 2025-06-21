import { Stack } from 'expo-router';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Slot } from 'expo-router';

export default function FeaturesLayout() {
    const { theme } = useTheme();

    return <Slot />;
} 