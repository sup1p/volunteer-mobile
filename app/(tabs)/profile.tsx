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
  User,
  Star,
  Trophy,
  Award,
  Target,
  Calendar,
  Settings,
  LogOut,
  Crown,
  TrendingUp,
  Shield,
  BookOpen,
  Users,
  Medal,
  ChevronRight,
  Flag,
  Lightbulb,
  FileText,
  GraduationCap,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
}

interface RankingUser {
  id: string;
  name: string;
  level: number;
  points: number;
  rank: number;
}

interface QuickAction {
  id: string;
  title: string;
  icon: any;
  color: string;
  screen: any;
}

interface Stat {
  id: string;
  value: string;
  label: string;
  icon: any;
}

export default function ProfileScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [userData] = useState({
    name: 'Александр Петров',
    email: 'a.petrov@email.com',
    level: 5,
    points: 1250,
    nextLevelPoints: 1500,
    rank: 12,
    completedMissions: 23,
    eventsAttended: 8,
    coursesCompleted: 2,
    joinDate: '15 марта 2024',
    totalVolunteers: 1847,
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Первые шаги',
      description: 'Зарегистрировались в приложении',
      icon: Star,
      color: '#f59e0b',
      earned: true,
    },
    {
      id: '2',
      title: 'Знаток права',
      description: 'Прошли 3 курса по антикоррупционному праву',
      icon: BookOpen,
      color: '#667eea',
      earned: true,
    },
    {
      id: '3',
      title: 'Активист',
      description: 'Участвовали в 5 мероприятиях',
      icon: Users,
      color: '#10b981',
      earned: false,
      progress: 3,
      maxProgress: 5,
    },
    {
      id: '4',
      title: 'Страж закона',
      description: 'Подали 10 качественных сигналов',
      icon: Shield,
      color: '#ef4444',
      earned: false,
      progress: 6,
      maxProgress: 10,
    },
  ]);

  const [topVolunteers] = useState<RankingUser[]>([
    { id: '1', name: 'Мария Иванова', level: 8, points: 2450, rank: 1 },
    { id: '2', name: 'Дмитрий Сидоров', level: 7, points: 2180, rank: 2 },
    { id: '3', name: 'Елена Козлова', level: 6, points: 1920, rank: 3 },
    { id: '4', name: 'Александр Петров', level: 5, points: 1250, rank: 12 },
  ]);

  const quickActions: QuickAction[] = [
    {
      id: 'report',
      title: 'Подать сигнал',
      icon: Flag,
      color: '#ef4444',
      screen: '/features/report',
    },
    {
      id: 'initiative',
      title: 'Инициативы',
      icon: Lightbulb,
      color: '#f59e0b',
      screen: '/features/initiative',
    },
    {
      id: 'feedback',
      title: 'Обратная связь',
      icon: FileText,
      color: '#10b981',
      screen: '/features/feedback',
    },
    {
      id: 'learning',
      title: 'Обучение',
      icon: GraduationCap,
      color: '#3b82f6',
      screen: '/features/learning',
    },
  ];

  const accountActions = [
    {
      id: 'edit',
      title: 'Редактировать профиль',
      icon: User,
      screen: '/features/edit-profile',
    },
    { id: 'settings', title: 'Настройки', icon: Settings, screen: '/features/settings' },
    { id: 'logout', title: 'Выйти', icon: LogOut, screen: '/auth' },
  ];

  const getLevelTitle = (level: number) => {
    if (level < 5) return 'Новичок';
    if (level < 10) return 'Активист';
    if (level < 15) return 'Ветеран';
    return 'Мастер';
  };

  const getLevelColor = (level: number) => {
    if (level < 5) return '#a0aec0'; // gray
    if (level < 10) return '#4299e1'; // blue
    if (level < 15) return '#9f7aea'; // purple
    return '#f56565'; // red
  };

  const handleQuickAction = (action: QuickAction) => {
    if (action.screen) {
      router.push(action.screen as any);
    } else {
      console.log('Quick action:', action.id);
    }
  };

  const handleLogout = () => {
    // In a real app, you would also clear any user session data
    router.replace('/auth');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
          style={styles.header}
        >
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <User color={theme.colors.lightText} size={40} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userEmail}>{userData.email}</Text>
              <View style={styles.levelContainer}>
                <View style={[styles.levelBadge, { backgroundColor: getLevelColor(userData.level) }]}>
                  <Text style={styles.levelText}>
                    Ур. {userData.level} • {getLevelTitle(userData.level)}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.settingsButton} onPress={() => router.push('/features/settings' as any)}>
              <Settings color={theme.colors.lightText} size={24} />
            </TouchableOpacity>
          </View>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>
                {userData.points} / {userData.nextLevelPoints} баллов
              </Text>
              <Text style={styles.progressSubtext}>
                До следующего уровня: {userData.nextLevelPoints - userData.points}
              </Text>
            </View>
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

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <TrendingUp color="#667eea" size={24} />
            <Text style={styles.statValue}>#{userData.rank}</Text>
            <Text style={styles.statLabel}>Место в рейтинге</Text>
          </View>
          <View style={styles.statCard}>
            <Target color="#10b981" size={24} />
            <Text style={styles.statValue}>{userData.completedMissions}</Text>
            <Text style={styles.statLabel}>Миссий выполнено</Text>
          </View>
          <View style={styles.statCard}>
            <Calendar color="#f59e0b" size={24} />
            <Text style={styles.statValue}>{userData.eventsAttended}</Text>
            <Text style={styles.statLabel}>Мероприятий</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Быстрые действия</Text>
          <View style={styles.quickActionsContainer}>
            {quickActions.map(action => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickAction}
                onPress={() => router.push(action.screen as any)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <action.icon color="#ffffff" size={24} />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Достижения</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <View
                  key={achievement.id}
                  style={[
                    styles.achievementCard,
                    !achievement.earned && styles.achievementCardLocked,
                  ]}
                >
                  <View
                    style={[
                      styles.achievementIcon,
                      { backgroundColor: `${achievement.color}20` },
                      !achievement.earned && styles.achievementIconLocked,
                    ]}
                  >
                    <IconComponent
                      color={achievement.earned ? achievement.color : '#ccc'}
                      size={24}
                    />
                  </View>
                  <Text
                    style={[
                      styles.achievementTitle,
                      !achievement.earned && styles.achievementTitleLocked,
                    ]}
                  >
                    {achievement.title}
                  </Text>
                  <Text
                    style={[
                      styles.achievementDescription,
                      !achievement.earned && styles.achievementDescriptionLocked,
                    ]}
                  >
                    {achievement.description}
                  </Text>

                  {!achievement.earned && achievement.progress && achievement.maxProgress && (
                    <View style={styles.achievementProgress}>
                      <View style={styles.achievementProgressBar}>
                        <View
                          style={[
                            styles.achievementProgressFill,
                            {
                              width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                              backgroundColor: achievement.color,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.achievementProgressText}>
                        {achievement.progress}/{achievement.maxProgress}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Top Volunteers Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Топ волонтёров</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/rankings')}>
              <Text style={styles.seeAll}>Все рейтинги</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rankingContainer}>
            {topVolunteers.slice(0, 3).map((volunteer, index) => (
              <View
                key={volunteer.id}
                style={[
                  styles.rankingItem,
                  volunteer.id === '4' && styles.currentUserRanking,
                ]}
              >
                <View style={styles.rankingLeft}>
                  <View style={[
                    styles.rankingPosition,
                    index < 3 && styles.topThreePosition,
                    index === 0 && { backgroundColor: '#f59e0b' },
                    index === 1 && { backgroundColor: '#e5e7eb' },
                    index === 2 && { backgroundColor: '#cd7c2f' },
                  ]}>
                    {index < 3 ? (
                      <Trophy
                        color="#ffffff"
                        size={16}
                      />
                    ) : (
                      <Text style={styles.rankingPositionText}>
                        {volunteer.rank}
                      </Text>
                    )}
                  </View>
                  <View style={styles.rankingInfo}>
                    <Text style={[
                      styles.rankingName,
                      volunteer.id === '4' && styles.currentUserText,
                    ]}>
                      {volunteer.name}
                    </Text>
                    <View style={styles.rankingDetails}>
                      <Text style={styles.rankingLevel}>
                        Ур. {volunteer.level}
                      </Text>
                      <Text style={styles.rankingPoints}>
                        {volunteer.points} баллов
                      </Text>
                    </View>
                  </View>
                </View>
                {volunteer.id === '4' && (
                  <View style={styles.currentUserBadge}>
                    <Text style={styles.currentUserBadgeText}>Вы</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Аккаунт</Text>
          <View style={styles.actionsContainer}>
            {accountActions.map(action => (
              <TouchableOpacity
                key={action.id}
                style={[styles.actionButton, action.id === 'logout' && styles.logoutButton]}
                onPress={() => {
                  if (action.id === 'logout') {
                    // Perform logout logic here
                    router.replace(action.screen as any);
                  } else {
                    router.push(action.screen as any);
                  }
                }}
              >
                <action.icon
                  color={action.id === 'logout' ? theme.colors.danger : theme.colors.subtext}
                  size={22}
                />
                <Text style={[styles.actionButtonText, action.id === 'logout' && styles.logoutButtonText]}>
                  {action.title}
                </Text>
                {action.id !== 'logout' && <ChevronRight color={theme.colors.subtext} size={20} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Footer Info */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>
            Волонтёр с {userData.joinDate}
          </Text>
          <Text style={styles.footerText}>
            Часть сообщества из {userData.totalVolunteers} активистов
          </Text>
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
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: theme.colors.lightText,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: theme.colors.lightText,
    opacity: 0.8,
    marginBottom: 8,
  },
  levelContainer: {
    flexDirection: 'row',
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.lightText,
  },
  settingsButton: {
    padding: 8,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.lightText,
  },
  progressSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: theme.colors.lightText,
    opacity: 0.8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.lightText,
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: -15,
  },
  statCard: {
    backgroundColor: theme.colors.card,
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
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
    marginBottom: 15,
  },
  seeAll: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.primary,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    width: (width - 60) / 4,
    marginBottom: 15,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: theme.colors.text,
    textAlign: 'center',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: (width - 55) / 2,
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  achievementCardLocked: {
    backgroundColor: theme.colors.card,
    opacity: 0.7,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementIconLocked: {
    backgroundColor: theme.colors.border,
  },
  achievementTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 5,
  },
  achievementTitleLocked: {
    color: theme.colors.subtext,
  },
  achievementDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: theme.colors.subtext,
    textAlign: 'center',
    lineHeight: 16,
  },
  achievementDescriptionLocked: {
    color: theme.colors.disabled,
  },
  achievementProgress: {
    width: '100%',
    marginTop: 10,
  },
  achievementProgressBar: {
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 5,
  },
  achievementProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  achievementProgressText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.subtext,
    textAlign: 'center',
  },
  rankingContainer: {
    backgroundColor: theme.colors.card,
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
    backgroundColor: '#f59e0b',
  },
  rankingPositionText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: theme.colors.subtext,
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
    gap: 10,
  },
  rankingLevel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: theme.colors.subtext,
  },
  rankingPoints: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: theme.colors.subtext,
  },
  currentUserBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  currentUserBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  actionsContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: theme.colors.text,
    marginLeft: 15,
    flex: 1,
  },
  logoutButton: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  logoutButtonText: {
    color: theme.colors.danger,
  },
  footerInfo: {
    alignItems: 'center',
    padding: 30,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: theme.colors.subtext,
  },
});