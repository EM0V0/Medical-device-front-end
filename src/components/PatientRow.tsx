import React from 'react';

export type PatientStatus = 'critical' | 'moderate' | 'stable';

export interface Patient {
  id: string;
  name: string;
  status: PatientStatus;
  lastReading: string;
  isSelected: boolean;
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
  const getStatusStyles = (status: PatientStatus) => {
    switch (status) {
      case 'critical':
        return {
          dot: 'bg-red-500',
          text: 'text-red-500',
          bgHover: 'hover:bg-red-50',
          label: 'Critical'
        };
      case 'moderate':
        return {
          dot: 'bg-orange-400',
          text: 'text-orange-400',
          bgHover: 'hover:bg-orange-50',
          label: 'Moderate'
        };
      case 'stable':
        return {
          dot: 'bg-green-500',
          text: 'text-green-500',
          bgHover: 'hover:bg-green-50',
          label: 'Stable'
        };
      default:
        return {
          dot: 'bg-gray-400',
          text: 'text-gray-400',
          bgHover: 'hover:bg-gray-50',
          label: 'Unknown'
        };
    }
  };
  
  const statusStyles = getStatusStyles(patient.status);
  
  return (
    <div 
      className={`p-4 transition-colors duration-150 ${patient.isSelected ? 'bg-blue-50' : 'bg-white'} ${statusStyles.bgHover} cursor-pointer`}
      onClick={() => onViewPatient(patient.id)}
    >
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex items-center mb-2 md:mb-0">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-semibold">
              {patient.name.charAt(0)}
            </div>
          </div>
          
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{patient.name}</p>
            <p className="text-xs text-gray-500">{patient.id}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className={`${statusStyles.dot} h-2.5 w-2.5 rounded-full mr-2`}></div>
            <span className={`${statusStyles.text} text-sm font-medium`}>{statusStyles.label}</span>
          </div>
          
          <div className="text-sm text-gray-500">
            Last reading: <span className="font-medium">{patient.lastReading}</span>
          </div>
          
          <div className="hidden md:flex">
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded transition-colors duration-150"
              onClick={(e) => {
                e.stopPropagation();
                onViewPatient(patient.id);
              }}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRow; 