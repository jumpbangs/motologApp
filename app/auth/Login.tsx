import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { FirebaseError } from '@firebase/util';
import { zodResolver } from '@hookform/resolvers/zod';

import { router, useFocusEffect } from 'expo-router';

import { CheckBox, Icon, Input, Text } from '@rneui/themed';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { XStack, YStack } from 'components/_Stacks';
import { ToastError, ToastSuccess } from 'components/_Toast';
import LinearGradientBtn from 'components/LinearGradientBtn';
import { useAuthStore } from 'store/authStore';
import { SignInTypes } from 'types/authTypes';
import { firebaseAuth, getFirebaseErrorMessage } from 'utils/firebaseService';
import { FORGET_PASSWORD, HOME, SIGN_UP } from 'utils/router';
import { LoginInSchema } from 'utils/schema';

const checkIsValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const LoginScreen = () => {
  const { login, saveEmail, removeSavedEmail } = useAuthStore();
  const savedEmail = useAuthStore.getState()?.savedEmail;
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRemember] = useState(false);

  const {
    reset,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginInSchema),
  });

  React.useEffect(() => {
    if (savedEmail) {
      setValue('email', savedEmail);
      setRemember(true);
    }
  }, [savedEmail, setValue]);

  const onSubmit = async (data: SignInTypes) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(firebaseAuth, data.email, data.password);
      login(response);
      ToastSuccess({ msg1: 'Welcome back !!' });
      router.push(HOME);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        ToastError({ msg1: getFirebaseErrorMessage(error.code) });
      }
    }
    setLoading(false);
  };

  const signUpHandler = () => {
    router.push(SIGN_UP);
  };

  const forgetPassHandler = () => {
    router.push(FORGET_PASSWORD);
  };

  const handleRememberToggle = () => {
    const email = getValues().email;

    if (!rememberMe) {
      if (email && checkIsValidEmail(email)) {
        saveEmail(email);
      }
    } else {
      removeSavedEmail();
    }

    setRemember(!rememberMe);
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        reset();
      };
    }, [reset])
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <YStack style={{ gap: 10 }}>
        <YStack style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text h1>MotoLog</Text>
          <Text>Track your ride, fuel your journey</Text>
        </YStack>
        <XStack style={{ justifyContent: 'center', marginTop: 20 }}>
          <View style={{ gap: 4, width: 330 }}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ flex: 1, minHeight: 4 }}
                  inputContainerStyle={{ borderRadius: 8 }}
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
            <CheckBox checked={rememberMe} title="Remember me" onPress={handleRememberToggle} />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ flex: 1, minHeight: 4 }}
                  inputContainerStyle={{ borderRadius: 8 }}
                  rightIconContainerStyle={{ marginRight: 8 }}
                  secureTextEntry={!showPass}
                  label="Password"
                  placeholder="Enter your password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorMessage={errors.password?.message}
                  rightIcon={
                    <Icon
                      name={showPass ? 'eye-outline' : 'eye-off-outline'}
                      type="material-community"
                      onPress={() => setShowPass(!showPass)}
                    />
                  }
                />
              )}
              name="password"
            />
            <LinearGradientBtn
              btnTitle="Sign In"
              handleSubmit={handleSubmit(onSubmit)}
              loading={loading}
            />
          </View>
        </XStack>
        <XStack style={{ justifyContent: 'space-evenly', gap: 8 }}>
          <Text onPress={signUpHandler}>Sign Up</Text>
          <Text onPress={forgetPassHandler}>Forget password</Text>
        </XStack>
      </YStack>
    </View>
  );
};

export default LoginScreen;
