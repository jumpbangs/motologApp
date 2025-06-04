import React from 'react';
import { router } from 'expo-router';

import { Button, Form, H2, Input, Text, useTheme, View, XStack, YStack } from 'tamagui';
import { useToastController } from '@tamagui/toast';

import { useAuthStore } from 'store/authStore';

const LoginScreen = () => {
  const theme = useTheme();
  const toast = useToastController();

  const { login } = useAuthStore();

  const handleSubmit = () => {
    toast.show('Successfully Logged in!', {
      message: "Don't worry, we've got your data.",
    });

    login('XXX');
    router.replace('/Home');
  };

  const signUpHandler = () => {
    router.push('/auth/SignUp');
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      backgroundColor={theme.color2?.val}>
      <YStack gap={'$10'}>
        <XStack justifyContent="center">
          <H2>MotoLog App</H2>
        </XStack>
        <XStack justifyContent="center">
          <Form gap={'$4'} minWidth={300}>
            <Input flex={1} minHeight={'$4'} placeholder="Email" />
            <Input flex={1} minHeight={'$4'} placeholder="Password" secureTextEntry />
            <Button size={'$4'} onPress={handleSubmit}>
              Sign In
            </Button>
          </Form>
        </XStack>
        <XStack justifyContent="center" gap={'$8'}>
          <Text onPress={signUpHandler}>Sign Up</Text>
          <Text>Forget password</Text>
        </XStack>
      </YStack>
    </View>
  );
};

export default LoginScreen;
