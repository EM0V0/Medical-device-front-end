import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import TremorChart from '@/components/charts/TremorChart';
import StatCard from '@/components/StatCard';
import PatientRow, { Patient, PatientStatus } from '@/components/PatientRow';
import Tab from '@/components/Tab';

// Main Dashboard component
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('realtime');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>('PAT-4392'); // Default selection
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PatientStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Mock data for patients - in real app would come from API
  const allPatients: Patient[] = [
    { id: 'PAT-4392', name: 'Robert Chen', status: 'critical', lastReading: '14:05:32', isSelected: selectedPatientId === 'PAT-4392' },
    { id: 'PAT-2187', name: 'Maria Garcia', status: 'moderate', lastReading: '14:03:15', isSelected: selectedPatientId === 'PAT-2187' },
    { id: 'PAT-8843', name: 'James Wilson', status: 'critical', lastReading: '14:01:47', isSelected: selectedPatientId === 'PAT-8843' },
    { id: 'PAT-3321', name: 'Emily Johnson', status: 'stable', lastReading: '13:58:22', isSelected: selectedPatientId === 'PAT-3321' },
    { id: 'PAT-6574', name: 'David Park', status: 'moderate', lastReading: '13:55:50', isSelected: selectedPatientId === 'PAT-6574' },
    { id: 'PAT-7812', name: 'Anna Kim', status: 'stable', lastReading: '13:45:27', isSelected: selectedPatientId === 'PAT-7812' },
    { id: 'PAT-5531', name: 'Michael Brown', status: 'moderate', lastReading: '13:40:18', isSelected: selectedPatientId === 'PAT-5531' },
    { id: 'PAT-2290', name: 'Sarah Martinez', status: 'stable', lastReading: '13:35:40', isSelected: selectedPatientId === 'PAT-2290' },
    { id: 'PAT-1123', name: 'John Davis', status: 'critical', lastReading: '13:30:12', isSelected: selectedPatientId === 'PAT-1123' },
    { id: 'PAT-9945', name: 'Lisa Wang', status: 'stable', lastReading: '13:25:55', isSelected: selectedPatientId === 'PAT-9945' },
    { id: 'PAT-8823', name: 'Thomas Lee', status: 'moderate', lastReading: '13:20:31', isSelected: selectedPatientId === 'PAT-8823' },
    { id: 'PAT-6677', name: 'Rachel Green', status: 'stable', lastReading: '13:15:48', isSelected: selectedPatientId === 'PAT-6677' },
  ];
  
  // Apply filters and search to the patient list
  const filteredPatients = useMemo(() => {
    return allPatients
      .filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(patient => statusFilter === 'all' ? true : patient.status === statusFilter);
  }, [allPatients, searchTerm, statusFilter]);
  
  // Get current page items
  const currentPatients = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredPatients.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredPatients, currentPage]);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };
  
  // Handle status filter change
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as PatientStatus | 'all');
    setCurrentPage(1); // Reset to first page on new filter
  };
  
  // Handle pagination
  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Mock data for patient details
  const selectedPatient = allPatients.find(p => p.id === selectedPatientId) || allPatients[0];
  const patientDetails = {
    name: selectedPatient.name,
    age: 67,
    gender: 'Male',
    diagnosis: 'Parkinson\'s Disease (Stage 2)',
    medications: ['Levodopa 100mg (3x daily)', 'Pramipexole 0.5mg (2x daily)'],
    tremorScore: 8.2,
    tremorTrend: '+1.4',
    activityLevel: 'Medium',
    stepsToday: 2450,
    sleepQuality: '72%',
    sleepHours: 6.3,
  };

  // Handle view patient click
  const handleViewPatient = (id: string) => {
    setSelectedPatientId(id);
    // In a real app, this would also fetch detailed patient data from an API
  };
  
  useEffect(() => {
    // In real application, would set up data fetching or WebSocket here
    const timer = setInterval(() => {
      // Simulate data updates
      console.log('Updating real-time data...');
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800">Patient Monitoring Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back, {user?.name || 'Doctor'}. You have {allPatients.filter(p => p.status === 'critical').length} critical patients today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value={allPatients.length}
          trend="+2"
          statusText="this week"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          iconBgColor="bg-blue-100"
          iconColor="text-blue-500"
        />
        
        <StatCard
          title="Critical Alerts"
          value={allPatients.filter(p => p.status === 'critical').length}
          statusDot="bg-red-500"
          statusText="Needs attention"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
          iconBgColor="bg-red-100"
          iconColor="text-red-500"
        />
        
        <StatCard
          title="Average Tremor Score"
          value="3.4"
          trend="-0.8"
          statusText="from last week"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          iconBgColor="bg-orange-100"
          iconColor="text-orange-400"
        />
        
        <StatCard
          title="System Status"
          value="All Systems Operational"
          statusDot="bg-green-500"
          statusText="All systems normal"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
          iconBgColor="bg-green-100"
          iconColor="text-green-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tremor Chart */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2 md:mb-0">{patientDetails.name}'s Tremor Activity</h3>
              
              <div className="flex border-b">
                <Tab id="realtime" label="Real-time" active={activeTab === 'realtime'} onClick={setActiveTab} />
                <Tab id="hourly" label="Hourly" active={activeTab === 'hourly'} onClick={setActiveTab} />
                <Tab id="daily" label="Daily" active={activeTab === 'daily'} onClick={setActiveTab} />
                <Tab id="weekly" label="Weekly" active={activeTab === 'weekly'} onClick={setActiveTab} />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <TremorChart activeTab={activeTab} />
          </div>
          
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm font-medium text-gray-500">Current Tremor Score</span>
                <p className="text-lg font-semibold text-gray-800">{patientDetails.tremorScore}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Change</span>
                <p className="text-lg font-semibold text-red-500">{patientDetails.tremorTrend}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Activity Level</span>
                <p className="text-lg font-semibold text-gray-800">{patientDetails.activityLevel}</p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded transition-colors duration-150">
                View Details
              </button>
            </div>
          </div>
        </div>
        
        {/* Patient Details */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 p-4">Patient Details</h3>
          </div>
          
          <div className="p-6">
            <div className="flex items-start">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-xl flex-shrink-0">
                {patientDetails.name.charAt(0)}
              </div>
              
              <div className="ml-4">
                <h4 className="text-xl font-semibold text-gray-800">{patientDetails.name}</h4>
                <p className="text-gray-500">
                  {patientDetails.age} years old • {patientDetails.gender}
                </p>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Diagnosis</h5>
                    <p className="text-gray-800">{patientDetails.diagnosis}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Medications</h5>
                    <ul className="text-gray-800">
                      {patientDetails.medications.map((med, idx) => (
                        <li key={idx} className="text-sm">{med}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Activity Today</h5>
                    <p className="text-gray-800">{patientDetails.stepsToday} steps</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Sleep Data</h5>
                    <p className="text-gray-800">{patientDetails.sleepHours}hrs ({patientDetails.sleepQuality} quality)</p>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded transition-colors duration-150">
                    Call Patient
                  </button>
                  <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded transition-colors duration-150">
                    View Medical History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Patient List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-3 md:mb-0">Active Patients</h3>
            
            <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
              <input 
                type="text" 
                placeholder="Search patients..." 
                value={searchTerm}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
              />
              <select 
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
              >
                <option value="all">All Statuses</option>
                <option value="critical">Critical</option>
                <option value="moderate">Moderate</option>
                <option value="stable">Stable</option>
              </select>
            </div>
          </div>
        </div>
        
        {currentPatients.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {currentPatients.map(patient => (
              <PatientRow key={patient.id} patient={patient} onViewPatient={handleViewPatient} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">No patients found matching your criteria</p>
          </div>
        )}
        
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
          <span className="text-sm text-gray-500 text-center md:text-left">
            Showing {currentPatients.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredPatients.length)} of {filteredPatients.length} patients
          </span>
          
          {totalPages > 1 && (
            <div className="flex justify-center md:justify-end space-x-2">
              <button 
                className={`bg-white border border-gray-300 rounded-md p-2 text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {getPageNumbers().map(page => (
                <button 
                  key={page}
                  className={`rounded-md p-2 ${
                    currentPage === page 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50'
                  }`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}
              
              <button 
                className={`bg-white border border-gray-300 rounded-md p-2 text-gray-500 hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 