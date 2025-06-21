import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function EditProfileScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [name, setName] = useState('Александр Петров');
    const [email, setEmail] = useState('alex.petrov@email.com');

    const handleSaveChanges = () => {
        const profileData = { name, email };
        console.log('Saving changes:', profileData);
        // API call to update profile would go here
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.avatar}>
                        <User color={theme.colors.lightText} size={60} />
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.changeAvatarText}>Сменить фото</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Имя</Text>
                    <View style={styles.inputContainer}>
                        <User color={theme.colors.subtext} size={20} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Ваше имя"
                            placeholderTextColor={theme.colors.subtext}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputContainer}>
                        <Mail color={theme.colors.subtext} size={20} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Ваш email"
                            placeholderTextColor={theme.colors.subtext}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={handleSaveChanges}>
                        <Text style={styles.submitButtonText}>Сохранить изменения</Text>
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
        paddingVertical: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    changeAvatarText: {
        color: theme.colors.primary,
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
    },
    form: {
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 20,
    },
    inputIcon: {
        marginHorizontal: 15,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: theme.colors.text,
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: theme.colors.lightText,
        fontSize: 16,
        fontFamily: 'Inter-Bold',
    },
}); 