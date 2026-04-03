import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Animated, 
  Easing, 
  Dimensions, 
  Image, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import MobileContainer from '../components/MobileContainer';
import { 
  ArrowLeft, 
  Info, 
  Camera, 
  Weight, 
  Activity, 
  Accessibility, 
  Sparkles, 
  Scan, 
  Calendar, 
  BarChart2, 
  User 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function BodyScan({ navigation }) {
  // Animation Values
  const scanAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

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

    // Pulsing Heatmap Dots
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const scanTranslateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 360],
  });

  return (
    <MobileContainer style={{ backgroundColor: '#0a0518' }}>
      <Animated.View style={[styles.root, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <ArrowLeft color="#6e3dff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI Body Analysis</Text>
          <TouchableOpacity style={styles.headerBtn}>
            <Info color="#6e3dff" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          decelerationRate="normal"
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.mainTitle}>3D Body Scan</Text>
            <Text style={styles.mainSubtitle}>Full-body heatmap based on AI visual synthesis</Text>

            <View style={styles.scanContainer}>
              {/* Silhouette Placeholder */}
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBniWLhdwIz7nru9svkZEOkkrYQxGLUdsS8-ACEZnc-YNL7_4ZC1F1VbbqdBRRJiQH-CTYI-NlWxhIlxysclTipiBAnB1NfV-oMUuyJS67nFkE_WdKX7Tm4D1dGB1UOThRuYclCqnxCCNJuSTbO3eIExoVKRDfdhc7ZoanxTyVP20V-MEsWZDIyMulTnqk_-yzEbNTAsRNmI7_LU7fwo3FgYLZqa496vugksOk5KavyHM_HACxmNFT0NAHsT0UM9uoW02_akZm9KOO8' }} 
                style={styles.silhouette}
                resizeMode="contain"
              />

              {/* Scan Overlay */}
              <View style={styles.overlayGradient} />

              {/* Heatmap Dots */}
              <Animated.View style={[styles.dot, styles.dotCyan, { top: '25%', left: '33%', transform: [{ scale: pulseAnim }] }]} />
              <Animated.View style={[styles.dot, styles.dotPink, { top: '50%', right: '25%', transform: [{ scale: pulseAnim }] }]} />
              <Animated.View style={[styles.dot, styles.dotPurple, { bottom: '33%', left: '50%', transform: [{ scale: pulseAnim }] }]} />

              {/* Scan Beam */}
              <Animated.View style={[styles.scanBeam, { transform: [{ translateY: scanTranslateY }] }]}>
                <View style={styles.beamLine} />
              </Animated.View>

              {/* Floating Retake Button */}
              <TouchableOpacity style={styles.retakeBtn} activeOpacity={0.8}>
                <View style={styles.retakeBtnContent}>
                  <Camera color="#fff" size={24} />
                  <Text style={styles.retakeBtnText}>Retake Body Photo</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Metrics Grid */}
          <View style={styles.metricsGrid}>
            <View style={styles.glassCard}>
              <View style={styles.cardHeader}>
                <Weight color="#6e3dff" size={18} />
                <Text style={styles.cardLabel}>BODY FAT</Text>
              </View>
              <View style={styles.cardValueContainer}>
                <Text style={styles.cardValue}>18.4</Text>
                <Text style={styles.cardUnit}>%</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '65%', backgroundColor: '#6e3dff' }]} />
              </View>
            </View>

            <View style={styles.glassCard}>
              <View style={styles.cardHeader}>
                <Activity color="#00f2ff" size={18} />
                <Text style={styles.cardLabel}>MUSCLE MASS</Text>
              </View>
              <View style={styles.cardValueContainer}>
                <Text style={styles.cardValue}>64.2</Text>
                <Text style={styles.cardUnit}>kg</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '80%', backgroundColor: '#00f2ff' }]} />
              </View>
            </View>
          </View>

          {/* Posture Analysis */}
          <View style={[styles.glassCard, styles.fullWidthCard]}>
            <View style={styles.postureHeader}>
              <View style={styles.cardHeader}>
                <Accessibility color="#ff00e5" size={18} />
                <Text style={styles.cardLabel}>Posture Analysis</Text>
              </View>
              <View style={styles.actionBadge}>
                <Text style={styles.badgeText}>ACTION NEEDED</Text>
              </View>
            </View>
            <Text style={styles.postureDesc}>
              Mild anterior pelvic tilt detected. Recommended core stability exercises.
            </Text>
          </View>

          {/* FitMorph Insights */}
          <View style={styles.insightsSection}>
            <Text style={styles.sectionTitle}>FitMorph Insights</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.insightsScroll}
            >
              <View style={styles.insightCard}>
                <Text style={styles.insightText}>
                  "Your metabolic rate has increased by 4% since your last scan. Keep up the HIIT sessions."
                </Text>
              </View>
              <View style={styles.insightCard}>
                <Text style={styles.insightText}>
                  "Upper body symmetry has improved. Right deltoid activation is now balanced."
                </Text>
              </View>
            </ScrollView>
          </View>

          {/* Spacer for floating button */}
          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Floating CTA */}
        <View style={styles.floatingCtaContainer}>
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.9}>
            <Sparkles color="#fff" size={24} fill="#fff" />
            <Text style={styles.ctaText}>Generate Transformation Prediction</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Nav */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Scan color="#6e3dff" size={24} strokeWidth={3} />
            <Text style={[styles.navText, { color: '#6e3dff' }]}>SCAN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Calendar color="#a29abc" size={24} />
            <Text style={styles.navText}>PLAN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <BarChart2 color="#a29abc" size={24} />
            <Text style={styles.navText}>PROGRESS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <User color="#a29abc" size={24} />
            <Text style={styles.navText}>PROFILE</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </MobileContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(110, 61, 255, 0.1)',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(110, 61, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  heroSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 4,
  },
  mainSubtitle: {
    fontSize: 14,
    color: '#a6a1ba',
    marginBottom: 32,
    textAlign: 'center',
  },
  scanContainer: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: 'rgba(110, 61, 255, 0.05)',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(110, 61, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  silhouette: {
    width: '90%',
    height: '90%',
    opacity: 0.5,
  },
  overlayGradient: {
    ...StyleSheet.absoluteFillObject,
    // Note: RN doesn't support radial gradients natively without libs, 
    // but we can use a translucent View with opacity
    backgroundColor: 'rgba(20, 15, 35, 0.2)',
  },
  dot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  dotCyan: {
    backgroundColor: '#00f2ff',
    shadowColor: '#00f2ff',
  },
  dotPink: {
    backgroundColor: '#ff00e5',
    shadowColor: '#ff00e5',
  },
  dotPurple: {
    backgroundColor: '#6e3dff',
    shadowColor: '#6e3dff',
  },
  scanBeam: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  beamLine: {
    height: 2,
    backgroundColor: '#00f2ff',
    shadowColor: '#00f2ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
  },
  retakeBtn: {
    position: 'absolute',
    zIndex: 10,
    bottom: 24,
  },
  retakeBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(110, 61, 255, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  retakeBtnText: {
    color: '#fff',
    fontWeight: '800',
    marginLeft: 8,
  },
  metricsGrid: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 16,
  },
  glassCard: {
    flex: 1,
    backgroundColor: 'rgba(110, 61, 255, 0.05)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(110, 61, 255, 0.2)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#a6a1ba',
    letterSpacing: 1,
  },
  cardValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
  },
  cardUnit: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a6a1ba',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  fullWidthCard: {
    marginTop: 16,
  },
  postureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionBadge: {
    backgroundColor: 'rgba(255, 0, 229, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 99,
  },
  badgeText: {
    color: '#ff00e5',
    fontSize: 9,
    fontWeight: '900',
  },
  postureDesc: {
    fontSize: 14,
    color: '#a6a1ba',
    lineHeight: 20,
    opacity: 0.8,
  },
  insightsSection: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 16,
  },
  insightsScroll: {
    gap: 16,
    paddingRight: 24,
  },
  insightCard: {
    width: 280,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  insightText: {
    fontSize: 15,
    color: '#fff',
    fontStyle: 'italic',
    lineHeight: 24,
    fontWeight: '500',
  },
  floatingCtaContainer: {
    position: 'absolute',
    bottom: 96,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6e3dff',
    paddingVertical: 20,
    width: '100%',
    maxWidth: 360,
    borderRadius: 99,
    gap: 12,
    shadowColor: '#6e3dff',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 10,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 84,
    backgroundColor: '#1a1525',
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.03)',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4,
  },
  navText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#a29abc',
    marginTop: 6,
    letterSpacing: 1.5,
  }
});
