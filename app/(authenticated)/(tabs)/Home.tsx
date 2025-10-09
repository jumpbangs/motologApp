import React from 'react';
import { ScrollView } from 'react-native';

import { useTheme } from '@rneui/themed';

import Dashboard from 'screens/Home/DashBoard';

const Home = () => {
  const { theme } = useTheme();

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}>
        <Dashboard />
      </ScrollView>
    </>
  );
};

export default Home;
