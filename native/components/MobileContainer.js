import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, ImageBackground } from 'react-native';

const MobileContainer = ({ children, style, dark = true }) => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} transparent backgroundColor="transparent" />
      <ImageBackground 
        source={require('../assets/bg_pattern.png')} // We'll need to add this or use a color
        style={styles.background}
        imageStyle={{ opacity: 0.05 }}
      >
        <SafeAreaView style={[styles.container, style]}>
          {children}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#140f23', // background-dark
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default MobileContainer;
