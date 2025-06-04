import React from 'react';
import { router } from 'expo-router';

import { Button, Form, H2, Input, useTheme, View, XStack, YStack } from 'tamagui';

const SignUp = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.color2?.val, // ✅ inside style
      }}>
      <YStack gap={'$10'}>
        <XStack justifyContent="center">
          <H2>Sign Up</H2>
        </XStack>
        <XStack justifyContent="center">
          <Form gap={'$4'} minWidth={300}>
            <Input flex={1} minHeight={'$4'} placeholder="Email" />
            <Input flex={1} minHeight={'$4'} placeholder="Password" secureTextEntry />
            <Input flex={1} minHeight={'$4'} placeholder="Password" secureTextEntry />
            <Button size={'$4'}>Sign Up</Button>
            <Button size={'$4'} onPress={() => router.back()}>
              Go Back
            </Button>
          </Form>
        </XStack>
      </YStack>
    </View>
  );
};

export default SignUp;
