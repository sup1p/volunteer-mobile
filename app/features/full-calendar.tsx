import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { mockEvents, AppEvent } from '@/src/data/mockData';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { router } from 'expo-router';
import { Clock, Tag } from 'lucide-react-native';

LocaleConfig.locales['ru'] = {
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
};
LocaleConfig.defaultLocale = 'ru';

export default function FullCalendarScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

    const markedDates = useMemo(() => {
        const markings: { [key: string]: any } = {};

        // Add markings for all events
        mockEvents.forEach(event => {
            const date = event.date.slice(0, 10);
            markings[date] = {
                customStyles: {
                    container: {
                        backgroundColor: theme.colors.primary + '40', // Primary with transparency
                        borderRadius: 8,
                    },
                    text: {
                        color: theme.colors.text,
                    },
                },
            };
        });

        // Override style for the selected date
        const selectedDateStyles = {
            customStyles: {
                container: {
                    backgroundColor: theme.colors.primary,
                    borderRadius: 8,
                },
                text: {
                    color: theme.colors.lightText,
                    fontWeight: 'bold',
                },
            },
        };

        markings[selectedDate] = {
            ...(markings[selectedDate] || {}),
            ...selectedDateStyles
        };


        return markings;
    }, [selectedDate, theme]);

    const eventsForSelectedDate = useMemo(() => {
        return mockEvents.filter(event => event.date.slice(0, 10) === selectedDate);
    }, [selectedDate]);

    const onDayPress = (day: any) => {
        setSelectedDate(day.dateString);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Календарь</Text>
                <View style={styles.calendarContainer}>
                    <Calendar
                        onDayPress={onDayPress}
                        markingType={'custom'}
                        markedDates={markedDates}
                        theme={{
                            backgroundColor: theme.colors.card,
                            calendarBackground: theme.colors.card,
                            textSectionTitleColor: theme.colors.subtext,
                            selectedDayBackgroundColor: theme.colors.primary,
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: theme.colors.primary,
                            dayTextColor: theme.colors.text,
                            textDisabledColor: theme.colors.border,
                            arrowColor: theme.colors.primary,
                            monthTextColor: theme.colors.text,
                            indicatorColor: theme.colors.primary,
                            textDayFontFamily: 'Inter-Regular',
                            textMonthFontFamily: 'Inter-Bold',
                            textDayHeaderFontFamily: 'Inter-SemiBold',
                            textDayFontSize: 16,
                            textMonthFontSize: 20,
                            textDayHeaderFontSize: 14,
                        }}
                    />
                </View>
                <View style={styles.eventsList}>
                    <Text style={styles.eventsListTitle}>События на {new Date(selectedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</Text>
                    {eventsForSelectedDate.length > 0 ? (
                        eventsForSelectedDate.map(event => (
                            <TouchableOpacity key={event.id} style={styles.eventCard}>
                                <View style={styles.eventDetails}>
                                    <Text style={styles.eventTitle}>{event.title}</Text>
                                    <View style={styles.eventMeta}>
                                        <Clock size={14} color={theme.colors.subtext} />
                                        <Text style={styles.metaText}>{new Date(event.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.noEventsText}>На эту дату нет событий.</Text>
                    )}
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
    title: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        paddingHorizontal: 20,
        paddingTop: 20,
        marginBottom: 10,
    },
    calendarContainer: {
        marginHorizontal: 15,
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        overflow: 'hidden',
    },
    eventsList: {
        padding: 20,
        marginTop: 10,
    },
    eventsListTitle: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginBottom: 15,
    },
    eventCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    eventDetails: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        marginBottom: 5,
    },
    eventMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        marginLeft: 6,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
    },
    noEventsText: {
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
    },
}); 