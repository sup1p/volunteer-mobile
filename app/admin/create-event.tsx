import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateEventScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [points, setPoints] = useState('');

    const handleCreateEvent = () => {
        const eventData = {
            title,
            description,
            date,
            time,
            location,
            maxParticipants: parseInt(maxParticipants, 10),
            points: parseInt(points, 10),
        };
        console.log('Creating event:', eventData);
        // Here you would typically call an API to create the event
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Create New Event</Text>
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Event Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Date (YYYY-MM-DD)"
                        value={date}
                        onChangeText={setDate}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Time (HH:MM)"
                        value={time}
                        onChangeText={setTime}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Location"
                        value={location}
                        onChangeText={setLocation}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Max Participants"
                        value={maxParticipants}
                        onChangeText={setMaxParticipants}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Points"
                        value={points}
                        onChangeText={setPoints}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
                        <Text style={styles.createButtonText}>Create Event</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
        paddingBottom: 40,
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
    createButton: {
        backgroundColor: '#667eea',
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