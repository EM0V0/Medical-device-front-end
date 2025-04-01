import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// 模拟报告数据
const MOCK_REPORTS = [
  {
    id: 'r1',
    title: 'Weekly Tremor Analysis',
    date: '2023-04-01T10:30:00',
    patientId: 'p1',
    patientName: 'Robert Chen',
    type: 'tremor-analysis',
    status: 'completed',
    author: 'Dr. Sarah Johnson',
    size: '2.4 MB'
  },
  {
    id: 'r2',
    title: 'Monthly Medication Effectiveness',
    date: '2023-03-28T14:15:00',
    patientId: 'p1',
    patientName: 'Robert Chen',
    type: 'medication-analysis',
    status: 'completed',
    author: 'Dr. Sarah Johnson',
    size: '3.1 MB'
  },
  {
    id: 'r3',
    title: 'Quarterly Progress Report',
    date: '2023-03-15T09:45:00',
    patientId: 'p2',
    patientName: 'Emily Wilson',
    type: 'progress-report',
    status: 'completed',
    author: 'Dr. Michael Brown',
    size: '4.2 MB'
  },
  {
    id: 'r4',
    title: 'Daily Activity Log',
    date: '2023-04-01T08:00:00',
    patientId: 'p3',
    patientName: 'Michael Rodriguez',
    type: 'activity-log',
    status: 'processing',
    author: 'System',
    size: '-'
  },
  {
    id: 'r5',
    title: 'Treatment Recommendation',
    date: '2023-03-25T11:30:00',
    patientId: 'p4',
    patientName: 'Susan Baker',
    type: 'treatment-recommendation',
    status: 'completed',
    author: 'Dr. Sarah Johnson',
    size: '1.8 MB'
  },
];

// 报告类型选项
const REPORT_TYPES = [
  { id: 'tremor-analysis', name: 'Tremor Analysis' },
  { id: 'medication-analysis', name: 'Medication Effectiveness' },
  { id: 'progress-report', name: 'Progress Report' },
  { id: 'activity-log', name: 'Activity Log' },
  { id: 'treatment-recommendation', name: 'Treatment Recommendation' },
];

/**
 * ReportsPage Component
 * 
 * A page for managing patient reports with role-based permissions
 */
const ReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');
  
  // 模拟患者下拉菜单数据
  const patients = [
    { id: 'p1', name: 'Robert Chen' },
    { id: 'p2', name: 'Emily Wilson' },
    { id: 'p3', name: 'Michael Rodriguez' },
    { id: 'p4', name: 'Susan Baker' },
    { id: 'p5', name: 'David Kim' },
  ];
  
  // 模拟加载数据
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 过滤报告列表
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    
    // 如果是家属用户，只显示关联到该家属患者的报告
    if (user?.role === 'family') {
      // 在实际应用中，这里需要检查该报告是否与家属关联的患者有关
      // 这里我们假设家属只能看到Robert Chen的报告
      return matchesSearch && matchesType && report.patientId === 'p1';
    }
    
    return matchesSearch && matchesType;
  });
  
  // 处理报告查看
  const handleViewReport = (reportId: string) => {
    navigate(`/reports/${reportId}`);
  };
  
  // 处理报告下载
  const handleDownloadReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;
    
    if (report.status === 'processing') {
      alert('This report is still being processed. Please try again later.');
      return;
    }
    
    alert(`Downloading ${report.title}...`);
    // 在实际应用中，这里应该触发一个下载请求
  };
  
  // 处理报告删除
  const handleDeleteReport = (reportId: string) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(prev => prev.filter(r => r.id !== reportId));
    }
  };
  
  // 处理报告生成
  const handleGenerateReport = () => {
    if (!selectedReportType || !selectedPatientId) {
      alert('Please select both report type and patient');
      return;
    }
    
    setIsGeneratingReport(true);
    
    // 模拟报告生成过程
    setTimeout(() => {
      const reportType = REPORT_TYPES.find(t => t.id === selectedReportType);
      const patient = patients.find(p => p.id === selectedPatientId);
      
      if (reportType && patient) {
        const newReport = {
          id: `r${reports.length + 1}`,
          title: reportType.name,
          date: new Date().toISOString(),
          patientId: patient.id,
          patientName: patient.name,
          type: selectedReportType,
          status: 'processing',
          author: user?.name || 'System',
          size: '-'
        };
        
        setReports(prev => [newReport, ...prev]);
        
        // 模拟报告处理完成
        setTimeout(() => {
          setReports(prev => 
            prev.map(r => 
              r.id === newReport.id 
                ? { ...r, status: 'completed', size: '1.7 MB' } 
                : r
            )
          );
        }, 5000);
      }
      
      setIsGeneratingReport(false);
      setSelectedReportType('');
      setSelectedPatientId('');
    }, 1500);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* 页面标题和操作栏 */}
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
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            {REPORT_TYPES.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
          
          {/* 只对医生和管理员显示报告生成按钮 */}
          {(user?.role === 'doctor' || user?.role === 'admin') && (
            <button
              onClick={() => setIsGeneratingReport(true)}
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg flex items-center space-x-1 hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span>Generate Report</span>
            </button>
          )}
        </div>
      </div>
      
      {/* 生成报告对话框 */}
      {isGeneratingReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Generate New Report</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="report-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type
                </label>
                <select
                  id="report-type"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={selectedReportType}
                  onChange={(e) => setSelectedReportType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  {REPORT_TYPES.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="patient" className="block text-sm font-medium text-gray-700 mb-1">
                  Patient
                </label>
                <select
                  id="patient"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                >
                  <option value="">Select Patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsGeneratingReport(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateReport}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 报告列表 */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Title
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center">
                          <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{report.title}</div>
                          <div className="text-xs text-gray-500">By {report.author}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {report.patientName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {REPORT_TYPES.find(t => t.id === report.type)?.name || report.type}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.date).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {report.status === 'completed' ? 'Completed' : 'Processing'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {report.size}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        onClick={() => handleViewReport(report.id)}
                        disabled={report.status === 'processing'}
                      >
                        View
                      </button>
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        onClick={() => handleDownloadReport(report.id)}
                        disabled={report.status === 'processing'}
                      >
                        Download
                      </button>
                      
                      {/* 只对管理员显示删除按钮 */}
                      {user?.role === 'admin' && (
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteReport(report.id)}
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
            <p className="text-gray-500">No reports found matching your filters.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
              }}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
        
        {/* 分页控件 */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredReports.length}</span> of{' '}
                <span className="font-medium">{filteredReports.length}</span> results
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

export default ReportsPage; 