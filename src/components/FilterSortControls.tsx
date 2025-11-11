import React from 'react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../data/categories';
import type { IFilterState, TransactionType } from '../types';

interface FilterSortControlsProps {
    filter: IFilterState;
    setFilter: React.Dispatch<React.SetStateAction<IFilterState>>;
}

const allCategories = [
    'All', 
    ...INCOME_CATEGORIES, 
    ...EXPENSE_CATEGORIES
];

const FilterSortControls: React.FC<FilterSortControlsProps> = ({ filter, setFilter }) => {
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'type') {
        setFilter(prev => ({ ...prev, [name]: value as 'All' | TransactionType }));
    } else if (name === 'sort') {
        setFilter(prev => ({ ...prev, [name]: value as IFilterState['sort'] }));
    } 
    else {
        setFilter(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-inner mb-6 flex flex-wrap gap-4 border border-gray-200">
      <h3 className="text-lg font-semibold w-full text-gray-700 mb-2">Filter & Sort</h3>
      
      {/* Filter by Type */}
      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select 
          name="type" 
          value={filter.type} 
          onChange={handleFilterChange} 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="All">All Transactions</option>
          <option value="Income">Income Only</option>
          <option value="Expense">Expense Only</option>
        </select>
      </div>

      {/* Filter by Category */}
      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select 
          name="category" 
          value={filter.category} 
          onChange={handleFilterChange} 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        >
          {allCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Sort By */}
      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm font-medium text-gray-700">Sort By</label>
        <select 
          name="sort" 
          value={filter.sort} 
          onChange={handleFilterChange} 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="date-desc">Date (Newest)</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="amount-desc">Amount (Highest)</option>
          <option value="amount-asc">Amount (Lowest)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortControls;