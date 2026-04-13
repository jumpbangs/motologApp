import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { Icon, Text, useTheme } from '@rneui/themed';

import { FuelEntry } from 'types/logsTypes';

interface DetailModalProps {
  modalVisible: boolean;
  modalHandler: () => void;
  modalDetails?: FuelEntry | null;
}

const DetailModal = ({ modalVisible, modalHandler, modalDetails }: DetailModalProps) => {
  const { theme } = useTheme();

  return (
    <>
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={modalHandler}
        transparent={true}>
        <TouchableWithoutFeedback onPress={modalHandler}>
          <View style={style.centredView}>
            <View style={{ ...style.modalView }}>
              <View style={{ ...style.modalTitleHeader }}>
                <Text h4>Log Details</Text>
                <TouchableOpacity
                  style={{ ...style.button, backgroundColor: theme.colors.primary }}
                  onPress={modalHandler}>
                  <Icon name="close" type="material" size={20} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'column', marginTop: 20, width: 300 }}>
                <Text>Date filled: {modalDetails?.date_filled}</Text>
                <Text>Discount used: {modalDetails?.discount_used}</Text>
                <Text>Fuel cost: {modalDetails?.fuel_cost}</Text>
                <Text>Rate : {modalDetails?.rate}</Text>
                <Text>Total liters : {modalDetails?.total_fuel_liters}</Text>
                <Text>Total KMs : {modalDetails?.total_kms_covered}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const style = StyleSheet.create({
  centredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    padding: 35,
    elevation: 5,
    shadowRadius: 4,
    borderRadius: 20,
    shadowOpacity: 0.25,
    alignItems: 'center',
    shadowColor: '#3c3220',
    flexDirection: 'column',
    backgroundColor: '#b3aea4',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalTitleHeader: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    elevation: 2,
    borderRadius: 30,
  },
});

export default DetailModal;
