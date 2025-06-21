import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { mockUserCertificates, UserCertificate } from '@/src/data/mockData';
import { ArrowLeft, Download, FileText } from 'lucide-react-native';
import { router } from 'expo-router';

const CURRENT_USER_ID = '2'; // Mock current user

const MyCertificatesScreen = () => {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const userCertificates = mockUserCertificates.filter(
        (cert) => cert.userId === CURRENT_USER_ID
    );

    const handleDownload = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    const renderCertificate = ({ item }: { item: UserCertificate }) => (
        <View style={styles.certificateItem}>
            <View style={styles.iconContainer}>
                <FileText color={theme.colors.primary} size={28} />
            </View>
            <View style={styles.certificateInfo}>
                <Text style={styles.courseTitle}>{item.courseTitle}</Text>
                <Text style={styles.issueDate}>
                    Выдан: {new Date(item.issueDate).toLocaleDateString('ru-RU')}
                </Text>
            </View>
            <TouchableOpacity onPress={() => handleDownload(item.certificateUrl)} style={styles.downloadButton}>
                <Download color={theme.colors.primary} size={24} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Мои сертификаты</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={userCertificates}
                renderItem={renderCertificate}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>У вас пока нет сертификатов.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const getStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
    },
    listContainer: {
        padding: 20,
    },
    certificateItem: {
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    iconContainer: {
        backgroundColor: theme.colors.primary + '20',
        borderRadius: 8,
        padding: 10,
        marginRight: 15,
    },
    certificateInfo: {
        flex: 1,
    },
    courseTitle: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    issueDate: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
    },
    downloadButton: {
        padding: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: theme.colors.subtext,
        fontFamily: 'Inter-Regular',
    },
});

export default MyCertificatesScreen; 