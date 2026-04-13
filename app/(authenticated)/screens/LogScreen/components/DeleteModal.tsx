import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { Icon, Text, useTheme } from '@rneui/themed';

import { ToastSuccess } from 'components/_Toast';
import { deleteUserLog } from 'services/logServices';
import { FuelEntry } from 'types/logsTypes';

interface DetailModalProps {
  modalVisible: boolean;
  modalHandler: () => void;
  modalDetails?: FuelEntry | null;
}

const DeleteModal = ({ modalVisible, modalHandler, modalDetails = null }: DetailModalProps) => {
  const { theme } = useTheme();

  const deleteLogHandler = async () => {
    if (!modalDetails) return;
    await deleteUserLog(modalDetails.id);
    modalHandler();
    ToastSuccess({ msg1: 'Log deleted successfully' });
  };

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
                  style={{ ...style.button, backgroundColor: theme.colors.error }}
                  onPress={deleteLogHandler}>
                  <Icon name="delete" type="material" size={20} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'column', marginTop: 20, width: 300 }}>
                <Text>Do you wish to delete the following log ?</Text>
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

export default DeleteModal;
