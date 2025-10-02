import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { router } from 'expo-router';

import { Button, Text, useTheme } from '@rneui/themed';

import { FirebaseError } from 'firebase/app';
import { updateProfile } from 'firebase/auth';
import { getDoc, updateDoc } from 'firebase/firestore';

import { XStack, YStack } from 'components/_Stacks';
import { ToastError, ToastInfo, ToastSuccess } from 'components/_Toast';
import LeftIconInput from 'components/LeftIconInput';
import ThemeSwitcher from 'components/ThemeSwitcher';
import { userStore } from 'store/userStore';
import { profileStyle } from 'styles/profileStyles';
import { firebaseAuth, getFirebaseErrorMessage, userDocRef } from 'utils/firebaseService';
import { UpdateUserSchema } from 'utils/schema';

const UserDetailsScreen = () => {
  const theme = useTheme();
  const { user, updateUser } = userStore();

  const fullName = user?.displayName ?? '';
  const userMetaData = user?.metadata;
  const street = userMetaData?.street ?? '';
  const city = userMetaData?.city ?? '';
  const postCode = userMetaData?.postCode ?? '';
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      fullName: fullName,
      street: street,
      city: city,
      postCode: postCode,
    },
    resolver: zodResolver(UpdateUserSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user?.displayName ?? '',
        street: userMetaData?.street ?? '',
        city: userMetaData?.city ?? '',
        postCode: userMetaData?.postCode ?? '',
      });
    }
  }, [user, reset]);

  const onBackHandler = () => {
    if (isDirty) {
      ToastInfo({ msg1: 'Changes will not be saved' });
    }
    reset();
    router.back();
  };

  const onHandleSubmit = async (userData: any) => {
    const { fullName, street, city, postCode } = userData;
    const docData = { city, street, postCode };

    const currentUser = firebaseAuth.currentUser;

    if (!currentUser) return;

    const userRef = userDocRef(currentUser.uid);

    try {
      // 1. Update display name if it changed
      if (currentUser.displayName !== fullName) {
        await updateProfile(currentUser, { displayName: fullName });
      }

      // 2. Update Firestore document
      await updateDoc(userRef, docData);

      // 3. Fetch the updated Firestore document
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const updatedUserData = {
          ...currentUser,
          metadata: docSnap.data(),
        };

        // 4. Update local user state
        updateUser(updatedUserData);
        ToastSuccess({ msg1: 'Updated user details' });
        router.back();
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        ToastError({ msg1: getFirebaseErrorMessage(error.code) });
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.theme.colors.background }}>
      <View style={profileStyle.section}>
        <YStack style={{ gap: 10 }}>
          <Text h2>User Details</Text>
          <YStack style={{ gap: 2, marginTop: 10 }}>
            <LeftIconInput
              name="fullName"
              control={control}
              errors={errors}
              placeholder="Full Name"
              icon={{ name: 'person', type: 'material' }}
            />

            <LeftIconInput
              name="street"
              control={control}
              errors={errors}
              placeholder="street"
              icon={{ name: 'route', type: 'material' }}
            />

            <LeftIconInput
              name="city"
              control={control}
              errors={errors}
              placeholder="city"
              icon={{ name: 'apartment', type: 'material' }}
            />

            <LeftIconInput
              name="postCode"
              control={control}
              errors={errors}
              placeholder="post code"
              icon={{ name: 'location-pin', type: 'material' }}
            />

            <XStack
              style={{ justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 20 }}>
              <Text h4>UI Theme</Text>
              <ThemeSwitcher />
            </XStack>
          </YStack>
        </YStack>
      </View>
      <YStack style={{ gap: 12 }}>
        <Button
          onPress={() => {
            handleSubmit(onHandleSubmit)();
          }}>
          Save
        </Button>
        <Button onPress={() => onBackHandler()}>Back</Button>
      </YStack>
    </View>
  );
};

export default UserDetailsScreen;
