import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StatusBar, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHeaderHeight } from '@react-navigation/elements';

import { router } from 'expo-router';

import { Button, CheckBox, Icon, Input, Text, useTheme } from '@rneui/themed';

import { FirebaseError } from 'firebase/app';

import { XStack, YStack } from 'components/_Stacks';
import { addNewLog } from 'services/logServices';
import { userStore } from 'store/userStore';
import { getTodayDate } from 'utils/date';
import { LogSchema } from 'utils/schema';

import { ToastError, ToastSuccess } from '@/app/components/_Toast';
import { getFirebaseErrorMessage } from '@/utils/firebaseService';

interface LogData {
  location?: string;
  brand?: string;
  rate: number;
  total_kms_covered: number;
  total_fuel_liters: number;
  discount_used: boolean;
}

const AddLogPage = () => {
  const theme = useTheme();
  const user = userStore.getState().user;
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const headerHeight = useHeaderHeight() + (StatusBar.currentHeight ?? 0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: '',
      brand: '',
      rate: '',
      total_kms_covered: '',
      total_fuel_liters: '',
      discount_used: false,
    },
    resolver: zodResolver(LogSchema),
  });

  const submitHandler = async (logData: LogData) => {
    if (!user) return;
    setIsSubmitting(true);
    const fuelCost = logData.rate * logData.total_fuel_liters;
    const newLogData = {
      ...logData,
      userId: user?.uid,
      fuel_cost: fuelCost,
      date_filled: getTodayDate(),
    };

    try {
      await addNewLog(newLogData);
      ToastSuccess({ msg1: `Added fuel log for ${getTodayDate()}` });
      router.back();
      setIsSubmitting(false);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        ToastError({ msg1: getFirebaseErrorMessage(error.code) });
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={'padding'}
        keyboardVerticalOffset={headerHeight}
        style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: theme.theme.colors.background }}>
          <View
            style={{
              padding: 4,
              marginTop: 4,
            }}>
            <Text h2 style={{ padding: 6 }}>
              Add New Log
            </Text>
            <YStack style={{ gap: 2, marginTop: 10 }}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Location"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorMessage={errors.location?.message}
                    leftIcon={<Icon name="location-pin" type="material" />}
                  />
                )}
                name="location"
              />

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Brand"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorMessage={errors.brand?.message}
                    leftIcon={<Icon name="store" type="material" />}
                  />
                )}
                name="brand"
              />

              <XStack style={{ gap: 4 }}>
                <View style={{ width: '50%' }}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Rate"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        keyboardType="decimal-pad"
                        placeholder="e.g. 10 or 10.5"
                        errorMessage={errors.rate?.message}
                        leftIcon={<Icon name="attach-money" type="material" />}
                      />
                    )}
                    name="rate"
                  />
                </View>

                <View style={{ width: '50%' }}>
                  <Controller
                    name="total_kms_covered"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Total KMs"
                        value={value}
                        onBlur={onBlur}
                        keyboardType="numeric"
                        onChangeText={onChange}
                        placeholder="e.g. 100 or 100.5"
                        errorMessage={errors.total_kms_covered?.message}
                        leftIcon={<Icon name="add-road" type="material" />}
                      />
                    )}
                  />
                </View>
              </XStack>

              <XStack>
                <View style={{ width: '65%' }}>
                  <Controller
                    name="total_fuel_liters"
                    control={control}
                    rules={{
                      required: 'Amount is required',
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: 'Enter a valid number (up to 2 decimal places)',
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        label="Fuel"
                        value={value}
                        keyboardType="numeric"
                        onChangeText={onChange}
                        placeholder="e.g. 10 or 10.5"
                        errorMessage={errors.total_fuel_liters?.message}
                        leftIcon={<Icon name="local-gas-station" type="material" />}
                      />
                    )}
                  />
                </View>

                <View style={{ width: '35%' }}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CheckBox
                        checked={value}
                        checkedIcon="savings"
                        uncheckedIcon="sell"
                        iconType="material"
                        onPress={() => onChange(!value)}
                        onBlur={onBlur}
                        title="Discount used ?"
                      />
                    )}
                    name="discount_used"
                  />
                </View>
              </XStack>
            </YStack>

            <Button size="md" onPress={() => handleSubmit(submitHandler)()} disabled={isSubmitting}>
              Save
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddLogPage;
