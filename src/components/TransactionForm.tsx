import React, { useState } from 'react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../data/categories';
import type { ITransaction, TransactionType } from '../types';

interface TransactionFormProps {
    onAddTransaction: (transaction: ITransaction) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  
  const [formData, setFormData] = useState<{
    amount: string;
    date: string;
    category: string;
    type: TransactionType;
    notes: string;
  }>({
    amount: '',
    date: new Date().toISOString().substring(0, 10), // Default to today (YYYY-MM-DD)
    category: INCOME_CATEGORIES[0],
    type: 'Income',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as TransactionType;
    const newCategories = newType === 'Income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    
    setFormData(prev => ({
      ...prev,
      type: newType,
      category: newCategories[0], // Reset category when type changes
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }
    
    // Construct the new ITransaction object
    const newTransaction: ITransaction = {
      id: Date.now().toString(), 
      type: formData.type,
      amount: amount,
      date: formData.date,
      category: formData.category,
      notes: formData.notes,
    };

    onAddTransaction(newTransaction);
    
    // Reset form for next entry, preserving the last selected type
    const resetType = newTransaction.type;
    const resetCategories = resetType === 'Income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    setFormData({ 
      amount: '', 
      date: new Date().toISOString().substring(0, 10), 
      category: resetCategories[0], 
      type: resetType, 
      notes: '' 
    });
  };

  const categories = formData.type === 'Income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-xl rounded-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Record New Transaction</h3>
      
      {/* Type Selector (Income/Expense) */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Transaction Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleTypeChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
        >
          <option value="Income">Income 💰</option>
          <option value="Expense">Expense 💸</option>
        </select>
      </div>
      
      {/* Amount and Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Amount ($)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-1">Notes (Optional)</label>
        <input
          type="text"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Monthly payment"
        />
      </div>

      <button
        type="submit"
        className={`w-full text-white p-3 rounded-lg font-semibold transition duration-200 ${
          formData.type === 'Income' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        Add {formData.type}
      </button>
    </form>
  );
};

export default TransactionForm;