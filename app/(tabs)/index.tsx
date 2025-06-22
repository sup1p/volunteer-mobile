import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
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
  ThumbsUp,
  MessageSquare,
  Eye,
  Check,
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { mockInitiatives, Initiative, mockMissions, Mission, mockHomeEvents, HomeEvent, mockNews, NewsArticle } from '@/src/data/mockData';
import { router } from 'expo-router';
import { useMissions } from '@/src/context/MissionContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { missions } = useMissions();

  const [userData] = useState({
    name: 'Александр Петров',
    level: 5,
    points: 1250,
    nextLevelPoints: 1500,
    rank: 12,
    completedMissions: 23,
  });

  const [events] = useState<HomeEvent[]>(mockHomeEvents);
  const [initiatives, setInitiatives] = useState<Initiative[]>(mockInitiatives);
  const [likedInitiatives, setLikedInitiatives] = useState<Set<string>>(new Set());
  const [news] = useState<NewsArticle[]>(mockNews.slice(0, 2));

  const handleLike = (initiativeId: string) => {
    if (likedInitiatives.has(initiativeId)) {
      // User has already liked this, maybe implement unliking?
      // For now, we'll just prevent multiple likes.
      return;
    }

    setInitiatives(currentInitiatives =>
      currentInitiatives.map(initiative =>
        initiative.id === initiativeId
          ? { ...initiative, likes: initiative.likes + 1 }
          : initiative
      )
    );

    setLikedInitiatives(currentLiked => {
      const newLiked = new Set(currentLiked);
      newLiked.add(initiativeId);
      return newLiked;
    });
  };

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
            <TouchableOpacity onPress={() => router.push('/features/missions' as any)}>
              <Text style={styles.seeAll}>Все</Text>
            </TouchableOpacity>
          </View>
          {missions.slice(0, 3).map(mission => (
            <TouchableOpacity key={mission.id} style={styles.missionCard} disabled={mission.completed}>
              <View style={[styles.missionIcon, mission.completed && styles.missionIconCompleted]}>
                {mission.completed ? <Check size={20} color={theme.colors.success} /> : getTypeIcon(mission.type)}
              </View>
              <View style={styles.missionDetails}>
                <Text style={[styles.missionTitle, mission.completed && styles.missionTitleCompleted]}>{mission.title}</Text>
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
                {mission.completed ? <Check size={24} color={theme.colors.success} /> : <Plus size={24} color={theme.colors.primary} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* News Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Новости</Text>
            <TouchableOpacity onPress={() => router.push('/features/all-news' as any)}>
              <Text style={styles.seeAll}>Все</Text>
            </TouchableOpacity>
          </View>
          {news.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.newsCard}
              onPress={() => router.push({ pathname: '/features/news-detail', params: { id: item.id } } as any)}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.newsImage} />
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <View style={styles.newsMetaRow}>
                  <Text style={styles.newsMetaText}>
                    <Text style={styles.newsCategory}>{item.category}</Text> • {item.timestamp}
                  </Text>
                  <View style={styles.newsStats}>
                    <Eye size={16} color={theme.colors.subtext} />
                    <Text style={styles.newsStatsText}>{item.views}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ближайшие мероприятия</Text>
            <TouchableOpacity onPress={() => router.push('/features/events' as any)}>
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

        {/* User Initiatives */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Инициативы пользователей</Text>
            <TouchableOpacity onPress={() => router.push('/features/all-initiatives' as any)}>
              <Text style={styles.seeAll}>Все</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.eventScroll}>
            {initiatives.map(initiative => (
              <View key={initiative.id} style={styles.initiativeCard}>
                <Text style={styles.initiativeTitle} numberOfLines={2}>{initiative.title}</Text>
                <Text style={styles.initiativeAuthor}>Автор: {initiative.author}</Text>
                <Text style={styles.initiativeDescription} numberOfLines={3}>{initiative.description}</Text>
                <View style={styles.initiativeFooter}>
                  <TouchableOpacity
                    style={styles.initiativeButton}
                    onPress={() => handleLike(initiative.id)}
                    disabled={likedInitiatives.has(initiative.id)}
                  >
                    <ThumbsUp size={18} color={likedInitiatives.has(initiative.id) ? theme.colors.primary : theme.colors.subtext} />
                    <Text style={[styles.initiativeButtonText, likedInitiatives.has(initiative.id) && { color: theme.colors.primary }]}>
                      {initiative.likes}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.initiativeButton}
                    onPress={() => router.push({ pathname: '/features/initiative-details', params: { id: initiative.id } } as any)}
                  >
                    <MessageSquare size={18} color={theme.colors.subtext} />
                    <Text style={styles.initiativeButtonText}>Обсудить</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  missionIconCompleted: {
    backgroundColor: theme.colors.successMuted,
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
  missionTitleCompleted: {
    textDecorationLine: 'line-through',
    color: theme.colors.subtext,
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
    marginLeft: 'auto',
  },
  eventScroll: {
    marginHorizontal: -16,
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
    marginLeft: 6,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.primary,
  },
  registerButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 12,
  },
  initiativeCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    width: width * 0.75,
    marginRight: 15,
  },
  initiativeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text,
    marginBottom: 5,
  },
  initiativeAuthor: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: theme.colors.subtext,
    marginBottom: 10,
  },
  initiativeDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: theme.colors.text,
    lineHeight: 20,
    marginBottom: 15,
  },
  initiativeFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 15,
    marginTop: 5,
  },
  initiativeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  initiativeButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.subtext,
  },
  newsCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  newsImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  newsContent: {
    flex: 1,
    justifyContent: 'space-between',
    height: 80,
  },
  newsTitle: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text,
    lineHeight: 20,
  },
  newsMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  newsMetaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: theme.colors.subtext,
  },
  newsCategory: {
    fontFamily: 'Inter-Medium',
    color: theme.colors.danger,
  },
  newsStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsStatsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: theme.colors.subtext,
    marginLeft: 4,
  },
});