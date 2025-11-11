import React from 'react';
import type { ITransaction } from '../types';

interface TransactionListProps {
    transactions: ITransaction[];
    onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Transaction History</h3>
      
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 py-6 border rounded-lg bg-white">
          No transactions match the current filter.
        </p>
      ) : (
        <ul className="space-y-3">
          {transactions.map(t => (
            <li 
              key={t.id} 
              className={`flex justify-between items-center p-4 rounded-lg shadow-md border transition duration-150 ${
                t.type === 'Income' ? 'bg-green-50 border-green-200 hover:shadow-lg' : 'bg-red-50 border-red-200 hover:shadow-lg'
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-lg truncate">{t.category}</p>
                <p className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString()}</p>
                {t.notes && <p className="text-xs text-gray-600 italic truncate mt-1">Note: {t.notes}</p>}
              </div>
              
              <div className="text-right mx-4">
                <p className={`font-extrabold text-xl ${t.type === 'Income' ? 'text-green-700' : 'text-red-700'}`}>
                  {t.type === 'Income' ? '+' : '-'} ${t.amount.toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => onDeleteTransaction(t.id)}
                className="ml-4 text-red-500 hover:text-red-700 transition duration-150 p-2 rounded-full hover:bg-red-100"
                title="Delete Transaction"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clipRule="evenodd" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;