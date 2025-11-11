// transaction types
export type TransactionType = 'Income' | 'Expense';

// transaction record
export interface ITransaction {
  id: string; // Unique identifier (e.g., timestamp or UUID)
  type: TransactionType;
  amount: number;
  date: string; // ISO date string (YYYY-MM-DD)
  category: string;
  notes?: string; // Optional field
}

// for summary data
export interface ISummary {
    income: number;
    expense: number;
    balance: number;
}

// for the filter state
export interface IFilterState {
    type: 'All' | TransactionType;
    category: 'All' | string;
    sort: 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';
}