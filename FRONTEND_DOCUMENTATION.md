# NeuroSync Frontend Documentation

## 1. Project Overview

NeuroSync is a medical application for monitoring patients with neurological disorders. The frontend application is built using React, TypeScript, and Tailwind CSS, designed to provide medical professionals with an intuitive, feature-rich interface for monitoring patient status and tremor data.

## 2. Technology Stack

- **Core**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router v6
- **Data Fetching**: Planning to use React Query (not yet implemented)
- **Real-time Updates**: Planning to use WebSocket (not yet implemented)

## 3. Project Structure

```
src/
├── assets/          # Static assets (images, SVGs, etc.)
├── components/      # Reusable components
│   ├── charts/      # Chart-related components
│   └── ...
├── contexts/        # React Context state management
├── layouts/         # Page layout components
├── pages/           # Page components
│   ├── auth/        # Authentication-related pages
│   ├── dashboard/   # Dashboard-related pages
│   ├── patients/    # Patient management pages
│   ├── reports/     # Reports pages
│   ├── settings/    # Settings pages
│   └── ...
├── services/        # API services and data processing
├── types/           # Global TypeScript type definitions
├── utils/           # Utility functions
├── App.tsx          # Root application component
├── main.tsx         # Application entry point
└── index.css        # Global CSS
```

## 4. Main Components

### Layout Components

- **MainLayout**: Main application layout, containing the sidebar navigation and header.

### Authentication Components

- **Login**: Login page, including email/password authentication, custom form validation, and role selection.
- **AuthContext**: Provides global authentication state and functions.

### Dashboard Components

- **Dashboard**: Main dashboard page, displaying overview and patient list.
- **TremorChart**: Tremor data visualization component, supporting real-time, hourly, daily, and weekly views.
- **StatCard**: Statistical data card component, used to display key metrics.
- **PatientRow**: Patient list row component, displaying basic patient information and status.

### Patient Management Components
- **PatientsPage**: Main patient management page with filtering, search, and role-based operations.
- **PatientDetails**: Component for viewing detailed patient information.

### Reports Components
- **ReportsPage**: Reports management interface with filtering and role-based permissions.
- **ReportGenerator**: Interface for generating new patient reports.

### Settings Components
- **SettingsPage**: User and system settings management interface.

## 5. API Integration

### Authentication API

Expected backend API interfaces:

```typescript
// Login
POST /api/auth/login
Body: { email: string, password: string, role?: string }
Response: { token: string, user: User }

// Logout
POST /api/auth/logout
Headers: { Authorization: Bearer ${token} }
Response: { success: boolean }
```

### Patient Data API

Expected backend API interfaces:

```typescript
// Get patient list
GET /api/patients?page=${page}&limit=${limit}&status=${status}&search=${search}
Headers: { Authorization: Bearer ${token} }
Response: { 
  data: Patient[],
  meta: { total: number, page: number, limit: number }
}

// Get patient details
GET /api/patients/${id}
Headers: { Authorization: Bearer ${token} }
Response: Patient

// Get patient tremor data
GET /api/patients/${id}/tremor?timeframe=${timeframe}
Headers: { Authorization: Bearer ${token} }
Response: { 
  data: { timestamp: string, value: number }[],
  meta: { min: number, max: number, avg: number }
}
```

### Real-time Data Integration

The frontend plans to use WebSocket to receive real-time updates:

```typescript
// WebSocket connection
ws://api.example.com/ws?token=${token}

// Message types
type WebSocketMessage = {
  type: 'TREMOR_UPDATE' | 'PATIENT_STATUS_CHANGE' | 'ALERT';
  data: any;
}
```

## 6. State Management

The application uses React Context API for state management:

- **AuthContext**: Manages user authentication state
- **AppContext**: Manages global application state (theme, settings, etc.)

## 7. Route Structure

```
/login                     # Login page
/dashboard                 # Main dashboard
/patients                  # Patient list
/patients/:patientId       # Patient details
/patients/:patientId/edit  # Edit patient information
/reports                   # Reports list
/reports/:reportId         # Report details
/settings                  # Settings page
```

## 8. Backend Integration Guide

### 1. Authentication Integration

The frontend integrates with the backend authentication system through functions in `authService.ts`:

```typescript
// Current login implementation
login(credentials: { email: string, password: string, role?: string }): Promise<{ token: string, user: User }>
logout(): void
getCurrentUser(): User | null
```

Authentication tokens are stored in localStorage and added to the header of each API request.

### 2. Form Validation

The application uses custom form validation to ensure all input is properly validated:

```typescript
// Example of form validation in Login component
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  let isValid = true;
  
  // Email validation
  if (!email.trim()) {
    setEmailError('Please enter your email address');
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    setEmailError('Please enter a valid email address');
    isValid = false;
  }
  
  // Password validation
  if (!password.trim()) {
    setPasswordError('Please enter your password');
    isValid = false;
  }
  
  if (!isValid) return;
  
  // Proceed with form submission...
}
```

All form validation messages are displayed in English regardless of the user's system language.

### 3. Data Fetching Pattern

The frontend plans to use React Query for data fetching, with data fetching functions located in the `services/` directory. Each API request includes error handling.

### 4. Patient Data Integration

The backend should provide the following patient data structure:

```typescript
interface Patient {
  id: string;
  name: string;
  status: 'critical' | 'moderate' | 'stable';
  lastReading: string;
  details?: {
    age: number;
    gender: string;
    diagnosis: string;
    medications: string[];
    tremorScore: number;
    tremorTrend: string;
    activityLevel: string;
    stepsToday: number;
    sleepQuality: string;
    sleepHours: number;
  }
}
```

### 5. Real-time Updates

To implement real-time updates, the backend needs to provide a WebSocket endpoint with the following capabilities:

- Real-time tremor data updates
- Patient status change notifications
- Alert notifications

## 9. Internationalization and Language

The application currently uses English for all user interface elements and messages:

- All form validation messages are in English
- All error messages are in English
- All static content is in English

The application sets the HTML document language to English to ensure consistent behavior:

```typescript
// Setting document language to English
useEffect(() => {
  document.documentElement.lang = 'en';
}, []);
```

## 10. Environment Variables

```
VITE_API_BASE_URL=http://api.example.com
VITE_WS_URL=ws://api.example.com/ws
VITE_AUTH_TOKEN_KEY=neuro_sync_token
```

## 11. Development Guide

### Installing Dependencies

```bash
npm install
```

### Starting the Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Coding Standards

- Use TypeScript type definitions for all component props and data structures
- Use functional components and React Hooks
- Follow BEM naming convention for Tailwind CSS class names
- Use PascalCase for component files, camelCase for other files
- Use async/await pattern for API requests
- Use useMemo and useCallback for performance optimization
- Implement custom form validation rather than relying on HTML5 validation
- Ensure all user-facing text is in English

### Contribution Process

1. Create a feature branch from the main branch
2. Implement the feature and add tests
3. Submit a Pull Request
4. Merge to the main branch after code review approval

## 12. Test Accounts

Accounts for development and testing:

- Email: test@example.com
- Password: password123
- Role: Doctor, Admin, or Family (selectable at login)

## 13. Contact Information

For any questions, please contact the frontend team: frontend@neurosync.example.com 