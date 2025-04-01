import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import TremorChart from '@/components/charts/TremorChart';
import StatCard from '@/components/StatCard';
import PatientRow, { Patient } from '@/components/PatientRow';
import Tab from '@/components/Tab';

// Main Dashboard component
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('realtime');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>('PAT-4392'); // Default selection
  
  // Mock data for patients
  const patients: Patient[] = [
    { id: 'PAT-4392', name: 'Robert Chen', status: 'critical', lastReading: '14:05:32', isSelected: selectedPatientId === 'PAT-4392' },
    { id: 'PAT-2187', name: 'Maria Garcia', status: 'moderate', lastReading: '14:03:15', isSelected: selectedPatientId === 'PAT-2187' },
    { id: 'PAT-8843', name: 'James Wilson', status: 'critical', lastReading: '14:01:47', isSelected: selectedPatientId === 'PAT-8843' },
    { id: 'PAT-3321', name: 'Emily Johnson', status: 'stable', lastReading: '13:58:22', isSelected: selectedPatientId === 'PAT-3321' },
    { id: 'PAT-6574', name: 'David Park', status: 'moderate', lastReading: '13:55:50', isSelected: selectedPatientId === 'PAT-6574' },
  ];
  
  // Mock data for patient details
  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800">Patient Monitoring Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back, {user?.name || 'Doctor'}. You have {patients.filter(p => p.status === 'critical').length} critical patients today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value="24"
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
          value={patients.filter(p => p.status === 'critical').length}
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
          <div className="flex justify-between items-center p-4">
            <h3 className="text-lg font-medium text-gray-700">Active Patients</h3>
            
            <div className="flex items-center">
              <input 
                type="text" 
                placeholder="Search patients..." 
                className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="ml-2 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">All Statuses</option>
                <option value="critical">Critical</option>
                <option value="moderate">Moderate</option>
                <option value="stable">Stable</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {patients.map(patient => (
            <PatientRow key={patient.id} patient={patient} onViewPatient={handleViewPatient} />
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
          <span className="text-sm text-gray-500">Showing 5 of 24 patients</span>
          <div className="flex space-x-2">
            <button className="bg-white border border-gray-300 rounded-md p-2 text-gray-500 hover:bg-gray-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="bg-white border border-gray-300 rounded-md p-2 text-gray-800 hover:bg-gray-50">1</button>
            <button className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600">2</button>
            <button className="bg-white border border-gray-300 rounded-md p-2 text-gray-500 hover:bg-gray-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 