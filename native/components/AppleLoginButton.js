import React from 'react';
import Button from './Button';
import { Text } from 'react-native';

const AppleLoginButton = ({ onApplePress, loading }) => {
  return (
    <Button 
      variant="glass" 
      onPress={onApplePress}
      loading={loading}
      icon={<Text style={{ fontSize: 24, color: '#fff', marginRight: 5 }}></Text>}
    >
      Continue with Apple
    </Button>
  );
};

export default AppleLoginButton;
