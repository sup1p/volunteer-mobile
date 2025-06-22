import React, { useState, useMemo } from 'react';
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
  Users,
  Plus,
  Filter,
  Search,
  Award,
  ChevronLeft,
  ChevronRight,
  X,
  Tag,
  CalendarDays,
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { AppEvent, mockEvents, mockUserRegistrations, UserEventRegistration } from '@/src/data/mockData';
import { v4 as uuidv4 } from 'uuid';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Моделируем ID текущего пользователя. В реальном приложении это будет браться из стейта авторизации.
const CURRENT_USER_ID = '2';

export default function CalendarScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [registrations, setRegistrations] = useState<UserEventRegistration[]>(mockUserRegistrations);

  const getEventTypeColor = (category: AppEvent['category']) => {
    switch (category) {
      case 'educational': return theme.colors.primary;
      case 'community': return theme.colors.success;
      case 'practical': return theme.colors.warning;
      case 'in-app': return theme.colors.primary;
      case 'offline-monitoring': return theme.colors.danger;
      default: return theme.colors.subtext;
    }
  };

  const getEventTypeName = (category: AppEvent['category']) => {
    const names = {
      'educational': 'Образование',
      'community': 'Общество',
      'practical': 'Практика',
      'in-app': 'В приложении',
      'offline-monitoring': 'Мониторинг',
    };
    return names[category] || 'Событие';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEventPress = (event: AppEvent) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleRegister = (eventId: string) => {
    // Проверяем, не зарегистрирован ли пользователь уже
    const isRegistered = registrations.some(reg => reg.eventId === eventId && reg.userId === CURRENT_USER_ID);
    if (!isRegistered) {
      const newRegistration: UserEventRegistration = {
        registrationId: uuidv4(),
        userId: CURRENT_USER_ID,
        eventId: eventId,
        status: 'registered',
      };
      setRegistrations(prev => [...prev, newRegistration]);
      console.log(`Пользователь ${CURRENT_USER_ID} зарегистрировался на событие ${eventId}`);
    }
    setShowEventModal(false);
  };

  const upcomingEvents = useMemo(() => {
    let eventsToShow = mockEvents;

    if (filter === 'attended') {
      const attendedEventIds = registrations
        .filter(reg => reg.userId === CURRENT_USER_ID && reg.status === 'attended')
        .map(reg => reg.eventId);
      eventsToShow = mockEvents.filter(event => attendedEventIds.includes(event.id));
    } else if (filter !== 'all') {
      eventsToShow = mockEvents.filter(event => event.category === filter);
    }

    // Для всех фильтров, кроме "Посещенные", показываем только будущие события
    if (filter !== 'attended') {
      eventsToShow = eventsToShow.filter(event => new Date(event.date) >= new Date());
    }

    return eventsToShow.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filter, registrations]);

  const totalPointsAvailable = useMemo(() => {
    return upcomingEvents.reduce((sum, event) => {
      if (event.reward.type === 'points') {
        return sum + (event.reward.value as number);
      }
      return sum;
    }, 0);
  }, [upcomingEvents]);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
          style={styles.header}
        >
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Календарь событий</Text>
            <TouchableOpacity onPress={() => router.push('/features/full-calendar' as any)}>
              <CalendarDays color={theme.colors.lightText} size={28} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerSubtitle}>
            Участвуйте в мероприятиях и получайте награды
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
            <Text style={styles.statValue}>{registrations.filter(r => r.userId === CURRENT_USER_ID && r.status === 'registered').length}</Text>
            <Text style={styles.statLabel}>Участвую</Text>
          </View>
          <View style={styles.statCard}>
            <Award color={theme.colors.warning} size={24} />
            <Text style={styles.statValue}>{totalPointsAvailable}</Text>
            <Text style={styles.statLabel}>Баллов доступно</Text>
          </View>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { key: 'all', label: 'Все' },
              { key: 'educational', label: 'Образование' },
              { key: 'community', label: 'Общество' },
              { key: 'practical', label: 'Практика' },
              { key: 'in-app', label: 'В приложении' },
              { key: 'offline-monitoring', label: 'Мониторинг' },
              { key: 'attended', label: 'Посещенные' },
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
          <Text style={styles.sectionTitle}>
            {filter === 'attended' ? 'Посещенные события' : 'Ближайшие события'}
          </Text>

          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => {
              const userRegistration = registrations.find(r => r.userId === CURRENT_USER_ID && r.eventId === event.id);

              return (
                <TouchableOpacity key={event.id} style={styles.eventCard} onPress={() => handleEventPress(event)}>
                  <View style={styles.eventCardHeader}>
                    <View style={[styles.eventTypeBadge, { backgroundColor: getEventTypeColor(event.category) }]}>
                      <Tag size={14} color="#fff" />
                      <Text style={styles.eventTypeBadgeText}>{getEventTypeName(event.category)}</Text>
                    </View>
                    <View style={styles.eventReward}>
                      <Award size={16} color={theme.colors.warning} />
                      <Text style={styles.eventRewardText}>
                        {event.reward.type === 'points' ? `${event.reward.value} баллов` : `Бейдж "${event.reward.value}"`}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDescription} numberOfLines={2}>{event.description}</Text>
                  <View style={styles.eventMeta}>
                    <View style={styles.metaItem}>
                      <CalendarIcon size={14} color={theme.colors.subtext} />
                      <Text style={styles.metaText}>{formatDate(event.date)}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Clock size={14} color={theme.colors.subtext} />
                      <Text style={styles.metaText}>{formatTime(event.date)}</Text>
                    </View>
                  </View>
                  <View style={styles.eventFooter}>
                    <View style={styles.participants}>
                    </View>
                    <ChevronRight size={20} color={theme.colors.primary} />
                  </View>
                  {userRegistration && (
                    <View style={[
                      styles.registrationBadge,
                      { backgroundColor: userRegistration.status === 'attended' ? theme.colors.success : theme.colors.primary }
                    ]}>
                      <Text style={styles.registrationBadgeText}>
                        {userRegistration.status === 'attended' ? 'Вы посетили' : 'Вы записаны'}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              )
            })
          ) : (
            <View style={styles.noEventsContainer}>
              <Text style={styles.noEventsText}>Нет предстоящих событий по выбранному фильтру.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showEventModal}
          onRequestClose={() => setShowEventModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowEventModal(false)}>
                <X size={24} color={theme.colors.subtext} />
              </TouchableOpacity>

              <ScrollView>
                <View style={[styles.modalEventTypeBadge, { backgroundColor: getEventTypeColor(selectedEvent.category) }]}>
                  <Text style={styles.modalEventTypeBadgeText}>{getEventTypeName(selectedEvent.category)}</Text>
                </View>

                <Text style={styles.modalTitle}>{selectedEvent.title}</Text>

                <View style={styles.modalMetaRow}>
                  <View style={styles.modalMetaItem}>
                    <CalendarIcon size={16} color={theme.colors.subtext} />
                    <Text style={styles.modalMetaText}>{formatDate(selectedEvent.date)}</Text>
                  </View>
                  <View style={styles.modalMetaItem}>
                    <Clock size={16} color={theme.colors.subtext} />
                    <Text style={styles.modalMetaText}>{formatTime(selectedEvent.date)}</Text>
                  </View>
                </View>

                <View style={styles.modalMetaRow}>
                  <View style={styles.modalMetaItem}>
                  </View>
                  <View style={styles.modalMetaItem}>
                    <Award size={16} color={theme.colors.warning} />
                    <Text style={styles.modalMetaText}>
                      {selectedEvent.reward.type === 'points' ? `${selectedEvent.reward.value} баллов` : `Бейдж "${selectedEvent.reward.value}"`}
                    </Text>
                  </View>
                </View>

                <Text style={styles.modalSectionTitle}>Описание</Text>
                <Text style={styles.modalDescription}>{selectedEvent.description}</Text>

                <TouchableOpacity
                  style={[styles.registerButton, registrations.some(r => r.eventId === selectedEvent.id && r.userId === CURRENT_USER_ID) && styles.disabledButton]}
                  onPress={() => handleRegister(selectedEvent.id)}
                  disabled={registrations.some(r => r.eventId === selectedEvent.id && r.userId === CURRENT_USER_ID)}
                >
                  <Text style={styles.registerButtonText}>
                    {registrations.some(r => r.eventId === selectedEvent.id && r.userId === CURRENT_USER_ID) ? 'Вы уже записаны' : 'Принять участие'}
                  </Text>
                </TouchableOpacity>

              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
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
    paddingTop: 30,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.card,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 15,
    marginTop: -40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: theme.colors.text,
    marginTop: 5,
  },
  statLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.subtext,
    marginTop: 2,
  },
  filterContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.text,
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  eventsSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: theme.colors.text,
    marginBottom: 15,
  },
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    backgroundColor: theme.colors.card,
    borderRadius: 15,
  },
  noEventsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.subtext,
  },
  eventCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  eventCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  eventTypeBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#fff',
    marginLeft: 5,
  },
  eventReward: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventRewardText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.warning,
    marginLeft: 5,
  },
  eventTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 5,
  },
  eventDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.subtext,
    marginBottom: 12,
    lineHeight: 20,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 10,
    marginTop: 5,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.subtext,
    marginLeft: 6,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  participants: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '85%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  modalEventTypeBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  modalEventTypeBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: 15,
  },
  modalMetaRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  modalMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  modalMetaText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.text,
    marginLeft: 8,
  },
  modalSectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.text,
    marginTop: 10,
    marginBottom: 10,
  },
  modalDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.subtext,
    lineHeight: 24,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 'auto',
  },
  registerButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#fff',
  },
  disabledButton: {
    backgroundColor: theme.colors.disabled,
  },
  registrationBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
  },
  registrationBadgeText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 12,
  },
});