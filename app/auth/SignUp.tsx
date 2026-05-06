import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { FirebaseError } from '@firebase/util';
import { zodResolver } from '@hookform/resolvers/zod';

import { router, useFocusEffect } from 'expo-router';

import { Icon, Input, Text } from '@rneui/themed';

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';

import { XStack, YStack } from 'components/_Stacks';
import { ToastError, ToastSuccess } from 'components/_Toast';
import LinearGradientBtn from 'components/LinearGradientBtn';
import { SignUpTypes } from 'types/authTypes';
import { getFirebaseErrorMessage, userDocRef } from 'utils/firebaseService';
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

      await setDoc(userDocRef(user.uid), {
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
        ToastError({ msg1: getFirebaseErrorMessage(error.code) });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
          <View style={{ gap: 4, minWidth: 330 }}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ flex: 1, minHeight: 16 }}
                  label="Email"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  label="Password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={!showPass.pass}
                  errorMessage={errors.password?.message}
                  rightIcon={
                    <Icon
                      name={showPass.pass ? 'eye-outline' : 'eye-off-outline'}
                      type="material-community"
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
                  label="Repeat Password"
                  placeholder="Repeat your password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={!showPass.repeat}
                  errorMessage={errors.repeat_pass?.message}
                  rightIcon={
                    <Icon
                      name={showPass.repeat ? 'eye-outline' : 'eye-off-outline'}
                      type="material-community"
                      onPress={() => setShowPass(prev => ({ ...prev, repeat: !prev.repeat }))}
                    />
                  }
                />
              )}
              name="repeat_pass"
            />
            <View style={{ gap: 12 }}>
              <LinearGradientBtn
                btnTitle="Sign Up"
                handleSubmit={handleSubmit(onSubmit)}
                loading={loading}
              />
              <LinearGradientBtn btnTitle="Go Back" handleSubmit={() => router.back()} />
            </View>
          </View>
        </XStack>
      </YStack>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
