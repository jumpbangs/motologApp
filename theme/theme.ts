// theme.ts

import { createTheme } from '@rneui/themed';

import { gruvboxDark, gruvboxLight } from './colors';

const MANROPE_REG = 'Manrope-Regular';
const MANROPE_MED = 'Manrope-Medium';
const SPACE_MEDIUM = 'SpaceGrotesk-Medium';

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
          fontFamily: MANROPE_REG,
        },
        h1Style: {
          fontSize: 40,
          fontFamily: SPACE_MEDIUM,
        },
        h2Style: {
          fontFamily: SPACE_MEDIUM,
        },
        h3Style: {
          fontFamily: SPACE_MEDIUM,
        },
        h4Style: {
          fontFamily: SPACE_MEDIUM,
        },
      }),
      Button: () => ({
        titleStyle: {
          fontFamily: 'Manrope-Medium',
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
          fontFamily: MANROPE_MED,
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
