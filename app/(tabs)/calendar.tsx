import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  Filter,
  Search,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  type: 'lecture' | 'raid' | 'flashmob' | 'training' | 'meeting';
  points: number;
  registered: boolean;
}

export default function CalendarScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Лекция: Как выявлять коррупцию',
      description: 'Подробная лекция о методах выявления коррупционных схем в государственных органах и частном секторе.',
      date: '2024-05-15',
      time: '18:00',
      location: 'Центр волонтёров, ул. Ленина 45',
      participants: 24,
      maxParticipants: 50,
      type: 'lecture',
      points: 25,
      registered: false,
    },
    {
      id: '2',
      title: 'Флешмоб против коррупции',
      description: 'Мирная акция привлечения внимания к проблемам коррупции в городе.',
      date: '2024-05-20',
      time: '12:00',
      location: 'Центральная площадь',
      participants: 156,
      maxParticipants: 200,
      type: 'flashmob',
      points: 50,
      registered: true,
    },
    {
      id: '3',
      title: 'Антикоррупционный рейд',
      description: 'Проверка соблюдения антикоррупционного законодательства в муниципальных учреждениях.',
      date: '2024-05-22',
      time: '10:00',
      location: 'Городская администрация',
      participants: 8,
      maxParticipants: 15,
      type: 'raid',
      points: 100,
      registered: false,
    },
    {
      id: '4',
      title: 'Тренинг по медиаграмотности',
      description: 'Обучение навыкам анализа информации и выявления фейковых новостей.',
      date: '2024-05-25',
      time: '14:00',
      location: 'Библиотека им. Пушкина',
      participants: 12,
      maxParticipants: 30,
      type: 'training',
      points: 75,
      registered: false,
    },
    {
      id: '5',
      title: 'Встреча координаторов',
      description: 'Ежемесячная встреча координаторов волонтёрских групп для обсуждения планов.',
      date: '2024-05-28',
      time: '19:00',
      location: 'Онлайн (Zoom)',
      participants: 45,
      maxParticipants: 100,
      type: 'meeting',
      points: 30,
      registered: true,
    },
  ]);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return '#667eea';
      case 'raid':
        return '#ef4444';
      case 'flashmob':
        return '#f59e0b';
      case 'training':
        return '#10b981';
      case 'meeting':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const getEventTypeName = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'Лекция';
      case 'raid':
        return 'Рейд';
      case 'flashmob':
        return 'Флешмоб';
      case 'training':
        return 'Тренинг';
      case 'meeting':
        return 'Встреча';
      default:
        return 'Событие';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    });
  };

  const handleEventPress = (event: Event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleRegister = (eventId: string) => {
    // Здесь будет логика регистрации на мероприятие
    setShowEventModal(false);
  };

  const filteredEvents = filter === 'all'
    ? events
    : events.filter(event => event.type === filter);

  const upcomingEvents = filteredEvents.filter(event =>
    new Date(event.date) >= new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Календарь событий</Text>
          <Text style={styles.headerSubtitle}>
            Участвуйте в мероприятиях и получайте баллы
          </Text>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <CalendarIcon color={theme.colors.primary} size={24} />
            <Text style={styles.statValue}>{upcomingEvents.length}</Text>
            <Text style={styles.statLabel}>Предстоящих</Text>
          </View>
          <View style={styles.statCard}>
            <Users color={theme.colors.success} size={24} />
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Зарегистрирован</Text>
          </View>
          <View style={styles.statCard}>
            <Star color={theme.colors.warning} size={24} />
            <Text style={styles.statValue}>280</Text>
            <Text style={styles.statLabel}>Баллов доступно</Text>
          </View>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { key: 'all', label: 'Все' },
              { key: 'lecture', label: 'Лекции' },
              { key: 'raid', label: 'Рейды' },
              { key: 'flashmob', label: 'Флешмобы' },
              { key: 'training', label: 'Тренинги' },
              { key: 'meeting', label: 'Встречи' },
            ].map((filterOption) => (
              <TouchableOpacity
                key={filterOption.key}
                style={[
                  styles.filterButton,
                  filter === filterOption.key && styles.filterButtonActive,
                ]}
                onPress={() => setFilter(filterOption.key)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    filter === filterOption.key && styles.filterButtonTextActive,
                  ]}
                >
                  {filterOption.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Events List */}
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Ближайшие события</Text>

          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={[styles.eventCard, event.registered && styles.eventCardRegistered]}
                onPress={() => handleEventPress(event)}
              >
                <View style={styles.eventCardHeader}>
                  <View style={[styles.eventType, { backgroundColor: getEventTypeColor(event.type) }]}>
                    <Text style={styles.eventType_text}>{getEventTypeName(event.type)}</Text>
                  </View>
                  <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
                </View>

                <Text style={styles.eventTitle}>{event.title}</Text>

                <View style={styles.eventInfoContainer}>
                  <View style={styles.eventInfo}>
                    <Clock color={theme.colors.subtext} size={14} />
                    <Text style={styles.eventInfoText}>{event.time}</Text>
                  </View>
                  <View style={styles.eventInfo}>
                    <MapPin color={theme.colors.subtext} size={14} />
                    <Text style={styles.eventInfoText}>{event.location}</Text>
                  </View>
                </View>

                <View style={styles.eventFooter}>
                  <View style={styles.eventParticipants}>
                    <Users color={theme.colors.subtext} size={16} />
                    <Text style={styles.eventInfoText}>
                      {event.participants} / {event.maxParticipants}
                    </Text>
                  </View>
                  <View style={styles.eventPoints}>
                    <Star color={theme.colors.primary} size={16} />
                    <Text style={styles.eventPointsText}>{event.points} баллов</Text>
                  </View>
                </View>

                {event.registered && (
                  <View style={styles.registeredBadge}>
                    <Text style={styles.registeredBadgeText}>Вы записаны</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noEventsContainer}>
              <Text style={styles.noEventsText}>Нет событий по выбранному фильтру.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Event Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showEventModal}
        onRequestClose={() => setShowEventModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <View style={styles.modalHeader}>
                  <View style={[styles.modalEventType, { backgroundColor: getEventTypeColor(selectedEvent.type) }]}>
                    <Text style={styles.modalEventType_text}>{getEventTypeName(selectedEvent.type)}</Text>
                  </View>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setShowEventModal(false)}>
                    <X color={theme.colors.text} size={24} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalTitle}>{selectedEvent.title}</Text>

                <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
                  <Text style={styles.modalSectionTitle}>Описание</Text>
                  <Text style={styles.modalDescription}>{selectedEvent.description}</Text>

                  <View style={styles.modalInfoGrid}>
                    <View style={styles.modalInfoItem}>
                      <CalendarIcon color={theme.colors.subtext} size={20} />
                      <Text style={styles.modalInfoText}>{formatDate(selectedEvent.date)}</Text>
                    </View>
                    <View style={styles.modalInfoItem}>
                      <Clock color={theme.colors.subtext} size={20} />
                      <Text style={styles.modalInfoText}>{selectedEvent.time}</Text>
                    </View>
                    <View style={styles.modalInfoItem}>
                      <MapPin color={theme.colors.subtext} size={20} />
                      <Text style={styles.modalInfoText}>{selectedEvent.location}</Text>
                    </View>
                    <View style={styles.modalInfoItem}>
                      <Users color={theme.colors.subtext} size={20} />
                      <Text style={styles.modalInfoText}>
                        {selectedEvent.participants} / {selectedEvent.maxParticipants} участников
                      </Text>
                    </View>
                    <View style={styles.modalInfoItem}>
                      <Star color={theme.colors.subtext} size={20} />
                      <Text style={styles.modalInfoText}>{selectedEvent.points} баллов за участие</Text>
                    </View>
                  </View>
                </ScrollView>

                <View style={styles.modalFooter}>
                  {selectedEvent.registered ? (
                    <TouchableOpacity style={styles.alreadyRegisteredButton} disabled>
                      <Text style={styles.alreadyRegisteredButtonText}>Вы уже записаны</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.registerButton}
                      onPress={() => handleRegister(selectedEvent.id)}
                    >
                      <Text style={styles.registerButtonText}>Записаться на событие</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: theme.colors.lightText,
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: theme.colors.lightText,
    opacity: 0.9,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    marginTop: -40,
  },
  statCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 60) / 3,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.subtext,
    marginTop: 4,
    textAlign: 'center',
  },
  filterContainer: {
    paddingHorizontal: 15,
    marginTop: 25,
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text,
  },
  filterButtonTextActive: {
    color: theme.colors.lightText,
  },
  eventsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text,
    marginBottom: 20,
  },
  eventCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  eventCardRegistered: {
    borderColor: theme.colors.success,
  },
  eventCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventType: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  eventType_text: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: theme.colors.lightText,
  },
  eventDate: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.subtext,
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text,
    marginBottom: 12,
    lineHeight: 24,
  },
  eventInfoContainer: {
    marginBottom: 15,
    gap: 8,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventInfoText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: theme.colors.subtext,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  eventParticipants: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventPointsText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: theme.colors.primary,
  },
  registeredBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: theme.colors.success,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  registeredBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: theme.colors.lightText,
  },
  noEventsContainer: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 20,
  },
  noEventsText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: theme.colors.subtext,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    height: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  modalEventType: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  modalEventType_text: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: theme.colors.lightText,
  },
  closeButton: {
    padding: 8,
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text,
    marginBottom: 20,
    paddingHorizontal: 5,
    lineHeight: 32,
  },
  modalScrollView: {
    flex: 1,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.subtext,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  modalDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  modalInfoGrid: {
    gap: 15,
    paddingHorizontal: 5,
  },
  modalInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalInfoText: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    color: theme.colors.text,
    flex: 1,
  },
  modalFooter: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  registerButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: theme.colors.lightText,
  },
  alreadyRegisteredButton: {
    backgroundColor: theme.colors.border,
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
  },
  alreadyRegisteredButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: theme.colors.subtext,
  },
});