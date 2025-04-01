import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Role type definition
type Role = 'doctor' | 'admin' | 'family';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('doctor');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeInput, setActiveInput] = useState<string | null>(null);
  
  // Animation state
  const [isReady, setIsReady] = useState(false);
  
  // Set animation ready state after component mount
  useEffect(() => {
    setTimeout(() => setIsReady(true), 100);
    
    // Force HTML document language to English
    document.documentElement.lang = 'en';
    
    // Override browser validation message
    const forms = document.getElementsByTagName('form');
    for (let i = 0; i < forms.length; i++) {
      forms[i].setAttribute('novalidate', 'novalidate');
    }
  }, []);
  
  // Handle form submission with custom validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');
    
    // Validate form fields
    let isValid = true;
    
    if (!email.trim()) {
      setEmailError('Please enter your email address');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
    
    if (!password.trim()) {
      setPasswordError('Please enter your password');
      isValid = false;
    }
    
    if (!isValid) return;
    
    setIsLoading(true);
    
    try {
      // Call authentication service
      await login({
        email,
        password,
        role: selectedRole
      });
      
      // Navigate to dashboard on success
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle input change with error clearing
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
  };
  
  // Brain Network Illustration with animation
  const BrainNetworkIllustration = () => {
    return (
      <div className="w-full max-w-md mx-auto mb-8 relative">
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-12 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-indigo-200 rounded-full opacity-20"></div>
        
        <svg
          width="100%"
          height="320"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
          className={`mx-auto transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundColor: '#F8FBFF' }}
        >
          {/* Background gradient */}
          <defs>
            <radialGradient id="bgGradient" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#E3ECFF"/>
              <stop offset="100%" stopColor="#F8FBFF"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bgGradient)" />

          {/* Brain outline shape */}
          <path
            d="M150,200 
               C130,120 280,80 310,180
               C330,250 450,220 400,300
               C370,340 280,360 230,370
               C190,370 160,340 150,300
               C140,260 180,280 150,200
               Z"
            fill="#D9E7FF"
            opacity="0.6"
            stroke="#3E7CE5"
            strokeWidth="2"
          />

          {/* Neural network connections */}
          <line x1="200" y1="220" x2="260" y2="180" stroke="#4D7AE8" strokeWidth="2" />
          <line x1="260" y1="180" x2="320" y2="240" stroke="#4D7AE8" strokeWidth="2" />
          <line x1="320" y1="240" x2="280" y2="300" stroke="#4D7AE8" strokeWidth="2" />
          <line x1="280" y1="300" x2="200" y2="220" stroke="#4D7AE8" strokeWidth="2" />
          <line x1="200" y1="220" x2="240" y2="280" stroke="#4D7AE8" strokeWidth="2" />
          <line x1="260" y1="180" x2="280" y2="300" stroke="#4D7AE8" strokeWidth="2" />
          
          {/* Neural nodes without animation */}
          <circle cx="200" cy="220" r="8" fill="#3E7CE5" />
          <circle cx="260" cy="180" r="6" fill="#6A9CFE" />
          <circle cx="320" cy="240" r="8" fill="#3E7CE5" />
          <circle cx="280" cy="300" r="8" fill="#3E7CE5" />
          <circle cx="240" cy="280" r="5" fill="#6A9CFE" />
          
          {/* Additional decorative nodes */}
          <circle cx="180" cy="270" r="5" fill="#9CBCFF" opacity="0.8" />
          <circle cx="340" cy="270" r="5" fill="#9CBCFF" opacity="0.8" />
          <circle cx="230" cy="160" r="5" fill="#9CBCFF" opacity="0.8" />
        </svg>
      </div>
    );
  };
  
  // Feature card with icon
  const FeatureCard = ({ icon, text }: { icon: string, text: string }) => (
    <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-sm border border-blue-100 transition-all duration-300 hover:shadow-md hover:border-blue-200">
      <div className="flex items-center">
        <div className="mr-3 text-blue-600">
          {icon === 'chart' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          )}
          {icon === 'notification' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          )}
          {icon === 'lock' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <p className="text-blue-800 font-medium flex-1">{text}</p>
      </div>
    </div>
  );
  
  // Role selection button component
  const RoleButton = ({ role, label }: { role: Role, label: string }) => (
    <button
      type="button"
      onClick={() => setSelectedRole(role)}
      className={`flex-1 py-2 px-3 rounded-full text-center transition-all duration-200 ${
        selectedRole === role
          ? 'bg-blue-500 text-white shadow-md transform scale-105'
          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Left side - Branding and Illustration */}
      <div className={`hidden lg:flex lg:w-1/2 flex-col items-center justify-center px-8 py-8 transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md flex flex-col items-center mt-[-50px]">
          <div className="mb-6 transition-all duration-500 transform hover:scale-105">
            <h1 className="text-4xl font-bold text-blue-800 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600">NeuroSync</h1>
            <h2 className="text-xl text-blue-600 text-center mt-2">Parkinson's Monitoring System</h2>
          </div>
          
          {/* Brain Network Illustration */}
          <BrainNetworkIllustration />
          
          {/* Marketing points with icons */}
          <div className="w-full space-y-3 mt-2">
            <FeatureCard 
              icon="chart" 
              text="Advanced tremor monitoring and analysis" 
            />
            <FeatureCard 
              icon="notification" 
              text="Real-time data visualization and alerts" 
            />
            <FeatureCard 
              icon="lock" 
              text="Secure, HIPAA-compliant cloud storage" 
            />
          </div>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-6 transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transition-all duration-300">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Welcome Back</h1>
          <p className="text-gray-600 text-center mb-8">Sign in to your account</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md animate-fadeIn">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className={`relative rounded-md shadow-sm transition duration-150 ${activeInput === 'email' ? 'ring-2 ring-blue-300' : ''}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={() => setActiveInput('email')}
                  onBlur={() => setActiveInput(null)}
                  className={`w-full py-3 pl-10 pr-3 border ${emailError ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150`}
                  placeholder="doctor@hospital.org"
                />
              </div>
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className={`relative rounded-md shadow-sm transition duration-150 ${activeInput === 'password' ? 'ring-2 ring-blue-300' : ''}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={() => setActiveInput('password')}
                  onBlur={() => setActiveInput(null)}
                  className={`w-full py-3 pl-10 pr-3 border ${passwordError ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150`}
                  placeholder="••••••••"
                />
              </div>
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 transition duration-150"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                  Remember me for 30 days
                </label>
              </div>
              
              <div>
                <a href="#" className="text-sm text-blue-500 hover:text-blue-700 font-medium transition duration-150">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Select your role:</p>
              <div className="flex space-x-3">
                <RoleButton role="doctor" label="Doctor" />
                <RoleButton role="admin" label="Admin" />
                <RoleButton role="family" label="Family" />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-0.5 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
          
          <div className="mt-10 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">© 2025 Darkside. All rights reserved.</p>
            <p className="text-xs text-gray-500 mt-1">Privacy Policy • Terms of Service • Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 