import React from 'react';
import { View } from 'react-native';

import { Icon, Switch } from '@rneui/themed';

import { userStore } from 'store/userStore';

interface ThemeSwitcherProps {
  isDisabled?: boolean;
  isSaved?: boolean;
}

const ThemeSwitcher = ({ isDisabled = false }: ThemeSwitcherProps) => {
  const userTheme = userStore(state => state.userTheme);
  const setUserTheme = userStore(state => state.updateUserTheme);

  const themeMode = userTheme === 'light';

  const handleThemeToggle = () => {
    setUserTheme(themeMode ? 'dark' : 'light');
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon name="dark-mode" type="material" />
      <Switch
        value={themeMode}
        disabled={isDisabled}
        onValueChange={() => handleThemeToggle()}
        style={{ marginHorizontal: 8 }}
      />
      <Icon name="light-mode" type="material" />
    </View>
  );
};

export default ThemeSwitcher;
