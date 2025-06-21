import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Calendar,
  Target,
  Users,
  Award,
  TrendingUp,
  Clock,
  MapPin,
  Star,
  Plus,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Mission {
  id: string;
  title: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'daily' | 'weekly' | 'special';
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants: number;
}

export default function HomeScreen() {
  const [userData] = useState({
    name: 'Александр Петров',
    level: 5,
    points: 1250,
    nextLevelPoints: 1500,
    rank: 12,
    completedMissions: 23,
  });

  const [missions] = useState<Mission[]>([
    {
      id: '1',
      title: 'Поделиться статьей о коррупции',
      points: 10,
      difficulty: 'easy',
      type: 'daily',
    },
    {
      id: '2',
      title: 'Пройти курс "Основы антикоррупционного права"',
      points: 50,
      difficulty: 'medium',
      type: 'weekly',
    },
    {
      id: '3',
      title: 'Участвовать в антикоррупционном рейде',
      points: 100,
      difficulty: 'hard',
      type: 'special',
    },
  ]);

  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Лекция: Как выявлять коррупцию',
      date: '15 мая, 18:00',
      location: 'Центр волонтёров',
      participants: 24,
      maxParticipants: 50,
    },
    {
      id: '2',
      title: 'Флешмоб против коррупции',
      date: '20 мая, 12:00',
      location: 'Центральная площадь',
      participants: 156,
      maxParticipants: 200,
    },
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '#10b981';
      case 'medium':
        return '#f59e0b';
      case 'hard':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily':
        return <Clock size={14} color="#667eea" />;
      case 'weekly':
        return <Calendar size={14} color="#667eea" />;
      case 'special':
        return <Star size={14} color="#f59e0b" />;
      default:
        return <Target size={14} color="#667eea" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Добро пожаловать,</Text>
              <Text style={styles.userName}>{userData.name}</Text>
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Ур. {userData.level}</Text>
            </View>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <TrendingUp color="#ffffff" size={20} />
              <Text style={styles.statValue}>{userData.points}</Text>
              <Text style={styles.statLabel}>Баллы</Text>
            </View>
            <View style={styles.statItem}>
              <Users color="#ffffff" size={20} />
              <Text style={styles.statValue}>#{userData.rank}</Text>
              <Text style={styles.statLabel}>Рейтинг</Text>
            </View>
            <View style={styles.statItem}>
              <Award color="#ffffff" size={20} />
              <Text style={styles.statValue}>{userData.completedMissions}</Text>
              <Text style={styles.statLabel}>Миссии</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              До следующего уровня: {userData.nextLevelPoints - userData.points} баллов
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(userData.points / userData.nextLevelPoints) * 100}%`,
                  },
                ]}
              />
            </View>
          </View>
        </LinearGradient>

        {/* Daily Missions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ежедневные миссии</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Все</Text>
            </TouchableOpacity>
          </View>
          
          {missions.map((mission) => (
            <TouchableOpacity key={mission.id} style={styles.missionCard}>
              <View style={styles.missionHeader}>
                <View style={styles.missionType}>
                  {getTypeIcon(mission.type)}
                </View>
                <View
                  style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(mission.difficulty) },
                  ]}
                >
                  <Text style={styles.difficultyText}>
                    {mission.difficulty === 'easy'
                      ? 'Легко'
                      : mission.difficulty === 'medium'
                      ? 'Средне'
                      : 'Сложно'}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.missionTitle}>{mission.title}</Text>
              
              <View style={styles.missionFooter}>
                <View style={styles.pointsContainer}>
                  <Star color="#f59e0b" size={16} fill="#f59e0b" />
                  <Text style={styles.pointsText}>+{mission.points} баллов</Text>
                </View>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>Начать</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ближайшие события</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Календарь</Text>
            </TouchableOpacity>
          </View>
          
          {events.map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.participantsContainer}>
                  <Users color="#667eea" size={16} />
                  <Text style={styles.participantsText}>
                    {event.participants}/{event.maxParticipants}
                  </Text>
                </View>
              </View>
              
              <View style={styles.eventDetails}>
                <View style={styles.eventDetail}>
                  <Calendar color="#666" size={14} />
                  <Text style={styles.eventDetailText}>{event.date}</Text>
                </View>
                <View style={styles.eventDetail}>
                  <MapPin color="#666" size={14} />
                  <Text style={styles.eventDetailText}>{event.location}</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.registerButton}>
                <Plus color="#667eea" size={16} />
                <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    opacity: 0.9,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  levelBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  levelText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    opacity: 0.8,
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 3,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#667eea',
  },
  missionCard: {
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
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  missionType: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  missionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 15,
    lineHeight: 22,
  },
  missionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#f59e0b',
    marginLeft: 5,
  },
  startButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  startButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
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
    marginBottom: 15,
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
    marginLeft: 4,
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
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4ff',
    paddingVertical: 12,
    borderRadius: 10,
  },
  registerButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#667eea',
    marginLeft: 5,
  },
});