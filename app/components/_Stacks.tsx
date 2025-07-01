import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface StackProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const XStack: React.FC<StackProps> = ({ children, style, ...props }) => (
  <View style={[styles.row, style]} {...props}>
    {children}
  </View>
);

export const YStack: React.FC<StackProps> = ({ children, style, ...props }) => (
  <View style={[styles.column, style]} {...props}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
});
