import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  statusDot?: string;
  statusText?: string;
}

/**
 * StatCard Component
 * 
 * A reusable card for displaying statistics with icons and trends
 */
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  icon,
  iconBgColor,
  iconColor,
  statusDot,
  statusText
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
        <div className={`${iconBgColor} rounded-full p-3`}>
          <div className={`w-6 h-6 ${iconColor}`}>{icon}</div>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500 flex items-center">
        {statusDot && (
          <span className={`inline-flex items-center justify-center h-3 w-3 rounded-full ${statusDot} mr-2`}></span>
        )}
        {trend ? (
          <>
            <span className={trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}>
              {trend}
            </span>{' '}
            {statusText}
          </>
        ) : (
          statusText
        )}
      </div>
    </div>
  );
};

export default StatCard; 