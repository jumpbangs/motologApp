import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { FirebaseError } from '@firebase/util';
import { zodResolver } from '@hookform/resolvers/zod';

import { router, useFocusEffect } from 'expo-router';

import { Button, CheckBox, Icon, Input, Text } from '@rneui/themed';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { XStack, YStack } from 'components/_Stacks';
import { ToastError, ToastSuccess } from 'components/_Toast';
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
      ToastSuccess({ msg1: 'Welcome back !!', pos: 'bottom' });
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
        <XStack style={{ justifyContent: 'center' }}>
          <Text h1>MotoLog App</Text>
        </XStack>
        <XStack style={{ justifyContent: 'center' }}>
          <View style={{ gap: 4, width: 300 }}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ flex: 1, minHeight: 4 }}
                  placeholder="Email"
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
                  secureTextEntry={!showPass}
                  placeholder="Password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorMessage={errors.password?.message}
                  rightIcon={
                    <Icon
                      name={showPass ? 'visibility' : 'visibility-off'}
                      type="material"
                      onPress={() => setShowPass(!showPass)}
                    />
                  }
                />
              )}
              name="password"
            />
            <Button size="md" onPress={handleSubmit(onSubmit)} loading={loading}>
              Sign In
            </Button>
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
