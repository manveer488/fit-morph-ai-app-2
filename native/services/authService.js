import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import { Platform } from 'react-native';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '<YOUR_WEB_CLIENT_ID>', 
  offlineAccess: true,
});

/**
 * Handles Google Login
 */
export async function googleLogin() {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return handleAuthSuccess({
      type: 'google',
      email: userInfo.user.email,
      name: userInfo.user.name,
      profilePhoto: userInfo.user.photo,
      googleIdToken: userInfo.idToken,
      userId: userInfo.user.id,
    });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled Google sign-in');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Google sign-in is already in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play services not available');
    } else {
      console.error('Google Sign-In Error:', error);
      throw new Error('Unable to sign in with Google. Please try again.');
    }
  }
}

/**
 * Handles Apple Login (iOS only)
 */
export async function appleLogin() {
  if (Platform.OS !== 'ios') {
    throw new Error('Apple Sign-In is only available on iOS');
  }

  try {
    const appleResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Handle credentials
    const { email, fullName, user, identityToken } = appleResponse;

    return handleAuthSuccess({
      type: 'apple',
      email,
      fullName,
      userId: user,
      identityToken,
      authorizationCode,
    });
  } catch (error) {
    if (error.code === appleAuth.Error.CANCELED) {
      console.log('User cancelled Apple sign-in');
    } else {
      console.error('Apple Sign-In Error:', error);
      throw new Error('Unable to sign in with Apple. Please try again.');
    }
  }
}

/**
 * Process Auth Success
 */
export async function handleAuthSuccess(userData) {
  console.log('Auth Success:', userData);
  // Here we would typically save the user to global state or AsyncStorage
  return userData;
}

/**
 * Sign Out
 */
export async function signOut() {
  try {
    await GoogleSignin.signOut();
    // Apple doesn't have a direct signOut in this lib as it's handled by system
  } catch (error) {
    console.error('Sign-out error:', error);
  }
}
