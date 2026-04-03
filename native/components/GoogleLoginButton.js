import React from 'react';
import Button from './Button';
import { Image } from 'react-native';

const GoogleLoginButton = ({ onGooglePress, loading }) => {
  return (
    <Button 
      variant="glass" 
      onPress={onGooglePress}
      loading={loading}
      icon={<Image source={require('../assets/google_logo.png')} style={{ width: 20, height: 20 }} />}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;
