/* eslint-disable no-unused-vars */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

import { ToastError } from 'components/_Toast';
import { FuelEntry } from 'types/logsTypes';
import { firebaseDb } from 'utils/firebaseService';

const FUEL_LOG_DOCS = 'fuelLog';

export const addNewLog = async (data: any) => {
  try {
    return await addDoc(collection(firebaseDb, FUEL_LOG_DOCS), data);
  } catch (error) {
    return error;
  }
};

export const fetchUserLogs = async (userId: string) => {
  const fetchUserLogQuery = query(
    collection(firebaseDb, FUEL_LOG_DOCS),
    where('userId', '==', userId)
  );
  try {
    const querySnapshot = await getDocs(fetchUserLogQuery);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as FuelEntry[];
  } catch (error) {
    ToastError({ msg1: `Fetching user log error` + error });
    return [];
  }
};

export const subscribeToUserLogs = (userId: string, onLogsUpdate: (logs: FuelEntry[]) => void) => {
  const userLogQuery = query(collection(firebaseDb, FUEL_LOG_DOCS), where('userId', '==', userId));

  const unsubscribe = onSnapshot(
    userLogQuery,
    snapshot => {
      const fetchedLogs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as FuelEntry[];
      onLogsUpdate(fetchedLogs);
    },
    error => {
      ToastError({ msg1: `Fetching user log error: ${error}` });
    }
  );

  return unsubscribe;
};

export const deleteUserLog = async (logId: string) => {
  try {
    await deleteDoc(doc(firebaseDb, FUEL_LOG_DOCS, logId));
    return 'Deleted fuel log';
  } catch (error) {
    ToastError({ msg1: `Deleting user log error` + error });
    return [];
  }
};
