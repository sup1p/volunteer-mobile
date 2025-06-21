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
  const [selectedCategory, setSelectedCategory] = useState('overall');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const categories: LeaderboardCategory[] = [
    {
      id: 'overall',
      title: 'Общий рейтинг',
      icon: Trophy,
      color: '#f59e0b',
    },
    {
      id: 'missions',
      title: 'По миссиям',
      icon: Target,
      color: '#10b981',
    },
    {
      id: 'events',
      title: 'По мероприятиям',
      icon: Users,
      color: '#667eea',
    },
    {
      id: 'monthly',
      title: 'За месяц',
      icon: TrendingUp,
      color: '#ef4444',
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
    if (level >= 8) return '#8b5cf6';
    if (level >= 6) return '#f59e0b';
    if (level >= 4) return '#10b981';
    return '#667eea';
  };

  const getLevelTitle = (level: number) => {
    if (level >= 8) return 'Эксперт';
    if (level >= 6) return 'Опытный';
    if (level >= 4) return 'Активный';
    return 'Новичок';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown color="#f59e0b" size={20} />;
    if (rank === 2) return <Medal color="#e5e7eb" size={20} />;
    if (rank === 3) return <Award color="#cd7c2f" size={20} />;
    return null;
  };

  const getSelectedCategory = () => {
    return categories.find(cat => cat.id === selectedCategory) || categories[0];
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
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
              colors={['#10b981', '#059669']}
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
                    selectedCategory === category.id && styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <IconComponent
                    color={selectedCategory === category.id ? '#ffffff' : category.color}
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
                <Medal color="#e5e7eb" size={24} />
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
                <Crown color="#f59e0b" size={28} />
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
                <Award color="#cd7c2f" size={24} />
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
              <Users color="#667eea" size={24} />
              <Text style={styles.statValue}>1,847</Text>
              <Text style={styles.statLabel}>Всего волонтёров</Text>
            </View>
            <View style={styles.statCard}>
              <Target color="#10b981" size={24} />
              <Text style={styles.statValue}>12,456</Text>
              <Text style={styles.statLabel}>Миссий выполнено</Text>
            </View>
            <View style={styles.statCard}>
              <Star color="#f59e0b" size={24} />
              <Text style={styles.statValue}>2.8M</Text>
              <Text style={styles.statLabel}>Баллов заработано</Text>
            </View>
            <View style={styles.statCard}>
              <Trophy color="#ef4444" size={24} />
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Активных регионов</Text>
            </View>
          </View>
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
  currentUserContainer: {
    paddingHorizontal: 20,
    marginTop: -15,
    marginBottom: 20,
  },
  currentUserCard: {
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  currentUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentUserAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  currentUserInitials: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  currentUserDetails: {
    flex: 1,
  },
  currentUserName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    opacity: 0.9,
  },
  currentUserRank: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  currentUserPoints: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    opacity: 0.9,
  },
  currentUserBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  currentUserLevel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  categoryContainer: {
    paddingVertical: 15,
    paddingLeft: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryButtonActive: {
    backgroundColor: '#667eea',
  },
  categoryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginLeft: 8,
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  podiumContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333',
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
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    shadowColor: '#000',
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
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  podiumInitials: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#667eea',
  },
  podiumRank: {
    marginBottom: 8,
  },
  podiumName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  podiumPoints: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  rankingsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  rankingsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
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
    borderBottomColor: '#f0f0f0',
  },
  currentUserRanking: {
    backgroundColor: '#f0f4ff',
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
    backgroundColor: '#f0f0f0',
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
    color: '#666',
  },
  rankingAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankingInitials: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#667eea',
  },
  rankingInfo: {
    flex: 1,
  },
  rankingName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 2,
  },
  currentUserText: {
    color: '#667eea',
  },
  rankingDetails: {
    flexDirection: 'row',
    gap: 8,
  },
  rankingRegion: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#999',
  },
  rankingLevel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  rankingRight: {
    alignItems: 'flex-end',
  },
  rankingPoints: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  rankingPointsLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  youBadge: {
    backgroundColor: '#667eea',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  youBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
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
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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
});