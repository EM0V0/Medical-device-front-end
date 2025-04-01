import React, { useState, useEffect } from 'react';

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
  // Animation state
  const [isAnimated, setIsAnimated] = useState(false);
  
  // Animate chart on tab change
  useEffect(() => {
    setIsAnimated(false);
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [activeTab]);
  
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

  // Generate mock data points for the chart
  const generateDataPoints = () => {
    // In SVG coordinate system, smaller y values represent higher positions
    // Keep y values in a range of 5-25 to ensure chart is visible
    const points = [];
    
    switch(activeTab) {
      case 'realtime':
        // Adjust y values to prevent excessive curve bending
        points.push({ x: 0, y: 15 });   // Now
        points.push({ x: 20, y: 10 });  // -10s
        points.push({ x: 40, y: 5 });   // -20s
        points.push({ x: 60, y: 20 });  // -40s
        points.push({ x: 80, y: 10 });  // -50s
        points.push({ x: 100, y: 15 }); // -60s
        break;
      case 'hourly':
        points.push({ x: 0, y: 12 });
        points.push({ x: 20, y: 8 });
        points.push({ x: 40, y: 15 });
        points.push({ x: 60, y: 5 });
        points.push({ x: 80, y: 12 });
        points.push({ x: 100, y: 10 });
        break;
      case 'daily':
      case 'weekly':
        points.push({ x: 0, y: 10 });
        points.push({ x: 20, y: 8 });
        points.push({ x: 40, y: 12 });
        points.push({ x: 60, y: 9 });
        points.push({ x: 80, y: 11 });
        points.push({ x: 100, y: 10 });
        break;
    }
    
    return points;
  };
  
  // Create bezier curve path with optimized control points
  const createBezierPath = (points: {x: number, y: number}[]) => {
    if (points.length === 0) return '';
    
    // Initial point
    let path = `M${points[0].x},${points[0].y}`;
    
    // Create smooth bezier curves for each pair of points
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      // Calculate distance between points
      const xDiff = next.x - current.x;
      const yDiff = next.y - current.y;
      
      // Control points: optimize for smoother curves with reduced curvature
      // Adjust control points based on distance and height difference
      const tensionFactor = 0.3; // Lower tension factor for smoother curves
      
      // First control point
      const cp1x = current.x + xDiff * tensionFactor;
      const cp1y = current.y + yDiff * tensionFactor * 0.5;
      
      // Second control point
      const cp2x = next.x - xDiff * tensionFactor;
      const cp2y = next.y - yDiff * tensionFactor * 0.5;
      
      // Add to path
      path += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
    }
    
    return path;
  };

  // Generate data points and convert to SVG coordinate system
  const dataPoints = generateDataPoints();
  
  // Create smooth bezier curve path
  const chartPath = createBezierPath(dataPoints);
  
  // Calculate area fill path (from curve to bottom), with reduced height
  const areaPath = `${chartPath} L${dataPoints[dataPoints.length-1].x},30 L${dataPoints[0].x},30 Z`;

  return (
    <div className="relative h-80" style={{ height: `${height}px` }}>
      {/* Chart container with gradients and styles */}
      <div className="absolute inset-0 bg-white rounded-md overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`vline-${i}`} className="border-r border-gray-200 h-full" />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`hline-${i}`} className="border-b border-gray-200 w-full" />
          ))}
        </div>

        {/* Chart visualization - Move chart position up */}
        <div className="absolute inset-0 px-4 pt-20 pb-20">
          <div className="relative h-full w-full">
            {/* Background gradient - More refined gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-blue-50 to-transparent opacity-60"></div>
            
            {/* Main chart SVG - Reduced viewBox height */}
            <svg 
              className={`absolute inset-0 transition-opacity duration-500 ${isAnimated ? 'opacity-100' : 'opacity-0'}`} 
              viewBox="0 0 100 30" 
              preserveAspectRatio="none"
            >
              {/* Line Area fill */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Area under the line */}
              <path
                d={areaPath}
                fill="url(#areaGradient)"
                opacity="0.5"
              />
              
              {/* The line itself - Thinner, more elegant line */}
              <path
                d={chartPath}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ 
                  strokeDasharray: 1000, 
                  strokeDashoffset: isAnimated ? 0 : 1000,
                  transition: 'stroke-dashoffset 1.5s ease-in-out'
                }}
              />
              
              {/* Add data point circles - Smaller, more refined dots */}
              {dataPoints.map((point, index) => (
                <circle
                  key={`svg-point-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r="1.2"
                  fill="white"
                  stroke="#3B82F6"
                  strokeWidth="0.8"
                  opacity={isAnimated ? 1 : 0}
                  style={{
                    transition: `opacity 0.5s ease-in-out ${index * 0.1}s`,
                  }}
                />
              ))}
            </svg>
            
            {/* Label for chart type */}
            <div className="absolute top-0 right-2">
              <span className="text-xs font-medium text-gray-500 bg-white bg-opacity-75 px-2 py-1 rounded">
                {activeTab.toUpperCase()} DATA
              </span>
            </div>
          </div>
        </div>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-500">
          {getTimeLabels().map((label, index) => (
            <span key={`x-label-${index}`} className="pb-1">{label}</span>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute top-4 left-2 bottom-6 flex flex-col justify-between text-xs text-gray-500">
          <span>10</span>
          <span>8</span>
          <span>6</span>
          <span>4</span>
          <span>2</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default TremorChart; 