import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Easing, 
  Image, 
  Dimensions 
} from 'react-native';
import MobileContainer from '../components/MobileContainer';
import Button from '../components/Button';
import { ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function Welcome({ navigation }) {
  // Animation Values
  const scanAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const sparkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Scan Beam Animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotate Hologram Base
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Floating Effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Sparks Animation
    Animated.loop(
      Animated.timing(sparkAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const scanTranslateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 240],
  });

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <MobileContainer>
      <View style={styles.container}>
        {/* Hologram Section */}
        <View style={styles.hologramContainer}>
          {/* Rotating Base */}
          <Animated.View style={[styles.hologramBase, { transform: [{ rotate: rotation }] }]}>
            <View style={styles.ringInner} />
            <View style={styles.ringOuter} />
          </Animated.View>

          {/* Figure Container */}
          <Animated.View style={[styles.figureWrapper, { transform: [{ translateY: floatAnim }] }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt0cLCTcSxuV1VGXMXcdWVOPPC-1th_otgIO4cWQvxe8klWw9LpklV3CgllZyZytQpr60rjvVFirtZWwskbZmmkTdgCCOCsHa_kMEkKrn5LxBj0f6Vv_swIORpJCgSpa_z3cbeyJETwgZltKSw5RAD6p6R3j9M5znloX68W1GBHIWK4l0DzRvo2CN15L3IPQwVLROMsyfku7W7zPMo1_vFa7pRXPnx7vM1VBVQfI9dePEFtRg_ZOalmNf3qcy9emHaAZJvRIcBR0Yj' }} 
              style={styles.figure}
              resizeMode="contain"
            />
            
            {/* Scan Beam */}
            <Animated.View style={[styles.scanBeam, { transform: [{ translateY: scanTranslateY }] }]}>
                <View style={styles.beamInner} />
            </Animated.View>

            {/* Flickering Grid Overlay */}
            <View style={styles.gridOverlay} pointerEvents="none" />
          </Animated.View>

          {/* Spark Particles (Static for now, could be mapped) */}
          <View style={styles.sparksContainer}>
            <View style={[styles.spark, { top: '20%', left: '30%' }]} />
            <View style={[styles.spark, { top: '50%', left: '70%' }]} />
            <View style={[styles.spark, { top: '80%', left: '40%' }]} />
          </View>
        </View>

        {/* Text Section */}
        <View style={styles.textSection}>
          <Text style={styles.welcomeText}>
            Welcome to <Text style={styles.brandText}>FitMorph AI</Text>
          </Text>
          <Text style={styles.description}>
            Your AI-powered body transformation journey starts now.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.pagination}>
            <View style={styles.dotActive} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
          
          <Button 
            onPress={() => navigation.navigate('Join')}
            icon={<ArrowRight color="#fff" size={20} />}
          >
            Get Started
          </Button>

          <TouchableOpacity style={styles.alreadyAccount}>
            <Text style={styles.alreadyText}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MobileContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  hologramContainer: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  hologramBase: {
    position: 'absolute',
    bottom: 40,
    width: 240,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringInner: {
    position: 'absolute',
    width: 180,
    height: 60,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(0, 242, 255, 0.4)',
  },
  ringOuter: {
    position: 'absolute',
    width: 220,
    height: 74,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 255, 0.2)',
    borderStyle: 'dashed',
  },
  figureWrapper: {
    width: 260,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(110, 61, 255, 0.05)',
    borderRadius: 32,
    overflow: 'hidden',
  },
  figure: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  scanBeam: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  beamInner: {
    height: 3,
    backgroundColor: '#00f2ff',
    shadowColor: '#00f2ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.05,
    borderWidth: 0.5,
    borderColor: '#00f2ff',
    // In a real app we'd use a pattern image here
  },
  sparksContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  spark: {
    position: 'absolute',
    width: 3,
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 2,
    opacity: 0.6,
  },
  textSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  brandText: {
    color: '#6e3dff',
  },
  description: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 40,
    gap: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  dotActive: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6e3dff',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#334155',
  },
  alreadyAccount: {
    alignItems: 'center',
    marginTop: 8,
  },
  alreadyText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    opacity: 0.8,
  }
});
