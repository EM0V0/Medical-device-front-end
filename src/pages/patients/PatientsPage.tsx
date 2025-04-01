import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PatientRow from '@/components/PatientRow';

// 模拟患者数据
const MOCK_PATIENTS = [
  {
    id: 'p1',
    name: 'Robert Chen',
    age: 65,
    condition: 'Parkinson\'s Disease',
    tremorScore: 8.2,
    lastReading: '2023-04-01T08:30:00',
    status: 'medium',
    trend: 'up',
    avatar: '/assets/avatars/patient1.jpg'
  },
  {
    id: 'p2',
    name: 'Emily Wilson',
    age: 72,
    condition: 'Essential Tremor',
    tremorScore: 6.5,
    lastReading: '2023-04-01T09:15:00',
    status: 'low',
    trend: 'stable',
    avatar: '/assets/avatars/patient2.jpg'
  },
  {
    id: 'p3',
    name: 'Michael Rodriguez',
    age: 58,
    condition: 'Parkinson\'s Disease',
    tremorScore: 9.1,
    lastReading: '2023-04-01T07:45:00',
    status: 'high',
    trend: 'up',
    avatar: '/assets/avatars/patient3.jpg'
  },
  {
    id: 'p4',
    name: 'Susan Baker',
    age: 63,
    condition: 'Multiple Sclerosis',
    tremorScore: 7.3,
    lastReading: '2023-04-01T08:00:00',
    status: 'medium',
    trend: 'down',
    avatar: '/assets/avatars/patient4.jpg'
  },
  {
    id: 'p5',
    name: 'David Kim',
    age: 68,
    condition: 'Essential Tremor',
    tremorScore: 5.8,
    lastReading: '2023-04-01T09:30:00',
    status: 'low',
    trend: 'stable',
    avatar: '/assets/avatars/patient5.jpg'
  },
];

/**
 * PatientsPage Component
 * 
 * A page for viewing and managing patients with role-based permissions
 */
const PatientsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  
  // Simulating data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle search & filtering
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Handle patient selection
  const togglePatientSelection = (patientId: string) => {
    setSelectedPatients(prev => 
      prev.includes(patientId) 
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };
  
  // Handle patient click - navigate to patient detail
  const handlePatientClick = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };
  
  // Handle adding a new patient
  const handleAddPatient = () => {
    navigate('/patients/new');
  };
  
  // Handle bulk actions based on selected patients
  const handleBulkAction = (action: string) => {
    if (selectedPatients.length === 0) return;
    
    switch(action) {
      case 'export':
        alert(`Exporting data for ${selectedPatients.length} patients`);
        break;
      case 'message':
        alert(`Sending message to ${selectedPatients.length} patients`);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedPatients.length} patients?`)) {
          setPatients(prev => prev.filter(p => !selectedPatients.includes(p.id)));
          setSelectedPatients([]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Page header with filters and actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="w-full md:w-72">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="search"
              className="block w-full pl-10 pr-3 py-2 rounded-lg border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="low">Normal</option>
            <option value="medium">Needs Attention</option>
            <option value="high">Critical</option>
          </select>
          
          {/* Only show these buttons for doctors and admins */}
          {user?.role !== 'family' && (
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('export')}
                disabled={selectedPatients.length === 0}
                className={`px-3 py-2 text-sm rounded-lg flex items-center space-x-1
                  ${selectedPatients.length > 0 
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                <span>Export</span>
              </button>
              
              <button
                onClick={() => handleBulkAction('message')}
                disabled={selectedPatients.length === 0}
                className={`px-3 py-2 text-sm rounded-lg flex items-center space-x-1
                  ${selectedPatients.length > 0 
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
                <span>Message</span>
              </button>
            </div>
          )}
          
          {/* Only show add button for admins */}
          {user?.role === 'admin' && (
            <button
              onClick={handleAddPatient}
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg flex items-center space-x-1 hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span>Add Patient</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Patients list */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredPatients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* Only show checkbox for doctors and admins */}
                  {user?.role !== 'family' && (
                    <th scope="col" className="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPatients(filteredPatients.map(p => p.id));
                          } else {
                            setSelectedPatients([]);
                          }
                        }}
                      />
                    </th>
                  )}
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Condition
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tremor Score
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr 
                    key={patient.id} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handlePatientClick(patient.id)}
                  >
                    {/* Only show checkbox for doctors and admins */}
                    {user?.role !== 'family' && (
                      <td className="px-4 py-3 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedPatients.includes(patient.id)}
                          onChange={() => togglePatientSelection(patient.id)}
                        />
                      </td>
                    )}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            {patient.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.age} years</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${patient.status === 'low' ? 'bg-green-100 text-green-800' : 
                          patient.status === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                        {patient.status === 'low' ? 'Normal' : 
                         patient.status === 'medium' ? 'Needs Attention' : 
                         'Critical'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {patient.condition}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">{patient.tremorScore}</span>
                        <span>
                          {patient.trend === 'up' ? (
                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                            </svg>
                          ) : patient.trend === 'down' ? (
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14"></path>
                            </svg>
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(patient.lastReading).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/patients/${patient.id}`);
                        }}
                      >
                        View
                      </button>
                      
                      {/* Only show edit for doctors and admins */}
                      {user?.role !== 'family' && (
                        <button
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/patients/${patient.id}/edit`);
                          }}
                        >
                          Edit
                        </button>
                      )}
                      
                      {/* Only show delete for admins */}
                      {user?.role === 'admin' && (
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm('Are you sure you want to delete this patient?')) {
                              setPatients(prev => prev.filter(p => p.id !== patient.id));
                            }
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">No patients found matching your filters.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
        
        {/* Pagination controls */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPatients.length}</span> of{' '}
                <span className="font-medium">{filteredPatients.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  1
                </button>
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsPage; 