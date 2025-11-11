import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

import { ToastError } from 'components/_Toast';
import { FuelEntry } from 'types/logsTypes';
import { firebaseDb } from 'utils/firebaseService';
export const addNewLog = async (data: any) => {
  try {
    return await addDoc(collection(firebaseDb, 'fuelLog'), data);
  } catch (error) {
    return error;
  }
};

export const fetchUserLogs = async (userId: string) => {
  const fetchUserLogQuery = query(collection(firebaseDb, 'fuelLog'), where('userId', '==', userId));
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
