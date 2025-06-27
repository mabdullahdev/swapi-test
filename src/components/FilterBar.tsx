import React from 'react';
import { FilterBarProps } from '../types/components';

interface FilterOption {
  value: string;
  label: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const statusOptions: FilterOption[] = [
    { value: '', label: 'All Status' },
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' },
  ];

  const genderOptions: FilterOption[] = [
    { value: '', label: 'All Genders' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'genderless', label: 'Genderless' },
    { value: 'unknown', label: 'Unknown' },
  ];

  const handleFilterChange = (filterType: string, value: string): void => {
    onFilterChange({
      ...filters,
      [filterType]: value,
    });
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== '');

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-0">
          <label
            htmlFor="status-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status-filter"
            value={filters.status || ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleFilterChange('status', e.target.value)
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-0">
          <label
            htmlFor="gender-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender
          </label>
          <select
            id="gender-filter"
            value={filters.gender || ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleFilterChange('gender', e.target.value)
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-0">
          <label
            htmlFor="species-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Species
          </label>
          <input
            id="species-filter"
            type="text"
            value={filters.species || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFilterChange('species', e.target.value)
            }
            placeholder="e.g., Human, Alien"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={onClearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
