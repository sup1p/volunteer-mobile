import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ReportScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [isAnonymous, setIsAnonymous] = useState(false);

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState(null);
    const [items, setItems] = useState([
        { label: 'Нарушение правил', value: 'Нарушение правил' },
        { label: 'Техническая проблема', value: 'Техническая проблема' },
        { label: 'Предложение по улучшению', value: 'Предложение по улучшению' },
        { label: 'Жалоба на пользователя', value: 'Жалоба на пользователя' },
        { label: 'Проблема с контентом', value: 'Проблема с контентом' },
        { label: 'Другое', value: 'Другое' }
    ]);


    const handleSubmit = () => {
        const reportData = { title, description, category, date, isAnonymous };
        console.log('Submitting report:', reportData);
        // API call to submit the report would go here
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.form}>
                    <Text style={styles.label}>Заголовок</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Кратко опишите суть проблемы"
                        placeholderTextColor={theme.colors.subtext}
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.label}>Описание</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Подробно опишите ситуацию"
                        placeholderTextColor={theme.colors.subtext}
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />

                    <Text style={styles.label}>Категория</Text>
                    <DropDownPicker
                        open={open}
                        value={category}
                        items={items}
                        setOpen={setOpen}
                        setValue={setCategory}
                        setItems={setItems}
                        placeholder="Выберите категорию"
                        style={styles.dropdown}
                        containerStyle={styles.dropdownContainer}
                        dropDownContainerStyle={styles.dropdownBox}
                        placeholderStyle={styles.placeholder}
                        listItemLabelStyle={styles.dropdownListItem}
                        selectedItemLabelStyle={styles.dropdownSelectedItem}
                        zIndex={3000}
                        zIndexInverse={1000}
                    />


                    <Text style={styles.label}>Дата происшествия</Text>
                    <TextInput
                        style={styles.input}
                        value={date}
                        placeholderTextColor={theme.colors.subtext}
                        onChangeText={setDate}
                        keyboardType="numeric"
                    />

                    <View style={styles.attachmentContainer}>
                        <Feather name="paperclip" size={20} color={theme.colors.primary} />
                        <Text style={styles.attachmentText}>Прикрепить файлы (фото, видео, документы)</Text>
                    </View>

                    <View style={styles.anonymousContainer}>
                        <Text style={styles.anonymousLabel}>Отправить анонимно</Text>
                        <Switch
                            trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
                            thumbColor={isAnonymous ? theme.colors.primary : theme.colors.border}
                            ios_backgroundColor={theme.colors.disabled}
                            onValueChange={setIsAnonymous}
                            value={isAnonymous}
                        />
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Отправить сигнал</Text>
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
    dropdown: {
        backgroundColor: theme.colors.inputBackground,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 20,
    },
    dropdownContainer: {
        height: 58,
        marginBottom: 20,
    },
    dropdownBox: {
        backgroundColor: theme.colors.inputBackground,
        borderColor: theme.colors.border,
    },
    placeholder: {
        color: theme.colors.subtext,
        fontFamily: 'Inter-Regular',
    },
    dropdownListItem: {
        fontFamily: 'Inter-Regular',
        color: theme.colors.text,
    },
    dropdownSelectedItem: {
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.primary,
    },
    attachmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        marginBottom: 20,
    },
    attachmentText: {
        marginLeft: 10,
        color: theme.colors.primary,
        fontFamily: 'Inter-Medium'
    },
    anonymousContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    anonymousLabel: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: theme.colors.text,
    },
    submitButton: {
        backgroundColor: theme.colors.danger,
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