// components/FormInput.tsx
import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { View } from 'react-native';

import { Icon, Input } from '@rneui/themed';

import { XStack } from 'components/_Stacks';

interface FormInputProps {
  name: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  placeholder?: string;
  icon?: { name: string; type: string };
  disabled?: boolean;
}

const LeftIconInput: React.FC<FormInputProps> = ({
  name,
  control,
  errors,
  placeholder,
  icon,
  disabled = false,
}) => {
  return (
    <XStack style={{ alignItems: 'baseline', width: '100%' }}>
      {icon && <Icon name={icon.name} type={icon.type} />}
      <View style={{ flex: 1 }}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              disabled={disabled}
              placeholder={placeholder}
              errorMessage={
                typeof errors[name]?.message === 'string'
                  ? (errors[name]?.message as string)
                  : undefined
              }
            />
          )}
        />
      </View>
    </XStack>
  );
};

export default LeftIconInput;
