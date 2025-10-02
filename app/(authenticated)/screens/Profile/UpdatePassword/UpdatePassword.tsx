import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastError, ToastSuccess } from 'app/components/_Toast';

import { router } from 'expo-router';

import { Button, Icon, Input, Text, useTheme } from '@rneui/themed';

import { FirebaseError } from 'firebase/app';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';

import { YStack } from 'components/_Stacks';
import { userStore } from 'store/userStore';
import { getFirebaseErrorMessage } from 'utils/firebaseService';
import { ResetPasswordSchema } from 'utils/schema';

const UpdatePasswordScreen = () => {
  const theme = useTheme();
  const { user } = userStore();
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email || '',
      currentPass: '',
      newPassword: '',
    },
    resolver: zodResolver(ResetPasswordSchema),
  });

  const submitHandler = async (resetData: any) => {
    setLoading(true);
    const { email, currentPass, newPassword } = resetData;
    try {
      const currentUser = getAuth().currentUser;

      if (!currentUser || !currentUser.email) {
        throw new Error('No authenticated user found');
      }

      const userCred = await EmailAuthProvider.credential(email, currentPass);

      await reauthenticateWithCredential(currentUser, userCred);

      await updatePassword(currentUser, newPassword);

      ToastSuccess({ msg1: 'Password updated !!' });
      reset();
      router.back();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        ToastError({ msg1: getFirebaseErrorMessage(error.code) });
      }
    }

    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.theme.colors.background }}>
      <View
        style={{
          padding: 4,
          marginTop: 4,
        }}>
        <Text h2 style={{ padding: 6 }}>
          Update Password
        </Text>
        <YStack style={{ gap: 2, marginTop: 10 }}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                secureTextEntry={!showPassword}
                placeholder="Current Password"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors.currentPass?.message}
                rightIcon={
                  <Icon
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    type="material"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
            )}
            name="currentPass"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                secureTextEntry={!showPassword}
                placeholder="New Password"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors.newPassword?.message}
                rightIcon={
                  <Icon
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    type="material"
                    onPress={() => setShowPassword(!showPassword)}
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
                disabled={value.length > 1}
                placeholder="Email"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors.email?.message}
                rightIcon={<Icon name="email" type="material" />}
              />
            )}
            name="email"
          />
          <Button size="md" onPress={() => handleSubmit(submitHandler)()} loading={loading}>
            Update Password
          </Button>
        </YStack>
      </View>
    </View>
  );
};

export default UpdatePasswordScreen;
