import React from 'react';
import { useFinanceData } from './hooks/useFinanceData';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import FilterSortControls from './components/FilterSortControls';
import type { ISummary } from './types';

interface FinancialSummaryProps {
    summary: ISummary;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ summary }) => (
    <div className="grid grid-cols-3 gap-4 text-center p-5 bg-white rounded-xl shadow-lg mb-8 border border-gray-100">
        <div>
            <p className="text-sm text-gray-500 font-medium">Total Income</p>
            <p className="text-3xl font-extrabold text-green-600 mt-1">${summary.income.toFixed(2)}</p>
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">Total Expense</p>
            <p className="text-3xl font-extrabold text-red-600 mt-1">${summary.expense.toFixed(2)}</p>
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">Net Balance</p>
            <p className={`text-3xl font-extrabold mt-1 ${summary.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                ${summary.balance.toFixed(2)}
            </p>
        </div>
    </div>
);


function App() {
  const { 
    transactions, 
    totalSummary, 
    addTransaction, 
    deleteTransaction,
    filter,
    setFilter,
  } = useFinanceData();

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-10 tracking-tight">
          Finance Tracker Dashboard
        </h1>
        
        {/* Summary */}
        <FinancialSummary summary={totalSummary} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
            {/* Input Form (Column 1) */}
            <div className="lg:col-span-1">
                <TransactionForm onAddTransaction={addTransaction} />
            </div>
          
            {/* Transactions View (Columns 2 & 3) */}
            <div className="lg:col-span-2">
                {/* Filter and Sort Controls */}
                <FilterSortControls filter={filter} setFilter={setFilter} />

                {/* Transaction List */}
                <TransactionList 
                    transactions={transactions} 
                    onDeleteTransaction={deleteTransaction} 
                />
            </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;