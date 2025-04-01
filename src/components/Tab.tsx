import React from 'react';

interface TabProps {
  id: string;
  label: string;
  active: boolean;
  onClick: (id: string) => void;
}

/**
 * Tab Component
 * 
 * A simple tab component for switching between different views
 */
const Tab: React.FC<TabProps> = ({ id, label, active, onClick }) => {
  return (
    <button 
      className={`px-4 py-2 text-sm font-medium transition-colors duration-150 ${
        active 
          ? 'border-b-2 border-blue-500 text-blue-600' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={() => onClick(id)}
    >
      {label}
    </button>
  );
};

export default Tab; 