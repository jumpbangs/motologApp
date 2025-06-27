import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Text } from '@rneui/themed';
import { router, useFocusEffect } from 'expo-router';

import { XStack, YStack } from 'components/Stacks';
// import { createUser } from 'services/firebaseServices';
import { SignUpTypes } from 'types/AuthTypes';
import { SignUpSchema } from 'utils/schema';

const SignUp = () => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeat_pass: '',
    },
    resolver: zodResolver(SignUpSchema),
  });

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        reset();
      };
    }, [reset])
  );

  const onSubmit = async (data: SignUpTypes) => {
    console.log(data);
    // const lol = await createUser(data);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <YStack style={{ gap: 10 }}>
        <XStack style={{ justifyContent: 'center' }}>
          <Text h1>Sign Up</Text>
        </XStack>
        <XStack style={{ justifyContent: 'center' }}>
          <View style={{ gap: 4, minWidth: 300 }}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ flex: 1, minHeight: 16 }}
                  placeholder="Email"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
              name="email"
            />
            <Controller
              control={control}
              rules={{ required: 'Repeat password is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ flex: 1, minHeight: 16 }}
                  placeholder="Password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry
                  errorMessage={errors.password?.message}
                />
              )}
              name="password"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ flex: 1, minHeight: 16 }}
                  placeholder="Repeat password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry
                  errorMessage={errors.repeat_pass?.message}
                />
              )}
              name="repeat_pass"
            />
            <Button size="md" onPress={handleSubmit(onSubmit)}>
              Sign Up
            </Button>
            <Button size="md" onPress={() => router.back()}>
              Go Back
            </Button>
          </View>
        </XStack>
      </YStack>
    </View>
  );
};

export default SignUp;
