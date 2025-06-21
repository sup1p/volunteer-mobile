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
          colors={['#667eea', '#764ba2']}
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
            <CalendarIcon color="#667eea" size={24} />
            <Text style={styles.statValue}>{upcomingEvents.length}</Text>
            <Text style={styles.statLabel}>Предстоящих</Text>
          </View>
          <View style={styles.statCard}>
            <Users color="#10b981" size={24} />
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Зарегистрирован</Text>
          </View>
          <View style={styles.statCard}>
            <Star color="#f59e0b" size={24} />
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
          
          {upcomingEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventCard}
              onPress={() => handleEventPress(event)}
            >
              <View style={styles.eventHeader}>
                <View style={styles.eventTypeContainer}>
                  <View
                    style={[
                      styles.eventTypeBadge,
                      { backgroundColor: getEventTypeColor(event.type) },
                    ]}
                  >
                    <Text style={styles.eventTypeText}>
                      {getEventTypeName(event.type)}
                    </Text>
                  </View>
                  {event.registered && (
                    <View style={styles.registeredBadge}>
                      <Text style={styles.registeredText}>Зарегистрирован</Text>
                    </View>
                  )}
                </View>
                <View style={styles.pointsContainer}>
                  <Star color="#f59e0b" size={16} fill="#f59e0b" />
                  <Text style={styles.pointsText}>+{event.points}</Text>
                </View>
              </View>
              
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDescription} numberOfLines={2}>
                {event.description}
              </Text>
              
              <View style={styles.eventDetails}>
                <View style={styles.eventDetail}>
                  <CalendarIcon color="#666" size={16} />
                  <Text style={styles.eventDetailText}>
                    {formatDate(event.date)} в {event.time}
                  </Text>
                </View>
                <View style={styles.eventDetail}>
                  <MapPin color="#666" size={16} />
                  <Text style={styles.eventDetailText} numberOfLines={1}>
                    {event.location}
                  </Text>
                </View>
                <View style={styles.eventDetail}>
                  <Users color="#666" size={16} />
                  <Text style={styles.eventDetailText}>
                    {event.participants}/{event.maxParticipants} участников
                  </Text>
                </View>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(event.participants / event.maxParticipants) * 100}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {Math.round((event.participants / event.maxParticipants) * 100)}% заполнено
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Event Details Modal */}
      <Modal
        visible={showEventModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          {selectedEvent && (
            <>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Детали события</Text>
                <TouchableOpacity onPress={() => setShowEventModal(false)}>
                  <X color="#333" size={24} />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.modalContent}>
                <View style={styles.modalEventHeader}>
                  <View
                    style={[
                      styles.modalEventTypeBadge,
                      { backgroundColor: getEventTypeColor(selectedEvent.type) },
                    ]}
                  >
                    <Text style={styles.modalEventTypeText}>
                      {getEventTypeName(selectedEvent.type)}
                    </Text>
                  </View>
                  <View style={styles.modalPointsContainer}>
                    <Star color="#f59e0b" size={20} fill="#f59e0b" />
                    <Text style={styles.modalPointsText}>+{selectedEvent.points} баллов</Text>
                  </View>
                </View>
                
                <Text style={styles.modalEventTitle}>{selectedEvent.title}</Text>
                <Text style={styles.modalEventDescription}>{selectedEvent.description}</Text>
                
                <View style={styles.modalEventDetails}>
                  <View style={styles.modalEventDetail}>
                    <CalendarIcon color="#667eea" size={20} />
                    <Text style={styles.modalEventDetailText}>
                      {formatDate(selectedEvent.date)} в {selectedEvent.time}
                    </Text>
                  </View>
                  <View style={styles.modalEventDetail}>
                    <MapPin color="#667eea" size={20} />
                    <Text style={styles.modalEventDetailText}>{selectedEvent.location}</Text>
                  </View>
                  <View style={styles.modalEventDetail}>
                    <Users color="#667eea" size={20} />
                    <Text style={styles.modalEventDetailText}>
                      {selectedEvent.participants}/{selectedEvent.maxParticipants} участников
                    </Text>
                  </View>
                </View>
                
                <View style={styles.modalProgressContainer}>
                  <Text style={styles.modalProgressTitle}>Заполненность</Text>
                  <View style={styles.modalProgressBar}>
                    <View
                      style={[
                        styles.modalProgressFill,
                        {
                          width: `${(selectedEvent.participants / selectedEvent.maxParticipants) * 100}%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.modalProgressText}>
                    {Math.round((selectedEvent.participants / selectedEvent.maxParticipants) * 100)}% заполнено
                  </Text>
                </View>
              </ScrollView>
              
              <View style={styles.modalActions}>
                {selectedEvent.registered ? (
                  <View style={styles.registeredButton}>
                    <Text style={styles.registeredButtonText}>Вы зарегистрированы</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => handleRegister(selectedEvent.id)}
                  >
                    <LinearGradient
                      colors={['#667eea', '#764ba2']}
                      style={styles.registerButtonGradient}
                    >
                      <Plus color="#ffffff" size={20} />
                      <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: -15,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minWidth: 80,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
  filterContainer: {
    paddingVertical: 15,
    paddingLeft: 20,
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#667eea',
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  eventsSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 15,
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventTypeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  registeredBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  registeredText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#f59e0b',
    marginLeft: 4,
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  eventDetails: {
    marginBottom: 15,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventDetailText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666',
    textAlign: 'right',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  modalEventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalEventTypeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  modalEventTypeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  modalPointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalPointsText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#f59e0b',
    marginLeft: 6,
  },
  modalEventTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 15,
  },
  modalEventDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#666',
    lineHeight: 24,
    marginBottom: 25,
  },
  modalEventDetails: {
    marginBottom: 25,
  },
  modalEventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 5,
  },
  modalEventDetailText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  modalProgressContainer: {
    marginBottom: 20,
  },
  modalProgressTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 10,
  },
  modalProgressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  modalProgressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 4,
  },
  modalProgressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  modalActions: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  registerButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  registerButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  registerButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
  registeredButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  registeredButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});