import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-secondary-50">
      {/* Left panel with branding and illustration */}
      <div className="hidden md:flex md:w-5/12 lg:w-[700px] bg-primary-50 flex-col justify-between p-8">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-primary-700">NeuroSync</h1>
          <p className="text-lg text-primary-700 mt-2">Parkinson's Monitoring System</p>
        </div>
        
        <div className="flex-grow flex items-center justify-center">
          {/* Neural network illustration will be added here */}
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 bg-primary-100 rounded-full opacity-60"></div>
            <svg 
              className="absolute inset-0" 
              viewBox="0 0 400 400" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified neural network visualization */}
              <path 
                d="M 125 175 C 140 160, 160 155, 175 160 C 190 165, 205 160, 220 175 C 235 190, 230 210, 215 225 C 200 240, 205 260, 190 275 C 175 290, 155 285, 140 270 C 125 255, 115 240, 120 225 C 125 210, 110 190, 125 175 Z" 
                stroke="#3182CE" 
                strokeWidth="2" 
                fill="none" 
              />
              <path 
                d="M 165 190 L 190 210 L 165 230 L 140 210 Z" 
                stroke="#3182CE" 
                strokeWidth="2" 
                fill="none" 
              />
              
              {/* Connection nodes */}
              <circle cx="165" cy="190" r="8" fill="#3182CE" />
              <circle cx="190" cy="210" r="8" fill="#4299E1" />
              <circle cx="165" cy="230" r="8" fill="#63B3ED" />
              <circle cx="140" cy="210" r="8" fill="#4299E1" />
              
              {/* Smaller connection points */}
              <circle cx="150" cy="175" r="5" fill="#63B3ED" />
              <circle cx="200" cy="190" r="5" fill="#63B3ED" />
              <circle cx="205" cy="235" r="5" fill="#3182CE" />
              <circle cx="180" cy="250" r="5" fill="#4299E1" />
              <circle cx="140" cy="235" r="5" fill="#3182CE" />
              
              {/* Connecting lines */}
              <path d="M 150 175 L 165 190" stroke="#3182CE" strokeWidth="2" />
              <path d="M 200 190 L 190 210" stroke="#3182CE" strokeWidth="2" />
              <path d="M 205 235 L 190 210" stroke="#3182CE" strokeWidth="2" />
              <path d="M 180 250 L 165 230" stroke="#3182CE" strokeWidth="2" />
              <path d="M 140 235 L 140 210" stroke="#3182CE" strokeWidth="2" />
            </svg>
          </div>
        </div>
        
        <div className="text-center mb-16">
          <p className="text-primary-700 my-2">Advanced tremor monitoring and analysis</p>
          <p className="text-primary-700 my-2">Real-time data visualization and alerts</p>
          <p className="text-primary-700 my-2">Secure, HIPAA-compliant cloud storage</p>
        </div>
      </div>
      
      {/* Right panel with authentication form */}
      <div className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 