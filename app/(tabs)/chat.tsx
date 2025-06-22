import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Bot, User, CircleHelp as HelpCircle, FileText, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'suggestion' | 'normal';
}

interface QuickAction {
  id: string;
  title: string;
  icon: any;
  response: string;
}

export default function ChatScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Здравствуйте! Я ваш ИИ-помощник в антикоррупционной деятельности. Могу помочь с вопросами о том, как выявлять коррупцию, куда обращаться с сигналами и как действовать в различных ситуациях. Чем могу помочь?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Как сообщить о коррупции?',
      icon: AlertTriangle,
      response: 'Есть несколько способов сообщить о коррупции:\n\n1. Горячая линия Генпрокуратуры: 8-800-200-78-78\n2. Сайт Следственного комитета: sledcom.ru\n3. Приложение "Госуслуги"\n4. Региональные антикоррупционные органы\n\nВажно: вы можете подать сигнал анонимно. Приложите документы или фото, если есть.',
    },
    {
      id: '2',
      title: 'Что делать на мероприятии?',
      icon: HelpCircle,
      response: 'Рекомендации для участия в антикоррупционных мероприятиях:\n\n✅ Соблюдайте мирный характер\n✅ Фиксируйте нарушения на фото/видео\n✅ Взаимодействуйте с организаторами\n✅ Не провоцируйте конфликты\n✅ При необходимости обращайтесь к правоохранителям\n\nПомните: цель - привлечь внимание к проблеме, а не создать беспорядки.',
    },
    {
      id: '3',
      title: 'Признаки коррупции',
      icon: FileText,
      response: 'Основные признаки коррупционных действий:\n\n🔴 Требование неофициальных платежей\n🔴 Необоснованные задержки в оказании услуг\n🔴 Предложение "ускорить" процесс за деньги\n🔴 Принуждение к покупке у определенных поставщиков\n🔴 Завышенные цены в госзакупках\n🔴 Непрозрачность процедур\n\nЕсли заметили такое - обязательно сообщите!',
    },
  ];

  const predefinedResponses = [
    {
      keywords: ['регистрация', 'как зарегистрироваться', 'регистрация на мероприятие'],
      response: 'Для регистрации на мероприятие:\n\n1. Перейдите в раздел "Главная"\n2. Выберите интересующее событие\n3. Нажмите "Зарегистрироваться"\n4. Заполните контактную информацию\n5. Получите подтверждение на email\n\nВаша регистрация будет обработана в течение 24 часов.',
    },
    {
      keywords: ['баллы', 'как получить баллы', 'очки', 'рейтинг'],
      response: 'Способы получения баллов:\n\n⭐ Прохождение курсов (50-100 баллов)\n⭐ Участие в мероприятиях (25-75 баллов)\n⭐ Выполнение ежедневных миссий (5-25 баллов)\n⭐ Прохождение квизов (10-30 баллов)\n⭐ Подача качественных сигналов (50-150 баллов)\n\nБаллы начисляются автоматически после выполнения активности.',
    },
    {
      keywords: ['анонимно', 'безопасность', 'конфиденциальность'],
      response: 'Ваша безопасность - наш приоритет:\n\n🔒 Анонимные сигналы принимаются без указания личных данных\n🔒 Персональная информация защищена шифрованием\n🔒 Доступ к данным имеют только авторизованные сотрудники\n🔒 Возможность удаления аккаунта в любой момент\n\nДля максимальной анонимности используйте функцию "Анонимный сигнал" в разделе отчетов.',
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    console.log('Вызов бэкенда: Отправка сообщения в чат', { message: text.trim() });

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(text.trim());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    // Check for predefined responses
    for (const response of predefinedResponses) {
      if (response.keywords.some(keyword => lowerInput.includes(keyword))) {
        return response.response;
      }
    }

    // Default responses based on common topics
    if (lowerInput.includes('спасибо') || lowerInput.includes('благодарю')) {
      return 'Пожалуйста! Рад помочь. Если у вас есть еще вопросы - обращайтесь!';
    }

    if (lowerInput.includes('помощь') || lowerInput.includes('помоги')) {
      return 'Конечно! Я готов помочь с любыми вопросами по антикоррупционной деятельности. Вы можете спросить о:\n\n• Подаче сигналов о коррупции\n• Участии в мероприятиях\n• Получении баллов и наград\n• Прохождении обучения\n\nЧто именно вас интересует?';
    }

    if (lowerInput.includes('суд') || lowerInput.includes('судья')) {
      return 'По вопросам коррупции в судебной системе:\n\n📞 Телефон доверия Высшего арбитражного суда: +7 (495) 987-89-50\n📞 Антикоррупционная линия Верховного суда: +7 (495) 690-32-95\n\nТакже можете обратиться в Генеральную прокуратуру или региональные органы.';
    }

    // Generic helpful response
    return 'Спасибо за ваш вопрос! Для получения более точной информации рекомендую:\n\n• Изучить раздел "Обучение" в приложении\n• Обратиться к официальным источникам\n• Использовать горячие линии антикоррупционных органов\n\nЕсли нужна конкретная помощь, попробуйте переформулировать вопрос или выберите одну из быстрых тем выше.';
  };

  const handleQuickAction = (action: QuickAction) => {
    console.log('Вызов бэкенда: Быстрое действие в чате', { actionTitle: action.title });
    const userMessage: Message = {
      id: Date.now().toString(),
      text: action.title,
      isBot: false,
      timestamp: new Date(),
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: action.response,
      isBot: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, paddingBottom: Platform.OS === 'android' ? 16 : 0 }} edges={['bottom', 'left', 'right', 'top']}>
      {/* Header */}
      <LinearGradient
        colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.botInfo}>
            <View style={styles.botAvatar}>
              <Bot color={theme.colors.lightText} size={24} />
            </View>
            <View>
              <Text style={styles.botName}>ИИ-Помощник</Text>
              <Text style={styles.botStatus}>Онлайн • Отвечает быстро</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionButton}
                onPress={() => handleQuickAction(action)}
              >
                <IconComponent color={theme.colors.primary} size={18} />
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.isBot ? styles.botMessageContainer : styles.userMessageContainer,
              ]}
            >
              {message.isBot && (
                <View style={styles.messageAvatar}>
                  <Bot color={theme.colors.primary} size={16} />
                </View>
              )}

              <View
                style={[
                  styles.messageBubble,
                  message.isBot ? styles.botMessageBubble : styles.userMessageBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.isBot ? styles.botMessageText : styles.userMessageText,
                  ]}
                >
                  {message.text}
                </Text>
                <Text style={[styles.messageTimestamp, message.isBot ? styles.botTimestamp : styles.userTimestamp]}>
                  {formatTime(message.timestamp)}
                </Text>
              </View>

              {!message.isBot && (
                <View style={styles.messageAvatar}>
                  <User color={theme.colors.lightText} size={16} />
                </View>
              )}
            </View>
          ))}

          {isTyping && (
            <View style={styles.typingIndicatorContainer}>
              <View style={styles.messageAvatar}>
                <Bot color={theme.colors.primary} size={16} />
              </View>
              <View style={[styles.messageBubble, styles.botMessageBubble]}>
                <Text style={styles.typingIndicatorText}>Печатает...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Спросите что-нибудь..."
            placeholderTextColor={theme.colors.subtext}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={() => sendMessage(inputText)}
            disabled={!inputText.trim()}
          >
            <Send color={theme.colors.lightText} size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  botInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primaryMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  botName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: theme.colors.lightText,
  },
  botStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: theme.colors.lightText,
    opacity: 0.8,
  },
  quickActions: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBackground,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: theme.colors.text,
    marginLeft: 8,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 15,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    maxWidth: '85%',
    alignItems: 'flex-end',
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  messageBubble: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  botMessageBubble: {
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: 4,
  },
  userMessageBubble: {
    backgroundColor: theme.colors.primary,
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  botMessageText: {
    color: theme.colors.text,
  },
  userMessageText: {
    color: theme.colors.lightText,
  },
  messageTimestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginTop: 8,
    textAlign: 'right',
  },
  botTimestamp: {
    color: theme.colors.subtext,
  },
  userTimestamp: {
    color: theme.colors.lightTextMuted,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  input: {
    flex: 1,
    minHeight: 44,
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 22,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: theme.colors.text,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: theme.colors.disabled,
  },
  typingIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  typingIndicatorText: {
    fontFamily: 'Inter-Medium',
    color: theme.colors.subtext,
    fontSize: 16,
    fontStyle: 'italic',
  },
});