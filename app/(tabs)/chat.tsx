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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.botInfo}>
            <View style={styles.botAvatar}>
              <Bot color="#ffffff" size={24} />
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
                <IconComponent color="#667eea" size={18} />
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
                  <Bot color="#667eea" size={16} />
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
                <Text
                  style={[
                    styles.messageTime,
                    message.isBot ? styles.botMessageTime : styles.userMessageTime,
                  ]}
                >
                  {formatTime(message.timestamp)}
                </Text>
              </View>
              
              {!message.isBot && (
                <View style={styles.messageAvatar}>
                  <User color="#ffffff" size={16} />
                </View>
              )}
            </View>
          ))}
          
          {isTyping && (
            <View style={[styles.messageContainer, styles.botMessageContainer]}>
              <View style={styles.messageAvatar}>
                <Bot color="#667eea" size={16} />
              </View>
              <View style={[styles.messageBubble, styles.botMessageBubble]}>
                <Text style={styles.typingText}>Печатает...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Напишите ваш вопрос..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={() => sendMessage(inputText)}
            disabled={!inputText.trim()}
          >
            <Send color="#ffffff" size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  botName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  botStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    opacity: 0.8,
  },
  quickActions: {
    paddingVertical: 15,
    paddingLeft: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
    marginLeft: 6,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messagesContent: {
    paddingVertical: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  messageBubble: {
    maxWidth: width * 0.7,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 18,
  },
  botMessageBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userMessageBubble: {
    backgroundColor: '#667eea',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    lineHeight: 22,
  },
  botMessageText: {
    color: '#333',
  },
  userMessageText: {
    color: '#ffffff',
  },
  messageTime: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    marginTop: 5,
  },
  botMessageTime: {
    color: '#999',
  },
  userMessageTime: {
    color: '#ffffff',
    opacity: 0.7,
  },
  typingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#999',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingTop: 12,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    maxHeight: 100,
    marginRight: 10,
    backgroundColor: '#f8f9fa',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
});