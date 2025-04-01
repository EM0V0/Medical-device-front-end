import React from 'react';

export type PatientStatus = 'critical' | 'moderate' | 'stable';

export interface Patient {
  id: string;
  name: string;
  status: PatientStatus;
  lastReading: string;
  isSelected?: boolean;
}

interface PatientRowProps {
  patient: Patient;
  onViewPatient: (id: string) => void;
}

/**
 * PatientRow Component
 * 
 * Displays a single patient record in a list format with status indicators
 */
const PatientRow: React.FC<PatientRowProps> = ({ patient, onViewPatient }) => {
  const getStatusColor = (status: PatientStatus): string => {
    switch (status) {
      case 'critical': return 'bg-red-500';
      case 'moderate': return 'bg-orange-400';
      case 'stable': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: PatientStatus): string => {
    switch (status) {
      case 'critical': return 'Critical';
      case 'moderate': return 'Moderate';
      case 'stable': return 'Stable';
      default: return 'Unknown';
    }
  };

  return (
    <div className={`flex items-center p-4 ${patient.isSelected ? 'bg-blue-50 border-2 border-blue-500 rounded-lg' : 'hover:bg-gray-50 border-b border-gray-200'}`}>
      <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
        <span className="text-gray-600 font-medium">{patient.name.charAt(0)}</span>
      </div>
      <div className="ml-4 flex-grow">
        <p className="text-gray-800 font-medium">{patient.name}</p>
        <p className="text-gray-500 text-sm">ID: {patient.id}</p>
      </div>
      <div className="flex-shrink-0 mr-6">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(patient.status)}`}>
          {getStatusText(patient.status)}
        </span>
      </div>
      <div className="w-24 text-gray-800 text-right">{patient.lastReading}</div>
      <div className="w-24 ml-6 text-right">
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded transition-colors duration-150"
          onClick={() => onViewPatient(patient.id)}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default PatientRow; 