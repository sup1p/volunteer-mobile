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
import { useTheme } from '@/context/ThemeContext';

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
  const { theme } = useTheme();
  const styles = getStyles(theme);

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
        return theme.colors.success;
      case 'medium':
        return theme.colors.warning;
      case 'hard':
        return theme.colors.danger;
      default:
        return theme.colors.subtext;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily':
        return <Clock size={14} color={theme.colors.primary} />;
      case 'weekly':
        return <Calendar size={14} color={theme.colors.primary} />;
      case 'special':
        return <Star size={14} color={theme.colors.warning} />;
      default:
        return <Target size={14} color={theme.colors.primary} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
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
              <TrendingUp color={theme.colors.lightText} size={20} />
              <Text style={styles.statValue}>{userData.points}</Text>
              <Text style={styles.statLabel}>Баллы</Text>
            </View>
            <View style={styles.statItem}>
              <Users color={theme.colors.lightText} size={20} />
              <Text style={styles.statValue}>#{userData.rank}</Text>
              <Text style={styles.statLabel}>Рейтинг</Text>
            </View>
            <View style={styles.statItem}>
              <Award color={theme.colors.lightText} size={20} />
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
          {missions.map(mission => (
            <TouchableOpacity key={mission.id} style={styles.missionCard}>
              <View style={styles.missionIcon}>
                {getTypeIcon(mission.type)}
              </View>
              <View style={styles.missionDetails}>
                <Text style={styles.missionTitle}>{mission.title}</Text>
                <View style={styles.missionMeta}>
                  <Text style={[styles.missionDifficulty, { color: getDifficultyColor(mission.difficulty) }]}>
                    {mission.difficulty}
                  </Text>
                  <Text style={styles.missionPoints}>
                    <Star size={12} color={theme.colors.warning} /> {mission.points} баллов
                  </Text>
                </View>
              </View>
              <View style={styles.missionAction}>
                <Plus size={20} color={theme.colors.primary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ближайшие мероприятия</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Все</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.eventScroll}>
            {events.map(event => (
              <TouchableOpacity key={event.id} style={styles.eventCard}>
                <View style={styles.eventCardHeader}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                </View>
                <View style={styles.eventMeta}>
                  <View style={styles.eventMetaItem}>
                    <Calendar size={14} color={theme.colors.subtext} />
                    <Text style={styles.eventMetaText}>{event.date}</Text>
                  </View>
                  <View style={styles.eventMetaItem}>
                    <MapPin size={14} color={theme.colors.subtext} />
                    <Text style={styles.eventMetaText}>{event.location}</Text>
                  </View>
                </View>
                <View style={styles.eventFooter}>
                  <View style={styles.eventParticipants}>
                    <Users size={14} color={theme.colors.primary} />
                    <Text style={styles.eventParticipantsText}>
                      {event.participants} / {event.maxParticipants}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Участвовать</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    color: theme.colors.lightText,
    opacity: 0.9,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: theme.colors.lightText,
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
    color: theme.colors.lightText,
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
    color: theme.colors.lightText,
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: theme.colors.lightText,
    opacity: 0.8,
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: theme.colors.lightText,
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
    backgroundColor: theme.colors.lightText,
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
    color: theme.colors.text,
  },
  seeAll: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.primary,
  },
  missionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  missionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  missionDetails: {
    flex: 1,
  },
  missionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text,
    marginBottom: 5,
  },
  missionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionDifficulty: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    textTransform: 'capitalize',
    marginRight: 10,
  },
  missionPoints: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: theme.colors.subtext,
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionAction: {
    marginLeft: 10,
  },
  eventScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  eventCard: {
    width: width * 0.75,
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  eventCardHeader: {
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text,
  },
  eventMeta: {
    marginBottom: 15,
  },
  eventMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventMetaText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: theme.colors.subtext,
    marginLeft: 8,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 10,
  },
  eventParticipants: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventParticipantsText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: theme.colors.primary,
    marginLeft: 5,
  },
  registerButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  registerButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.lightText,
  },
});