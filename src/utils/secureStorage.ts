import * as Keychain from 'react-native-keychain';
import { Tokens } from '../features/auth/authTypes';

const TOKEN_SERVICE = 'com.yourapp.auth';

export const saveTokens = async (tokens: Tokens) => {
  const payload = JSON.stringify(tokens);
  await Keychain.setGenericPassword('token', payload, {
    service: TOKEN_SERVICE,
  });
};

export const getTokens = async (): Promise<Tokens | null> => {
  const creds = await Keychain.getGenericPassword({ service: TOKEN_SERVICE });
  if (!creds) return null;
  try {
    return JSON.parse(creds.password) as Tokens;
  } catch {
    return null;
  }
};

export const clearTokens = async () => {
  await Keychain.resetGenericPassword({ service: TOKEN_SERVICE });
};
