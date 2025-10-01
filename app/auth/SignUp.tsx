import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { FirebaseError } from '@firebase/util';
import { zodResolver } from '@hookform/resolvers/zod';

import { router, useFocusEffect } from 'expo-router';

import { Button, Icon, Input, Text } from '@rneui/themed';

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';

import { XStack, YStack } from 'components/_Stacks';
import { ToastError, ToastSuccess } from 'components/_Toast';
import { SignUpTypes } from 'types/authTypes';
import { getAuthErrorMessage, getUserDocRef } from 'utils/firebaseService';
import { SignUpSchema } from 'utils/schema';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState({ pass: false, repeat: false });

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
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        data.email,
        data.password
      );
      const user = userCredential.user;

      await setDoc(getUserDocRef(user.uid), {
        uid: user.uid,
        street: '',
        city: '',
        postCode: '',
      });

      ToastSuccess({ msg1: 'Account Created' });
      setLoading(false);
      router.back();
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof FirebaseError) {
        ToastError({ msg1: getAuthErrorMessage(error.code) });
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
                  secureTextEntry={!showPass.pass}
                  errorMessage={errors.password?.message}
                  rightIcon={
                    <Icon
                      name={showPass.pass ? 'visibility' : 'visibility-off'}
                      type="material"
                      onPress={() => setShowPass(prev => ({ ...prev, pass: !prev.pass }))}
                    />
                  }
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
                  secureTextEntry={!showPass.repeat}
                  errorMessage={errors.repeat_pass?.message}
                  rightIcon={
                    <Icon
                      name={showPass.repeat ? 'visibility' : 'visibility-off'}
                      type="material"
                      onPress={() => setShowPass(prev => ({ ...prev, repeat: !prev.repeat }))}
                    />
                  }
                />
              )}
              name="repeat_pass"
            />
            <Button size="md" onPress={handleSubmit(onSubmit)} loading={loading}>
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
