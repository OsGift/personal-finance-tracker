// src/hooks/useFinanceData.ts
import { useState, useEffect, useMemo } from 'react';
import { loadTransactions, saveTransactions } from '../api/storage';
import type { ITransaction, ISummary, IFilterState } from '../types';

// Initial state for filtering
const initialFilter: IFilterState = {
    type: 'All',
    category: 'All',
    sort: 'date-desc',
};

export const useFinanceData = () => {
  // Use ITransaction[] for the state type
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [filter, setFilter] = useState<IFilterState>(initialFilter);

  // 1. Data Loading (on component mount)
  useEffect(() => {
    const initialTransactions = loadTransactions();
    // Ensure all transactions loaded are sorted by date descending initially
    initialTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setTransactions(initialTransactions);
  }, []);

  // 2. CRUD Operations
  const addTransaction = (newTransaction: ITransaction) => {
    // Add new transaction to the start of the array
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  const deleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  // 3. Filtering & Sorting Logic (Memoized for performance)
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions;

    // A. Filtering by Type
    if (filter.type !== 'All') {
      filtered = filtered.filter(t => t.type === filter.type);
    }

    // B. Filtering by Category
    if (filter.category !== 'All') {
      filtered = filtered.filter(t => t.category === filter.category);
    }
    
    // C. Sorting
    const [sortBy, sortOrder] = filter.sort.split('-');
    
    // Create a copy before sorting to ensure original state is not mutated (though useMemo helps here)
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
      }
      if (sortBy === 'amount') {
        // Compare amounts
        return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
      }
      return 0; // No change
    });
    
    return sorted;
    
  }, [transactions, filter]);


  // 4. Summary Calculations (Memoized)
  const totalSummary = useMemo((): ISummary => {
    const income = transactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return { income, expense, balance: income - expense };
  }, [transactions]);


  return {
    transactions: filteredAndSortedTransactions, // Expose the processed list
    totalSummary,
    addTransaction,
    deleteTransaction,
    filter,
    setFilter,
  };
};