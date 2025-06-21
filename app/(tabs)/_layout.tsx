import { Tabs } from 'expo-router';
import { Chrome as Home, Calendar, TrendingUp, MessageCircle, User } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.subtext,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Medium',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Календарь',
          tabBarIcon: ({ size, color }) => (
            <Calendar size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Чат-бот',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="rankings"
        options={{
          title: 'Рейтинги',
          tabBarIcon: ({ size, color }) => (
            <TrendingUp size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}