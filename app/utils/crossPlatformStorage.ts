// utils/crossPlatformStorage.ts
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Wrap AsyncStorage to match the expected sync API from Zustand
export const zustandStorage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return Promise.resolve(localStorage.getItem(key));
    }
    return AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return Promise.resolve();
    }
    return AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return Promise.resolve();
    }
    return AsyncStorage.removeItem(key);
  },
  getAllKeys: async (): Promise<string[]> => {
    if (Platform.OS === 'web') {
      return Promise.resolve(Object.keys(localStorage));
    }
    const keys = await AsyncStorage.getAllKeys();
    return [...keys];
  },
  clear: async (): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.clear();
      return Promise.resolve();
    }
    return AsyncStorage.clear();
  },
};
