import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, ChevronRight, User, Award, Shield, Bell, Palette, Lock, HelpCircle, Star, X, Ticket, TrendingUp, Target, Calendar, CheckCircle, Flag, Lightbulb, FileText, GraduationCap } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { AppEvent, mockEvents, mockUserRegistrations, UserEventRegistration, mockUsers, User as UserType, mockUserCertificates, UserCertificate } from '@/src/data/mockData';
import { router } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('window');
const CURRENT_USER_ID = '2'; // Mock current user

export default function ProfileScreen() {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles(theme);

  const [user, setUser] = useState<UserType | undefined>(mockUsers.find(u => u.id === CURRENT_USER_ID));
  const scrollY = new Animated.Value(0);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<{ event: AppEvent; registration: UserEventRegistration } | null>(null);

  const quickActions = [
    { id: 'report', title: 'Подать сигнал', icon: Flag, color: theme.colors.danger, screen: '/features/report' },
    { id: 'initiative', title: 'Инициативы', icon: Lightbulb, color: theme.colors.warning, screen: '/features/initiative' },
    { id: 'feedback', title: 'Оценить', icon: FileText, color: theme.colors.success, screen: '/features/feedback' },
    { id: 'learning', title: 'Обучение', icon: GraduationCap, color: theme.colors.primary, screen: '/features/learning' },
  ];

  const userRegistrations = mockUserRegistrations.filter(reg => reg.userId === CURRENT_USER_ID && reg.status === 'registered');
  const userTickets = userRegistrations.map(reg => {
    const event = mockEvents.find(e => e.id === reg.eventId);
    return { event, registration: reg };
  }).filter(item => item.event);

  const userCertificates = mockUserCertificates.filter(cert => cert.userId === CURRENT_USER_ID);

  const handleLogout = () => {
    console.log('Вызов бэкенда: Выход из системы');
    router.replace('/auth');
  };

  const handleTicketPress = (ticket: { event: AppEvent; registration: UserEventRegistration }) => {
    setSelectedTicket(ticket);
    setTicketModalVisible(true);
  };

  const getLevelTitle = (level: number) => {
    if (level >= 10) return 'Магистр прозрачности';
    if (level >= 7) return 'Эксперт по надзору';
    if (level >= 5) return 'Опытный активист';
    if (level >= 3) return 'Начинающий волонтёр';
    return 'Новичок';
  };

  const getLevelColor = (level: number) => {
    if (level >= 10) return '#c0392b';
    if (level >= 7) return '#d35400';
    if (level >= 5) return theme.colors.primary;
    if (level >= 3) return '#27ae60';
    return '#7f8c8d';
  };


  const headerHeight = scrollY.interpolate({ inputRange: [0, 150], outputRange: [150, 80], extrapolate: 'clamp' });
  const avatarSize = scrollY.interpolate({ inputRange: [0, 150], outputRange: [100, 60], extrapolate: 'clamp' });
  const textOpacity = scrollY.interpolate({ inputRange: [0, 100], outputRange: [1, 0], extrapolate: 'clamp' });

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: theme.colors.text, textAlign: 'center', marginTop: 50 }}>Пользователь не найден</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.Image source={{ uri: user.avatar }} style={[styles.avatar, { width: avatarSize, height: avatarSize }]} />
          <Animated.View style={[styles.headerTextContainer, { opacity: textOpacity }]}>
            <Text style={styles.userName}>{user.name}</Text>
            <View style={[styles.levelBadge, { backgroundColor: getLevelColor(user.level) }]}>
              <Text style={styles.levelText}>Ур. {user.level} • {getLevelTitle(user.level)}</Text>
            </View>
          </Animated.View>
        </Animated.View>

        <View style={styles.content}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.points}</Text>
              <Text style={styles.statLabel}>Баллы</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.rank}</Text>
              <Text style={styles.statLabel}>Рейтинг</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.eventsAttended}</Text>
              <Text style={styles.statLabel}>События</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Быстрые действия</Text>
            <View style={styles.quickActionsContainer}>
              {quickActions.map(action => (
                <TouchableOpacity key={action.id} style={styles.quickAction} onPress={() => router.push(action.screen as any)}>
                  <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                    <action.icon color={theme.colors.lightText} size={24} />
                  </View>
                  <Text style={styles.quickActionText}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Моя активность</Text>
            <View style={styles.menuSection}>
              <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/features/my-tickets' as any)}>
                <Ticket color={theme.colors.subtext} size={22} />
                <Text style={styles.menuItemText}>Мои билеты</Text>
                {userTickets.length > 0 && <View style={styles.badgeContainer}><Text style={styles.badgeText}>{userTickets.length}</Text></View>}
                <ChevronRight color={theme.colors.subtext} size={22} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/features/achievements' as any)}>
                <Award color={theme.colors.subtext} size={22} />
                <Text style={styles.menuItemText}>Достижения</Text>
                <ChevronRight color={theme.colors.subtext} size={22} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/features/my-certificates' as any)}>
                <GraduationCap color={theme.colors.subtext} size={22} />
                <Text style={styles.menuItemText}>Мои сертификаты</Text>
                {userCertificates.length > 0 && <View style={styles.badgeContainer}><Text style={styles.badgeText}>{userCertificates.length}</Text></View>}
                <ChevronRight color={theme.colors.subtext} size={22} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Настройки</Text>
            <View style={styles.menuSection}>
              <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/features/edit-profile' as any)}>
                <User color={theme.colors.subtext} size={22} />
                <Text style={styles.menuItemText}>Редактировать профиль</Text>
                <ChevronRight color={theme.colors.subtext} size={22} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/features/notifications' as any)}>
                <Bell color={theme.colors.subtext} size={22} />
                <Text style={styles.menuItemText}>Уведомления</Text>
                <ChevronRight color={theme.colors.subtext} size={22} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={toggleTheme}>
                <Palette color={theme.colors.subtext} size={22} />
                <Text style={styles.menuItemText}>Тема: {isDarkMode ? 'Темная' : 'Светлая'}</Text>
                <ChevronRight color={theme.colors.subtext} size={22} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.menuSection}>
              <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/features/help-support' as any)}>
                <HelpCircle color={theme.colors.subtext} size={22} />
                <Text style={styles.menuItemText}>Помощь и поддержка</Text>
                <ChevronRight color={theme.colors.subtext} size={22} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <LogOut color={theme.colors.danger} size={22} />
              <Text style={styles.logoutButtonText}>Выйти из системы</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  header: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: theme.colors.lightText,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: theme.colors.lightText,
  },
  levelBadge: {
    marginTop: 5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
  levelText: {
    color: theme.colors.lightText,
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: theme.colors.background
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: theme.colors.subtext,
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text,
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  quickAction: {
    alignItems: 'center',
    width: (width - 80) / 4,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: theme.colors.text,
    textAlign: 'center',
  },
  menuSection: {
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text,
    marginLeft: 15,
    flex: 1,
  },
  badgeContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 10,
  },
  badgeText: {
    color: theme.colors.lightText,
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  logoutButton: {
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  logoutButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.danger,
    marginLeft: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: 25,
    width: width * 0.9,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text,
    marginBottom: 20,
  },
  qrContainer: {
    padding: 20,
    backgroundColor: theme.colors.lightText,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  ticketEventTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 5,
  },
  ticketEventDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: theme.colors.subtext,
    textAlign: 'center',
    marginBottom: 20,
  },
  ticketInstruction: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: theme.colors.subtext,
    textAlign: 'center',
  }
});