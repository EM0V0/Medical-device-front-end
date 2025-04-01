import React from 'react';

interface TremorChartProps {
  activeTab: string;
  data?: {
    timestamps: string[];
    values: number[];
  };
  height?: number;
}

/**
 * TremorChart Component
 * 
 * A reusable chart component for displaying tremor data in different time intervals
 * In a production app, this would use a library like Chart.js or D3.js
 */
const TremorChart: React.FC<TremorChartProps> = ({ 
  activeTab, 
  data, 
  height = 320 
}) => {
  // Get time labels based on active tab
  const getTimeLabels = () => {
    switch (activeTab) {
      case 'realtime':
        return ['Now', '-10s', '-20s', '-30s', '-40s', '-50s', '-60s'];
      case 'hourly':
        return ['Now', '-1h', '-2h', '-3h', '-4h', '-5h', '-6h'];
      case 'daily':
        return ['Today', 'Yesterday', '-2d', '-3d', '-4d', '-5d', '-6d'];
      case 'weekly':
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      default:
        return ['Now', '-10s', '-20s', '-30s', '-40s', '-50s', '-60s'];
    }
  };

  // Sample path for chart line - in a real app, this would be generated from actual data points
  const getSamplePath = () => {
    switch (activeTab) {
      case 'realtime':
        return 'M0,80 C10,70 15,85 20,65 C25,45 30,60 40,50 C50,40 60,45 70,30 C80,15 90,25 100,20';
      case 'hourly':
        return 'M0,65 C15,55 25,75 35,45 C45,50 55,30 65,40 C75,25 85,20 100,25';
      case 'daily':
        return 'M0,50 C15,45 25,35 40,40 C55,25 65,45 75,30 C85,35 90,25 100,30';
      case 'weekly':
        return 'M0,40 C15,50 30,30 45,45 C60,35 75,25 85,35 C90,40 95,30 100,35';
      default:
        return 'M0,80 C10,70 15,85 20,65 C25,45 30,60 40,50 C50,40 60,45 70,30 C80,15 90,25 100,20';
    }
  };

  return (
    <div className="relative h-80" style={{ height: `${height}px` }}>
      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`vline-${i}`} className="border-r border-gray-200 h-full" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`hline-${i}`} className="border-b border-gray-200 w-full" />
        ))}
      </div>

      {/* Chart visualization */}
      <div className="absolute bottom-0 left-0 right-0 h-3/4 px-4">
        <div className="relative h-full w-full">
          <div className="absolute h-1/3 bottom-0 left-0 right-0 bg-gradient-to-t from-blue-100 to-transparent"></div>
          
          {/* Tremor line */}
          <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d={getSamplePath()}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
            />
          </svg>
          
          {/* Data points - in a real app, these would be positioned based on actual data */}
          <div className="absolute bottom-[65%] left-[20%] h-3 w-3 rounded-full bg-blue-500 shadow-md"></div>
          <div className="absolute bottom-[50%] left-[40%] h-3 w-3 rounded-full bg-blue-500 shadow-md"></div>
          <div className="absolute bottom-[30%] left-[70%] h-3 w-3 rounded-full bg-blue-500 shadow-md"></div>
          
          {/* Label for chart type */}
          <div className="absolute top-2 right-2">
            <span className="text-xs font-medium text-gray-500">{activeTab.toUpperCase()} DATA</span>
          </div>
        </div>
      </div>
      
      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-500">
        {getTimeLabels().map((label, index) => (
          <span key={`x-label-${index}`}>{label}</span>
        ))}
      </div>
      
      {/* Y-axis labels */}
      <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between py-4 text-xs text-gray-500">
        <span>10</span>
        <span>8</span>
        <span>6</span>
        <span>4</span>
        <span>2</span>
        <span>0</span>
      </div>
    </div>
  );
};

export default TremorChart; 