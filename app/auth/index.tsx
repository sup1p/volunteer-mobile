import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, Mail, Lock, User, Eye, EyeOff } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

export default function AuthScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const switchMode = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: isLogin ? -width : width,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      slideAnim.setValue(isLogin ? width : -width);
      setIsLogin(!isLogin);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleAuth = () => {
    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Ошибка регистрации', 'Пароли не совпадают.');
      return;
    }
    // Здесь будет логика авторизации/регистрации
    router.replace('/(tabs)');
  };

  return (
    <LinearGradient
      colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Shield color={theme.colors.lightText} size={60} strokeWidth={2} />
            </View>
            <Text style={styles.appName}>VolunteerShield</Text>
            <Text style={styles.tagline}>
              {isLogin ? 'Добро пожаловать обратно!' : 'Присоединяйтесь к движению!'}
            </Text>
          </View>

          <Animated.View
            style={[
              styles.formContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <View style={styles.form}>
              {!isLogin && (
                <View style={styles.inputContainer}>
                  <User color={theme.colors.primary} size={20} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Полное имя"
                    placeholderTextColor={theme.colors.subtext}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>
              )}

              <View style={styles.inputContainer}>
                <Mail color={theme.colors.primary} size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email адрес"
                  placeholderTextColor={theme.colors.subtext}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Lock color={theme.colors.primary} size={20} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Пароль"
                  placeholderTextColor={theme.colors.subtext}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff color={theme.colors.primary} size={20} />
                  ) : (
                    <Eye color={theme.colors.primary} size={20} />
                  )}
                </TouchableOpacity>
              </View>

              {!isLogin && (
                <View style={styles.inputContainer}>
                  <Lock color={theme.colors.primary} size={20} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Подтвердите пароль"
                    placeholderTextColor={theme.colors.subtext}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff color={theme.colors.primary} size={20} />
                    ) : (
                      <Eye color={theme.colors.primary} size={20} />
                    )}
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                style={styles.authButton}
                onPress={handleAuth}
              >
                <LinearGradient
                  colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
                  style={styles.authButtonGradient}
                >
                  <Text style={styles.authButtonText}>
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.adminButton}
                onPress={() => router.push('/admin')}
              >
                <Text style={styles.adminButtonText}>
                  (Dev) Go to Admin Panel
                </Text>
              </TouchableOpacity>

              {isLogin && (
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    Забыли пароль?
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>
                {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
              </Text>
              <TouchableOpacity onPress={switchMode}>
                <Text style={styles.switchButton}>
                  {isLogin ? 'Зарегистрироваться' : 'Войти'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: theme.colors.lightText,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: theme.colors.lightText,
    opacity: 0.9,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  form: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: theme.colors.text,
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  authButton: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  authButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  authButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.lightText,
  },
  adminButton: {
    borderColor: theme.colors.lightText,
    borderWidth: 1,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 15,
  },
  adminButtonText: {
    color: theme.colors.lightText,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    opacity: 0.8,
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: 15,
  },
  forgotPasswordText: {
    color: theme.colors.lightText,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    opacity: 0.8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  switchText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: theme.colors.lightText,
    opacity: 0.9,
  },
  switchButton: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.lightText,
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});