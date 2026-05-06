// theme.ts

import { createTheme } from '@rneui/themed';

import { motologBrand, motologFonts, motologRadii, motologSpacing } from './colors';

export const getGruvboxTheme = (mode: 'light' | 'dark') =>
  createTheme({
    lightColors: {
      primary: motologBrand.honey,
      secondary: motologBrand.ember,
      success: motologBrand.success,
      warning: motologBrand.warning,
      error: motologBrand.danger,

      background: '#FBF7F0',
      white: '#FFFFFF',
      black: '#2A2520',

      grey0: '#FFFFFF',
      grey1: '#F4ECDD',
      grey2: '#E5DDD0',
      grey3: '#C9BEAB',
      grey4: '#9A9085',
      grey5: '#6B6258',
      greyOutline: '#E5DDD0',
      searchBg: '#F4ECDD',

      disabled: '#D4CCBE',
      divider: '#E5DDD0',
    },
    darkColors: {
      primary: motologBrand.honey,
      secondary: motologBrand.ember,
      success: motologBrand.success,
      warning: motologBrand.warning,
      error: motologBrand.danger,

      background: '#1F1B16',
      white: '#2A2520',
      black: '#F4ECDD',

      grey0: '#2A2520',
      grey1: '#332D25',
      grey2: '#3D362C',
      grey3: '#544A3D',
      grey4: '#857B6B',
      grey5: '#C7BBA6',
      greyOutline: '#3D362C',
      searchBg: '#332D25',

      disabled: '#544A3D',
      divider: '#3D362C',
    },
    mode,

    spacing: motologSpacing,
    // @ts-ignore
    radii: motologRadii,
    fonts: motologFonts,

    components: {
      Button: (props, theme) => ({
        buttonStyle: {
          height: 48,
          borderRadius: 14,
          paddingHorizontal: 20,
          backgroundColor:
            props.type === 'outline' || props.type === 'clear'
              ? 'transparent'
              : theme.colors.primary,
          borderColor: theme.colors.greyOutline,
          borderWidth: props.type === 'outline' ? 1 : 0,
        },
        titleStyle: {
          fontFamily: motologFonts.uiBold,
          fontWeight: '700',
          fontSize: 15,
          letterSpacing: -0.1,
          color:
            props.type === 'outline' || props.type === 'clear'
              ? theme.colors.black
              : motologBrand.honeyInk,
        },
        disabledStyle: { backgroundColor: theme.colors.disabled, opacity: 0.6 },
        disabledTitleStyle: { color: theme.colors.grey4 },
      }),

      Input: (props, theme) => ({
        inputContainerStyle: {
          borderWidth: 1,
          borderColor: theme.colors.greyOutline,
          borderRadius: 14,
          backgroundColor: theme.colors.grey0,
          paddingHorizontal: 14,
          height: 52,
        },
        inputStyle: {
          fontFamily: motologFonts.ui,
          fontSize: 15,
          fontWeight: '500',
          color: theme.colors.black,
        },
        labelStyle: {
          fontFamily: motologFonts.uiBold,
          fontSize: 12,
          fontWeight: '700',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          color: theme.colors.grey5,
          marginBottom: 6,
        },
        placeholderTextColor: theme.colors.grey4,
        errorStyle: { color: theme.colors.error, fontSize: 12, marginTop: 4 },
      }),

      Card: (props, theme) => ({
        containerStyle: {
          borderRadius: 18,
          borderWidth: 1,
          borderColor: theme.colors.divider,
          backgroundColor: theme.colors.grey0,
          padding: 18,
          margin: 0,
          shadowColor: '#000',
          shadowOpacity: theme.mode === 'dark' ? 0.4 : 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 2,
        },
        wrapperStyle: { padding: 0 },
      }),

      Text: (props, theme) => ({
        style: {
          fontFamily: motologFonts.ui,
          color: theme.colors.black,
          fontSize: 15,
        },
        h1Style: {
          fontFamily: motologFonts.uiBold,
          fontSize: 38,
          fontWeight: '800',
          letterSpacing: -1.2,
        },
        h2Style: {
          fontFamily: motologFonts.uiBold,
          fontSize: 30,
          fontWeight: '800',
          letterSpacing: -0.8,
        },
        h3Style: {
          fontFamily: motologFonts.uiBold,
          fontSize: 24,
          fontWeight: '700',
          letterSpacing: -0.5,
        },
        h4Style: {
          fontFamily: motologFonts.uiBold,
          fontSize: 20,
          fontWeight: '700',
          letterSpacing: -0.3,
        },
      }),

      Chip: (props, theme) => ({
        buttonStyle: {
          backgroundColor: motologBrand.honeySoft,
          borderRadius: 999,
          paddingHorizontal: 12,
          paddingVertical: 4,
          height: 28,
        },
        titleStyle: {
          fontFamily: motologFonts.uiBold,
          fontWeight: '700',
          fontSize: 12,
          color: theme.colors.primary,
        },
      }),

      ListItem: (props, theme) => ({
        containerStyle: {
          backgroundColor: theme.colors.grey0,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.divider,
          paddingVertical: 14,
          paddingHorizontal: 16,
        },
      }),

      Divider: (props, theme) => ({
        color: theme.colors.divider,
        width: 1,
      }),

      Switch: (props, theme) => ({
        trackColor: { false: theme.colors.grey3, true: theme.colors.primary },
        thumbColor: theme.mode === 'dark' ? theme.colors.grey0 : '#FFFFFF',
        ios_backgroundColor: theme.colors.grey3,
      }),

      CheckBox: (props, theme) => ({
        containerStyle: {
          backgroundColor: 'transparent',
          borderWidth: 0,
          padding: 0,
          marginLeft: 0,
          marginRight: 0,
        },
        textStyle: {
          fontFamily: motologFonts.ui,
          fontWeight: '600',
          fontSize: 14,
          color: theme.colors.grey5,
        },
        checkedColor: theme.colors.primary,
        uncheckedColor: theme.colors.grey3,
      }),

      Avatar: (props, theme) => ({
        containerStyle: { backgroundColor: theme.colors.primary },
        titleStyle: {
          fontFamily: motologFonts.uiBold,
          color: motologBrand.honeyInk,
          fontWeight: '800',
        },
      }),

      Badge: (props, theme) => ({
        badgeStyle: {
          backgroundColor: theme.colors.primary,
          borderWidth: 0,
          borderRadius: 999,
          height: 20,
          minWidth: 20,
        },
        textStyle: {
          fontFamily: motologFonts.uiBold,
          color: motologBrand.honeyInk,
          fontWeight: '700',
          fontSize: 11,
        },
      }),

      Tab: (props, theme) => ({
        indicatorStyle: { backgroundColor: theme.colors.primary, height: 3, borderRadius: 2 },
        titleStyle: active => ({
          fontFamily: motologFonts.uiBold,
          fontWeight: '600',
          fontSize: 14,
          color: active ? theme.colors.primary : theme.colors.grey5,
          textTransform: 'none',
        }),
      }),

      SearchBar: (props, theme) => ({
        containerStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          paddingHorizontal: 0,
        },
        inputContainerStyle: {
          backgroundColor: theme.colors.searchBg,
          borderRadius: 14,
          height: 44,
        },
        inputStyle: {
          fontFamily: motologFonts.ui,
          color: theme.colors.black,
          fontSize: 15,
        },
        placeholderTextColor: theme.colors.grey4,
      }),

      Header: (props, theme) => ({
        backgroundColor: theme.colors.background,
        containerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.divider,
          paddingHorizontal: 16,
        },
        centerComponent: {
          style: {
            fontFamily: motologFonts.uiBold,
            fontSize: 18,
            fontWeight: '700',
            color: theme.colors.black,
          },
        },
      }),

      Dialog: (props, theme) => ({
        overlayStyle: {
          backgroundColor: theme.colors.grey0,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: theme.colors.divider,
          padding: 20,
        },
      }),

      Overlay: (props, theme) => ({
        overlayStyle: {
          backgroundColor: theme.colors.grey0,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: theme.colors.divider,
        },
      }),

      Slider: (props, theme) => ({
        thumbTintColor: theme.colors.primary,
        minimumTrackTintColor: theme.colors.primary,
        maximumTrackTintColor: theme.colors.grey2,
      }),

      LinearProgress: (props, theme) => ({
        color: theme.colors.primary,
        trackColor: theme.colors.grey2,
        style: { borderRadius: 999, height: 6 },
      }),

      Skeleton: (props, theme) => ({
        style: { backgroundColor: theme.colors.grey1, borderRadius: 12 },
        skeletonStyle: { backgroundColor: theme.colors.grey2 },
      }),

      FAB: (props, theme) => ({
        color: theme.colors.primary,
        titleStyle: {
          fontFamily: motologFonts.uiBold,
          color: motologBrand.honeyInk,
          fontWeight: '700',
        },
      }),

      SpeedDial: (props, theme) => ({
        color: theme.colors.primary,
        titleStyle: {
          fontFamily: motologFonts.uiBold,
          color: motologBrand.honeyInk,
          fontWeight: '700',
        },
      }),
    },
  });
