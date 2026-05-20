import { StyleSheet } from 'react-native';

import { useTheme } from '@rneui/themed';

// Convert to a function that accepts theme
export const useDashboardStyle = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      padding: 10,
      width: 'auto',
      height: 'auto',
      flexDirection: 'column',
      backgroundColor: theme.colors.background,
    },
    pickerContainer: {
      padding: 2,
      margin: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderStyle: 'solid',
      borderColor: theme.colors.grey3,
    },
    infoColContainer: {
      gap: 10,
      paddingHorizontal: 10,
      flexDirection: 'column',
    },
    infoRowContainer: {
      gap: 10,
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'space-between',
    },
    infoTileContainer: {
      flex: 1,
      padding: 10,
      width: 'auto',
      borderRadius: 12,
      backgroundColor: theme.colors.grey0,
    },
    infoTitleTitle: {
      fontSize: 24,
      textAlign: 'left',
      color: theme.colors.black,
    },
    infoTileData: {
      fontSize: 16,
      textAlign: 'left',
      color: theme.colors.black,
    },
    addBtn: {
      flex: 1,
      marginVertical: 20,
    },
    card: {
      flex: 1,
      padding: 14,
      width: 'auto',
      borderRadius: 16,
      marginVertical: 12,
      backgroundColor: theme.colors.background,
      shadowColor: theme.colors.grey5,
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,

      elevation: 14,
    },
    cardLabel: {
      fontSize: 12,
      marginBottom: 8,
      letterSpacing: 1,
      color: theme.colors.grey5,
      textTransform: 'uppercase',
    },
    cardRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardValue: {
      fontSize: 42,
      fontWeight: 'bold',
      color: theme.colors.black,
    },
    cardUnit: {
      fontSize: 18,
      color: theme.colors.black,
    },
    cardBadge: {
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 14,
      backgroundColor: theme.colors.greyOutline,
    },
    cardBadgeText: {
      fontSize: 14,
      color: theme.colors.primary,
    },
    cardChange: {
      fontSize: 14,
      marginBottom: 16,
      color: theme.colors.success,
    },

    filterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
    },
    filterTitle: {
      fontSize: 13,
      marginRight: 16,
      letterSpacing: 1,
      color: theme.colors.grey5,
    },
    filterBody: {
      padding: 12,
      borderRadius: 12,
      flexDirection: 'row',
      backgroundColor: theme.colors.grey1,
    },
  });
};
