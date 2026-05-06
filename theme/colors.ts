import { Platform } from 'react-native';

export const motologBrand = {
  honey: '#E8B255', // primary
  honeyHover: '#D9A03F', // primary pressed
  honeyInk: '#4A3A1A', // text on primary
  honeySoft: 'rgba(232, 178, 85, 0.14)',

  ember: '#E07A52', // secondary
  emberInk: '#3A1B10',

  success: '#4FB286',
  warning: '#E8B255',
  danger: '#D85A45',
  info: '#5B9DD9',
};

export const motologSpacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };
export const motologRadii = { sm: 8, md: 12, lg: 14, xl: 18, pill: 999 };

export const motologFonts = {
  ui: Platform.select({
    ios: 'SpaceGrotesk-Regular',
    android: 'SpaceGrotesk-Regular',
    default: 'System',
  }),
  uiBold: Platform.select({
    ios: 'SpaceGrotesk-Bold',
    android: 'SpaceGrotesk-Bold',
    default: 'System',
  }),
  mono: Platform.select({
    ios: 'Manrope-Regular',
    android: 'Manrope-Regular',
    default: 'Menlo',
  }),
};
