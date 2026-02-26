import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useTranslations, useI18n } from '@/i18n';

export default function LoginScreen() {
  const t = useTranslations('login');
  const { isRTL } = useI18n();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email === 'parent@example.com' && password === 'password123') {
      Alert.alert(t('common.ok'), t('login.loginSuccess'));
      router.replace('/'); // Navigate to home screen
    } else {
      Alert.alert(t('common.error'), t('login.error.invalidCredentials'));
    }
    setLoading(false);
  };

  return (
    <View style={[styles.container, isRTL && styles.rtlContainer]}>
      <Text style={styles.title}>{t('title')}</Text>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, isRTL && styles.rtlLabel]}>{t('emailLabel')}</Text>
        <TextInput
          style={[styles.input, isRTL && styles.rtlInput]}
          placeholder={t('emailPlaceholder')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
          accessibilityLabel={t('emailLabel')}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, isRTL && styles.rtlLabel]}>{t('passwordLabel')}</Text>
        <TextInput
          style={[styles.input, isRTL && styles.rtlInput]}
          placeholder={t('passwordPlaceholder')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
          accessibilityLabel={t('passwordLabel')}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
        accessibilityRole="button"
        accessibilityLabel={t('loginButton')}
      >
        <Text style={styles.buttonText}>{loading ? t('common.loading') : t('loginButton')}</Text>
      </TouchableOpacity>

      <View style={[styles.signUpContainer, isRTL && styles.rtlSignUpContainer]}>
        <Text style={styles.signUpPrompt}>{t('noAccountPrompt')}</Text>
        <Link href="/auth/signup" asChild>
          <TouchableOpacity accessibilityRole="link" accessibilityLabel={t('signUpLink')}>
            <Text style={[styles.signUpLink, isRTL && styles.rtlSignUpLink]}>{t('signUpLink')}</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  rtlContainer: {
    direction: 'rtl',
    textAlign: 'right',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5, // Use logical properties for margin/padding
    alignSelf: 'flex-start', // Align label to start
  },
  rtlLabel: {
    alignSelf: 'flex-end', // Align label to end for RTL
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  rtlInput: {
    textAlign: 'right',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  rtlSignUpContainer: {
    flexDirection: 'row-reverse',
  },
  signUpPrompt: {
    fontSize: 14,
    color: '#666',
  },
  signUpLink: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold', // Use logical properties for margin/padding
    marginStart: 5,
  },
  rtlSignUpLink: {
    marginEnd: 5,
    marginStart: 0,
  },
});
