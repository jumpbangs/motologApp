import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import * as Linking from 'expo-linking';
import { router, useFocusEffect } from 'expo-router';

import { Button, Icon, Input, Text } from '@rneui/themed';

import { XStack, YStack } from 'components/_Stacks';
import { ToastError } from 'components/_Toast';
import { MAIN } from 'utils/router';
import { supabaseService } from 'utils/supabase';

const UpdatePassword = () => {
  const [showPass, setShowPass] = useState({ pass: false, confirm: false });
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPass: '',
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleDeepLink = async (url: string) => {
      const hash = url.split('#')[1];
      if (!hash) return;

      const hashParams = new URLSearchParams(hash);
      const access_token = hashParams.get('token');
      const type = hashParams.get('type');
      const email = hashParams.get('email');

      if (type === 'recovery' && access_token && email) {
        const { error } = await supabaseService.auth.verifyOtp({
          type: 'recovery',
          token: access_token,
          email: email,
        });

        if (error) {
          ToastError({ msg1: error.message });
        }
      }
    };

    // Handle app already open (warm start)
    const subscription = Linking.addEventListener('url', event => {
      handleDeepLink(event.url);
    });

    // Handle cold start
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleDeepLink(initialUrl);
      }
    })();

    return () => subscription.remove();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        reset();
      };
    }, [reset])
  );

  const onSubmit = async (data: any) => {
    setLoading(true);

    const { newPassword, confirmPass } = data;

    if (newPassword !== confirmPass) {
      ToastError({ msg1: 'Passwords do not match.' });
      setLoading(false);
      return;
    }

    const { error } = await supabaseService.auth.updateUser({ password: newPassword });

    setLoading(false);

    if (error) {
      ToastError({ msg1: error.message });
    } else {
      ToastError({ msg1: 'Password updated successfully!' });
      router.push(MAIN);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <YStack style={{ gap: 10 }}>
        <XStack style={{ justifyContent: 'center' }}>
          <Text h1>Update Password</Text>
        </XStack>
        <XStack style={{ justifyContent: 'center' }}>
          <View style={{ gap: 4, minWidth: 300 }}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ flex: 1, minHeight: 16 }}
                  placeholder="New Password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={!showPass.pass}
                  errorMessage={errors.newPassword?.message}
                  rightIcon={
                    <Icon
                      name={showPass.pass ? 'visibility' : 'visibility-off'}
                      type="material"
                      onPress={() => setShowPass(prev => ({ ...prev, pass: !prev.pass }))}
                    />
                  }
                />
              )}
              name="newPassword"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ flex: 1, minHeight: 16 }}
                  placeholder="Confirm Password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={!showPass.confirm}
                  errorMessage={errors.newPassword?.message}
                  rightIcon={
                    <Icon
                      name={showPass.confirm ? 'visibility' : 'visibility-off'}
                      type="material"
                      onPress={() => setShowPass(prev => ({ ...prev, confirm: !prev.confirm }))}
                    />
                  }
                />
              )}
              name="confirmPass"
            />
            <Button size="md" onPress={handleSubmit(onSubmit)} loading={loading}>
              Reset Password
            </Button>
          </View>
        </XStack>
      </YStack>
    </View>
  );
};

export default UpdatePassword;
