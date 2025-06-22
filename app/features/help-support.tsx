import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ChevronLeft,
    HelpCircle,
    ChevronDown,
    ChevronUp,
    MessageSquare,
    Mail,
    Phone,
    AlertTriangle,
    Send,
    X
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

export default function HelpSupportScreen() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
    const [showContactModal, setShowContactModal] = useState(false);
    const [showComplaintModal, setShowComplaintModal] = useState(false);
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [complaintForm, setComplaintForm] = useState({
        type: '',
        description: '',
        contact: ''
    });

    const faqData: FAQItem[] = [
        {
            id: 1,
            question: 'Как зарегистрироваться на событие?',
            answer: 'Для регистрации на событие перейдите в раздел "Календарь", выберите интересующее вас событие и нажмите кнопку "Зарегистрироваться". После подтверждения регистрации вы получите билет с QR-кодом.'
        },
        {
            id: 2,
            question: 'Как получить баллы и повысить уровень?',
            answer: 'Баллы начисляются за участие в событиях, выполнение миссий, активность в сообществе и другие полезные действия. Чем больше баллов вы набираете, тем выше становится ваш уровень и звание.'
        },
        {
            id: 3,
            question: 'Что делать, если я не могу посетить зарегистрированное событие?',
            answer: 'Если вы не можете посетить событие, отмените регистрацию не позднее чем за 24 часа до начала. Это можно сделать в разделе "Мои билеты" в вашем профиле.'
        },
        {
            id: 4,
            question: 'Как работает система достижений?',
            answer: 'Система достижений автоматически отслеживает вашу активность и награждает вас за различные достижения. Просмотреть все доступные достижения можно в разделе "Достижения" в профиле.'
        },
        {
            id: 5,
            question: 'Можно ли изменить настройки уведомлений?',
            answer: 'Да, вы можете настроить уведомления в разделе "Настройки" → "Уведомления" в вашем профиле. Там вы можете включить или отключить различные типы уведомлений.'
        },
        {
            id: 6,
            question: 'Как связаться с организаторами события?',
            answer: 'В описании каждого события наши модераторы оставаляют свои контакты, обычнр это в самом низу описания.'
        }
    ];

    const toggleFAQ = (id: number) => {
        setExpandedFAQ(expandedFAQ === id ? null : id);
    };

    const handleContactSubmit = () => {
        if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
            Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
            return;
        }

        Alert.alert(
            'Сообщение отправлено',
            'Мы получили ваше обращение и ответим в ближайшее время.',
            [{ text: 'OK', onPress: () => setShowContactModal(false) }]
        );

        setContactForm({ name: '', email: '', subject: '', message: '' });
    };

    const handleComplaintSubmit = () => {
        if (!complaintForm.type || !complaintForm.description) {
            Alert.alert('Ошибка', 'Пожалуйста, заполните все обязательные поля');
            return;
        }

        Alert.alert(
            'Жалоба отправлена',
            'Ваша жалоба принята к рассмотрению. Мы свяжемся с вами в ближайшее время.',
            [{ text: 'OK', onPress: () => setShowComplaintModal(false) }]
        );

        setComplaintForm({ type: '', description: '', contact: '' });
    };

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Часто задаваемые вопросы</Text>
                    <Text style={styles.sectionDescription}>
                        Найдите ответы на самые популярные вопросы
                    </Text>
                </View>

                <View style={styles.faqContainer}>
                    {faqData.map((item) => (
                        <View key={item.id} style={styles.faqItem}>
                            <TouchableOpacity
                                style={styles.faqQuestion}
                                onPress={() => toggleFAQ(item.id)}
                            >
                                <Text style={styles.faqQuestionText}>{item.question}</Text>
                                {expandedFAQ === item.id ? (
                                    <ChevronUp color={theme.colors.subtext} size={20} />
                                ) : (
                                    <ChevronDown color={theme.colors.subtext} size={20} />
                                )}
                            </TouchableOpacity>
                            {expandedFAQ === item.id && (
                                <View style={styles.faqAnswer}>
                                    <Text style={styles.faqAnswerText}>{item.answer}</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Обратиться к поддержке</Text>
                    <Text style={styles.sectionDescription}>
                        Не нашли ответ на свой вопрос? Свяжитесь с нами
                    </Text>
                </View>

                <View style={styles.contactContainer}>
                    <TouchableOpacity
                        style={styles.contactCard}
                        onPress={() => setShowContactModal(true)}
                    >
                        <MessageSquare color={theme.colors.primary} size={24} />
                        <Text style={styles.contactCardTitle}>Написать сообщение</Text>
                        <Text style={styles.contactCardDescription}>
                            Отправьте нам сообщение через форму обратной связи
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.contactCard}
                        onPress={() => setShowComplaintModal(true)}
                    >
                        <AlertTriangle color={theme.colors.danger} size={24} />
                        <Text style={styles.contactCardTitle}>Оставить жалобу о приложении</Text>
                        <Text style={styles.contactCardDescription}>
                            Сообщите о проблеме или нарушении
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Контакты</Text>
                </View>

                <View style={styles.contactsContainer}>
                    <View style={styles.contactItem}>
                        <Mail color={theme.colors.primary} size={20} />
                        <View style={styles.contactInfo}>
                            <Text style={styles.contactLabel}>Email</Text>
                            <Text style={styles.contactValue}>support@project-bolt.ru</Text>
                        </View>
                    </View>

                    <View style={styles.contactItem}>
                        <Phone color={theme.colors.primary} size={20} />
                        <View style={styles.contactInfo}>
                            <Text style={styles.contactLabel}>Телефон</Text>
                            <Text style={styles.contactValue}>8-800-555-0123</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Модальное окно для обращения к поддержке */}
            <Modal
                visible={showContactModal}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Обращение к поддержке</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setShowContactModal(false)}
                            >
                                <X color={theme.colors.text} size={24} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Ваше имя"
                            placeholderTextColor={theme.colors.subtext}
                            value={contactForm.name}
                            onChangeText={(text) => setContactForm({ ...contactForm, name: text })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={theme.colors.subtext}
                            value={contactForm.email}
                            onChangeText={(text) => setContactForm({ ...contactForm, email: text })}
                            keyboardType="email-address"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Тема обращения"
                            placeholderTextColor={theme.colors.subtext}
                            value={contactForm.subject}
                            onChangeText={(text) => setContactForm({ ...contactForm, subject: text })}
                        />

                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Сообщение"
                            placeholderTextColor={theme.colors.subtext}
                            value={contactForm.message}
                            onChangeText={(text) => setContactForm({ ...contactForm, message: text })}
                            multiline
                            numberOfLines={4}
                        />

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleContactSubmit}
                        >
                            <Send color={theme.colors.lightText} size={20} />
                            <Text style={styles.submitButtonText}>Отправить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Модальное окно для жалобы */}
            <Modal
                visible={showComplaintModal}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Оставить жалобу</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setShowComplaintModal(false)}
                            >
                                <X color={theme.colors.text} size={24} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Тип жалобы (например: нарушение правил, техническая проблема)"
                            placeholderTextColor={theme.colors.subtext}
                            value={complaintForm.type}
                            onChangeText={(text) => setComplaintForm({ ...complaintForm, type: text })}
                        />

                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Описание проблемы *"
                            placeholderTextColor={theme.colors.subtext}
                            value={complaintForm.description}
                            onChangeText={(text) => setComplaintForm({ ...complaintForm, description: text })}
                            multiline
                            numberOfLines={4}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Контакт для связи (необязательно)"
                            placeholderTextColor={theme.colors.subtext}
                            value={complaintForm.contact}
                            onChangeText={(text) => setComplaintForm({ ...complaintForm, contact: text })}
                        />

                        <TouchableOpacity
                            style={[styles.submitButton, { backgroundColor: theme.colors.danger }]}
                            onPress={handleComplaintSubmit}
                        >
                            <AlertTriangle color={theme.colors.lightText} size={20} />
                            <Text style={styles.submitButtonText}>Отправить жалобу</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const getStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        flex: 1,
        textAlign: 'center',
    },
    headerSpacer: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    section: {
        marginTop: 24,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        lineHeight: 22,
    },
    faqContainer: {
        backgroundColor: theme.colors.card,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 24,
    },
    faqItem: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    faqQuestion: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    faqQuestionText: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        flex: 1,
        marginRight: 16,
    },
    faqAnswer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    faqAnswerText: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        lineHeight: 20,
    },
    contactContainer: {
        marginBottom: 24,
    },
    contactCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        alignItems: 'center',
    },
    contactCardTitle: {
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
        marginTop: 12,
        marginBottom: 8,
    },
    contactCardDescription: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        textAlign: 'center',
        lineHeight: 20,
    },
    contactsContainer: {
        backgroundColor: theme.colors.card,
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    contactInfo: {
        marginLeft: 16,
        flex: 1,
    },
    contactLabel: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: theme.colors.subtext,
        marginBottom: 4,
    },
    contactValue: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.text,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: theme.colors.card,
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 400,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text,
    },
    closeButton: {
        padding: 4,
    },
    input: {
        backgroundColor: theme.colors.background,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: theme.colors.text,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: theme.colors.lightText,
        marginLeft: 8,
    },
}); 