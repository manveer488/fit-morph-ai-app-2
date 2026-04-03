import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Modal, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import MobileContainer from '../components/MobileContainer';
import Button from '../components/Button';
import { googleLogin, appleLogin } from '../services/authService';
import GoogleLoginButton from '../components/GoogleLoginButton';
import AppleLoginButton from '../components/AppleLoginButton';
import { Mail } from 'lucide-react-native';

export default function Join({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleAuth = async (loginFn) => {
    setLoading(true);
    try {
      const userData = await loginFn();
      if (userData) {
        navigation.replace('BodyScan');
      }
    } catch (error) {
      Alert.alert('Sign In Failed', error.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileContainer>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.stepIndicator}>Step 3 of 3</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
        <View style={styles.heroContainer}>
          <View style={styles.glow} />
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt0cLCTcSxuV1VGXMXcdWVOPPC-1th_otgIO4cWQvxe8klWw9LpklV3CgllZyZytQpr60rjvVFirtZWwskbZmmkTdgCCOCsHa_kMEkKrn5LxBj0f6Vv_swIORpJCgSpa_z3cbeyJETwgZltKSw5RAD6p6R3j9M5znloX68W1GBHIWK4l0DzRvo2CN15L3IPQwVLROMsyfku7W7zPMo1_vFa7pRXPnx7vM1VBVQfI9dePEFtRg_ZOalmNf3qcy9emHaAZJvRIcBR0Yj' }} 
            style={styles.heroImage}
          />
          <View style={styles.heroText}>
            <h1 style={styles.title}>Join FitMorph AI</h1>
            <Text style={styles.subtitle}>
              Experience the future of fitness with AI-driven transformation and precision tracking.
            </Text>
          </View>
        </View>

        {/* Auth Buttons */}
        <View style={styles.footer}>
          <View style={styles.buttonGap}>
            <Button 
              variant="primary" 
              onPress={() => navigation.navigate('EmailAuth')}
              icon={<Mail color="#fff" size={20} />}
            >
              Continue with Email
            </Button>
            
            <GoogleLoginButton 
              onGooglePress={() => handleAuth(googleLogin)}
              loading={loading}
            />

            <AppleLoginButton 
              onApplePress={() => handleAuth(appleLogin)}
              loading={loading}
            />
          </View>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to FitMorph AI's {'\n'}
              <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>
            </Text>
            <View style={styles.loginOption}>
              <Text style={styles.noAccountText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('EmailAuth')}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Loading Modal */}
      <Modal transparent visible={loading} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#6e3dff" />
            <Text style={styles.modalText}>Connecting Securely...</Text>
          </View>
        </View>
      </Modal>
    </MobileContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    height: 64,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  backIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stepIndicator: {
    color: '#fff',
    opacity: 0.5,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    minHeight: 400,
  },
  heroImage: {
    width: '100%',
    height: 280,
    borderRadius: 24,
    backgroundColor: '#1a1a1a',
  },
  glow: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#6e3dff20',
    borderRadius: 200,
  },
  heroText: {
    marginTop: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 18,
    color: '#94a3b8',
    marginTop: 12,
    lineHeight: 26,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  buttonGap: {
    gap: 16,
  },
  termsContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: '#6e3dff',
    fontWeight: '600',
  },
  loginOption: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
  },
  noAccountText: {
    color: '#64748b',
    fontSize: 14,
  },
  loginLink: {
    color: '#6e3dff',
    fontSize: 14,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 32,
    backgroundColor: '#140f23',
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(110, 61, 255, 0.2)',
  },
  modalText: {
    color: '#fff',
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
  }
});
