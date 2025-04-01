# NeuroSync - Parkinson's Monitoring System

A modern web application for monitoring and analyzing tremor data from patients with Parkinson's disease. This system provides real-time data visualization, alerts, and patient management features to help medical professionals track patient symptoms and treatment effectiveness.

## Features

- **Secure Authentication**: Role-based access control for doctors, administrators, and family members
- **Real-time Monitoring**: View live tremor data from connected monitoring devices
- **Patient Management**: Track multiple patients and their treatment progress
- **Data Visualization**: Analyze tremor patterns through interactive charts and reports
- **Alert System**: Receive notifications when tremor levels exceed thresholds
- **Responsive Design**: Works on desktops, tablets, and mobile devices

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: React Context API, React Query
- **Routing**: React Router
- **Data Visualization**: Chart.js
- **API Client**: Axios
- **Build Tool**: Vite

## Project Structure

```
neurosync/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Page layouts
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── .eslintrc.js           # ESLint configuration
├── .gitignore             # Git ignore file
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/neurosync.git
   cd neurosync
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

## Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Responsive Design

The application is designed to work on the following screen sizes:
- Mobile: 475px and above
- Tablet: 768px and above
- Desktop: 1024px and above
- Large Desktop: 1920px and above
- Extra Large: 2560px and above

## Security Considerations

- All API requests use HTTPS
- JWT-based authentication
- CSRF protection
- Input sanitization
- Role-based access control
- HIPAA compliant data handling

## License

[MIT License](LICENSE)

## Acknowledgements

- UI Design inspired by modern healthcare applications
- Icons from [Heroicons](https://heroicons.com/)
- Color palette based on accessibility guidelines 