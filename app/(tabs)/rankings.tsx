import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Trophy,
  Medal,
  Crown,
  Star,
  TrendingUp,
  Users,
  Target,
  Award,
  ChevronDown,
  Filter,
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

interface RankingUser {
  id: string;
  name: string;
  level: number;
  points: number;
  rank: number;
  avatar?: string;
  region: string;
  completedMissions: number;
  eventsAttended: number;
}

interface LeaderboardCategory {
  id: string;
  title: string;
  icon: any;
  color: string;
}

export default function RankingsScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [selectedCategory, setSelectedCategory] = useState('overall');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const categories: LeaderboardCategory[] = [
    {
      id: 'overall',
      title: 'Общий рейтинг',
      icon: Trophy,
      color: theme.colors.warning,
    },
    {
      id: 'missions',
      title: 'По миссиям',
      icon: Target,
      color: theme.colors.success,
    },
    {
      id: 'events',
      title: 'По мероприятиям',
      icon: Users,
      color: theme.colors.primary,
    },
    {
      id: 'monthly',
      title: 'За месяц',
      icon: TrendingUp,
      color: theme.colors.danger,
    },
  ];

  const [topUsers] = useState<RankingUser[]>([
    {
      id: '1',
      name: 'Мария Иванова',
      level: 8,
      points: 2450,
      rank: 1,
      region: 'Москва',
      completedMissions: 45,
      eventsAttended: 23,
    },
    {
      id: '2',
      name: 'Дмитрий Сидоров',
      level: 7,
      points: 2180,
      rank: 2,
      region: 'Санкт-Петербург',
      completedMissions: 38,
      eventsAttended: 19,
    },
    {
      id: '3',
      name: 'Елена Козлова',
      level: 6,
      points: 1920,
      rank: 3,
      region: 'Новосибирск',
      completedMissions: 32,
      eventsAttended: 16,
    },
    {
      id: '4',
      name: 'Андрей Петров',
      level: 6,
      points: 1850,
      rank: 4,
      region: 'Екатеринбург',
      completedMissions: 29,
      eventsAttended: 18,
    },
    {
      id: '5',
      name: 'Ольга Смирнова',
      level: 5,
      points: 1720,
      rank: 5,
      region: 'Казань',
      completedMissions: 28,
      eventsAttended: 14,
    },
    {
      id: '6',
      name: 'Игорь Волков',
      level: 5,
      points: 1650,
      rank: 6,
      region: 'Нижний Новгород',
      completedMissions: 26,
      eventsAttended: 15,
    },
    {
      id: '7',
      name: 'Анна Федорова',
      level: 5,
      points: 1580,
      rank: 7,
      region: 'Челябинск',
      completedMissions: 24,
      eventsAttended: 13,
    },
    {
      id: '8',
      name: 'Максим Орлов',
      level: 4,
      points: 1450,
      rank: 8,
      region: 'Самара',
      completedMissions: 22,
      eventsAttended: 12,
    },
    {
      id: '9',
      name: 'Татьяна Белова',
      level: 4,
      points: 1380,
      rank: 9,
      region: 'Ростов-на-Дону',
      completedMissions: 21,
      eventsAttended: 11,
    },
    {
      id: '10',
      name: 'Сергей Морозов',
      level: 4,
      points: 1320,
      rank: 10,
      region: 'Уфа',
      completedMissions: 19,
      eventsAttended: 10,
    },
    {
      id: '11',
      name: 'Александр Петров',
      level: 5,
      points: 1250,
      rank: 12,
      region: 'Москва',
      completedMissions: 23,
      eventsAttended: 8,
    },
  ]);

  const currentUser = topUsers.find(user => user.id === '11');

  const getLevelColor = (level: number) => {
    if (level >= 8) return theme.colors.primary;
    if (level >= 6) return theme.colors.warning;
    if (level >= 4) return theme.colors.success;
    return theme.colors.subtext;
  };

  const getLevelTitle = (level: number) => {
    if (level >= 8) return 'Эксперт';
    if (level >= 6) return 'Опытный';
    if (level >= 4) return 'Активный';
    return 'Новичок';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown color={theme.colors.warning} size={20} />;
    if (rank === 2) return <Medal color={theme.colors.subtext} size={20} />;
    if (rank === 3) return <Award color={theme.colors.danger} size={20} />;
    return null;
  };

  const getSelectedCategory = () => {
    return categories.find(cat => cat.id === selectedCategory) || categories[0];
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, paddingBottom: Platform.OS === 'android' ? 16 : 0 }} edges={['bottom', 'left', 'right', 'top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Рейтинги</Text>
          <Text style={styles.headerSubtitle}>
            Соревнуйтесь с другими волонтёрами
          </Text>
        </LinearGradient>

        {/* Current User Stats */}
        {currentUser && (
          <View style={styles.currentUserContainer}>
            <LinearGradient
              colors={[theme.colors.success, theme.colors.success]}
              style={styles.currentUserCard}
            >
              <View style={styles.currentUserInfo}>
                <View style={styles.currentUserAvatar}>
                  <Text style={styles.currentUserInitials}>АП</Text>
                </View>
                <View style={styles.currentUserDetails}>
                  <Text style={styles.currentUserName}>Ваша позиция</Text>
                  <Text style={styles.currentUserRank}>#{currentUser.rank} место</Text>
                  <Text style={styles.currentUserPoints}>{currentUser.points} баллов</Text>
                </View>
              </View>
              <View style={styles.currentUserBadge}>
                <Text style={styles.currentUserLevel}>
                  Ур. {currentUser.level}
                </Text>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Category Selector */}
        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id &&
                    [styles.categoryButtonActive, { backgroundColor: category.color }],
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <IconComponent
                    color={selectedCategory === category.id ? theme.colors.lightText : category.color}
                    size={20}
                  />
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category.id && styles.categoryButtonTextActive,
                    ]}
                  >
                    {category.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Top 3 Podium */}
        <View style={styles.podiumContainer}>
          <Text style={styles.sectionTitle}>Топ-3 лидера</Text>
          <View style={styles.podium}>
            {/* Second Place */}
            <View style={[styles.podiumPlace, styles.secondPlace]}>
              <View style={styles.podiumAvatar}>
                <Text style={styles.podiumInitials}>ДС</Text>
              </View>
              <View style={styles.podiumRank}>
                <Medal color={theme.colors.subtext} size={24} />
              </View>
              <Text style={styles.podiumName}>Дмитрий С.</Text>
              <Text style={styles.podiumPoints}>{topUsers[1].points}</Text>
            </View>

            {/* First Place */}
            <View style={[styles.podiumPlace, styles.firstPlace]}>
              <View style={styles.podiumAvatar}>
                <Text style={styles.podiumInitials}>МИ</Text>
              </View>
              <View style={styles.podiumRank}>
                <Crown color={theme.colors.warning} size={28} />
              </View>
              <Text style={styles.podiumName}>Мария И.</Text>
              <Text style={styles.podiumPoints}>{topUsers[0].points}</Text>
            </View>

            {/* Third Place */}
            <View style={[styles.podiumPlace, styles.thirdPlace]}>
              <View style={styles.podiumAvatar}>
                <Text style={styles.podiumInitials}>ЕК</Text>
              </View>
              <View style={styles.podiumRank}>
                <Award color={theme.colors.danger} size={24} />
              </View>
              <Text style={styles.podiumName}>Елена К.</Text>
              <Text style={styles.podiumPoints}>{topUsers[2].points}</Text>
            </View>
          </View>
        </View>

        {/* Full Rankings */}
        <View style={styles.rankingsSection}>
          <Text style={styles.sectionTitle}>Полный рейтинг</Text>

          <View style={styles.rankingsContainer}>
            {topUsers.map((user, index) => (
              <View
                key={user.id}
                style={[
                  styles.rankingItem,
                  user.id === '11' && styles.currentUserRanking,
                ]}
              >
                <View style={styles.rankingLeft}>
                  <View style={[
                    styles.rankingPosition,
                    index < 3 && styles.topThreePosition,
                  ]}>
                    {index < 3 ? (
                      getRankIcon(user.rank)
                    ) : (
                      <Text style={styles.rankingPositionText}>
                        {user.rank}
                      </Text>
                    )}
                  </View>

                  <View style={styles.rankingAvatar}>
                    <Text style={styles.rankingInitials}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </Text>
                  </View>

                  <View style={styles.rankingInfo}>
                    <Text style={[
                      styles.rankingName,
                      user.id === '11' && styles.currentUserText,
                    ]}>
                      {user.name}
                    </Text>
                    <View style={styles.rankingDetails}>
                      <Text style={styles.rankingRegion}>{user.region}</Text>
                      <Text style={styles.rankingLevel}>
                        Ур. {user.level} • {getLevelTitle(user.level)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.rankingRight}>
                  <Text style={[
                    styles.rankingPoints,
                    user.id === '11' && styles.currentUserText,
                  ]}>
                    {user.points}
                  </Text>
                  <Text style={styles.rankingPointsLabel}>баллов</Text>
                  {user.id === '11' && (
                    <View style={styles.youBadge}>
                      <Text style={styles.youBadgeText}>Вы</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Статистика</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Users color={theme.colors.primary} size={24} />
              <Text style={styles.statValue}>1,847</Text>
              <Text style={styles.statLabel}>Всего волонтёров</Text>
            </View>
            <View style={styles.statCard}>
              <Target color={theme.colors.success} size={24} />
              <Text style={styles.statValue}>12,456</Text>
              <Text style={styles.statLabel}>Миссий выполнено</Text>
            </View>
            <View style={styles.statCard}>
              <Star color={theme.colors.warning} size={24} />
              <Text style={styles.statValue}>2.8M</Text>
              <Text style={styles.statLabel}>Баллов заработано</Text>
            </View>
            <View style={styles.statCard}>
              <Trophy color={theme.colors.danger} size={24} />
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Активных регионов</Text>
            </View>
          </View>
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
    backgroundColor: theme.colors.background
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 80,
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
  currentUserContainer: {
    marginHorizontal: 20,
    marginTop: -60,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  currentUserCard: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentUserAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  currentUserInitials: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: theme.colors.lightText,
  },
  currentUserDetails: {},
  currentUserName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.lightText,
    opacity: 0.8,
  },
  currentUserRank: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: theme.colors.lightText,
    marginVertical: 2,
  },
  currentUserPoints: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: theme.colors.lightText,
    opacity: 0.9,
  },
  currentUserBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  currentUserLevel: {
    fontSize: 13,
    fontFamily: 'Inter-Bold',
    color: theme.colors.lightText,
  },
  categoryContainer: {
    paddingVertical: 15,
    paddingLeft: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 12,
    marginRight: 12,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryButtonActive: {
    elevation: 6,
  },
  categoryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.subtext,
  },
  categoryButtonTextActive: {
    color: theme.colors.lightText,
  },
  podiumContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text,
    marginBottom: 15,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 200,
  },
  podiumPlace: {
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  firstPlace: {
    height: 160,
    width: 100,
  },
  secondPlace: {
    height: 140,
    width: 90,
  },
  thirdPlace: {
    height: 120,
    width: 90,
  },
  podiumAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${theme.colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  podiumInitials: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: theme.colors.primary,
  },
  podiumRank: {
    marginBottom: 8,
  },
  podiumName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  podiumPoints: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: theme.colors.subtext,
  },
  rankingsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  rankingsContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 15,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  currentUserRanking: {
    backgroundColor: `${theme.colors.primary}20`,
    marginHorizontal: -15,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderBottomWidth: 0,
  },
  rankingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankingPosition: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topThreePosition: {
    backgroundColor: 'transparent',
  },
  rankingPositionText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: theme.colors.subtext,
  },
  rankingAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${theme.colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankingInitials: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: theme.colors.primary,
  },
  rankingInfo: {
    flex: 1,
  },
  rankingName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text,
    marginBottom: 2,
  },
  currentUserText: {
    color: theme.colors.primary,
  },
  rankingDetails: {
    flexDirection: 'row',
    gap: 8,
  },
  rankingRegion: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: theme.colors.subtext,
  },
  rankingLevel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: theme.colors.subtext,
  },
  rankingRight: {
    alignItems: 'flex-end',
  },
  rankingPoints: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text,
  },
  rankingPointsLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: theme.colors.subtext,
  },
  youBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  youBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.lightText,
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 55) / 2,
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: theme.colors.subtext,
    marginTop: 2,
    textAlign: 'center',
  },
});