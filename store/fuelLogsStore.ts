/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import { FuelEntry } from 'types/logsTypes';

interface FuelLogState {
  logs: FuelEntry[];
  setLogs: (data: FuelEntry[]) => void;
  updateLog: (updated: FuelEntry) => void;
}

export const fuelLogs = create<FuelLogState>()(set => ({
  logs: [],
  setLogs: data => set({ logs: data }),
  updateLog: updated =>
    set(state => ({
      logs: state.logs.map(log => (log.id === updated.id ? updated : log)),
    })),
}));
