// src/api/storage.ts
import type { ITransaction } from '../types';

const STORAGE_KEY = 'financeTrackerTransactions';

/**
 * Loads transactions from localStorage.
 * Parses the JSON string into an array of ITransaction objects.
 * @returns {ITransaction[]} Array of transaction objects.
 */
export const loadTransactions = (): ITransaction[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    // Use 'as ITransaction[]' to assert the type of the parsed data
    return data ? JSON.parse(data) as ITransaction[] : [];
  } catch (error) {
    // Log the error but return an empty array to prevent app crash
    console.error("Error loading transactions:", error);
    return [];
  }
};

/**
 * Saves transactions to localStorage.
 * Converts the array of ITransaction objects into a JSON string.
 * @param {ITransaction[]} transactions - The array of transaction objects to save.
 */
export const saveTransactions = (transactions: ITransaction[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error("Error saving transactions:", error);
  }
};