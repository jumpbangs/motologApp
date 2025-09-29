// theme.ts

import { createTheme } from '@rneui/themed';

import { gruvboxDark, gruvboxLight } from './colors';

export const getGruvboxTheme = (mode: 'light' | 'dark') =>
  createTheme({
    lightColors: {
      primary: gruvboxLight.primary,
      secondary: gruvboxLight.secondary,
      background: gruvboxLight.background,
      accent: gruvboxLight.accent,
      foreground: gruvboxLight.foreground,
      disabled: gruvboxLight.muted,
      error: gruvboxLight.destructive,
      inputAccent: gruvboxLight.input,
      border: gruvboxLight.border,
    },
    darkColors: {
      primary: gruvboxDark.primary,
      secondary: gruvboxDark.secondary,
      background: gruvboxDark.background,
      accent: gruvboxDark.accent,
      foreground: gruvboxDark.foreground,
      disabled: gruvboxDark.muted,
      error: gruvboxDark.destructive,
      inputAccent: gruvboxDark.input,
      border: gruvboxDark.border,
    },
    mode,

    components: {
      Text: (props, theme) => ({
        style: {
          color: theme.colors.foreground,
        },
      }),
      Input: (props, theme) => ({
        autoCapitalize: 'none',
        disabledInputStyle: {
          backgroundColor: theme.colors.disabled,
        },
        labelStyle: {
          color: theme.colors.foreground,
        },
        errorStyle: {
          color: theme.colors.error,
        },
        inputStyle: {
          color: theme.colors.foreground,
        },
        inputContainerStyle: {
          borderRadius: 4,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.inputAccent,
        },
      }),
    },
  });
