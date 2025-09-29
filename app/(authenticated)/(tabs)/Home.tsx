import React, { useEffect } from 'react';
import { View } from 'react-native';

import { Text, useTheme } from '@rneui/themed';

import { userStore } from 'store/userStore';
import { supabaseService } from 'utils/supabase';

const Home = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabaseService.auth.getUser();

      if (user) {
        userStore.getState().setUser(user);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
      </View>
    </>
  );
};

export default Home;
