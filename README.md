# 🏢 Gestion RH - Human Resources Management System

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.71-blue?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2048-black?logo=expo)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

A comprehensive, cross-platform Human Resources Management System designed to streamline employee management, project tracking, and HR operations. Built with modern technologies for web, mobile, and tablet platforms.

## 🌟 Features

### Core Functionality
- **👥 User Management** - Create, update, and manage user accounts with role-based access control
- **👨‍💼 Employee Management** - Comprehensive employee database with profiles and information
- **🏢 Department Management** - Organize departments and manage department hierarchies
- **📋 Project Management** - Track projects, assign employees, and manage deadlines
- **📊 Reporting System** - Generate, view, and manage comprehensive reports
- **⚙️ Settings** - Customizable application preferences and configurations

### User Roles
- **Admin Dashboard** - Full system access, user management, and analytics
- **User Dashboard** - Personal profile, projects, and reports

### Technical Features
- **🌓 Dark/Light Theme** - Persistent theme preference with system integration
- **📱 Cross-Platform** - Seamless experience on iOS, Android, and Web
- **🔒 Authentication** - Secure login with session management
- **🎨 Modern UI** - Clean, intuitive interface built with React Native
- **🔄 Redux State Management** - Efficient application state management
- **📡 RESTful API** - Clean backend API architecture

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB/SQLite** - Database management

### Frontend - Web
- **React 18** - UI library
- **Redux** - State management
- **CSS3** - Styling

### Frontend - Mobile
- **React Native** - Cross-platform mobile development
- **Expo** - React Native framework and platform
- **React Navigation** - Navigation library
- **Redux** - State management
- **React Native AsyncStorage** - Local data persistence

## 📦 Project Structure

```
Gestion_RH/
├── backend/
│   ├── models.js           # Database models
│   ├── server.js           # Express server
│   ├── seedData.js         # Initial data seeding
│   └── package.json
│
├── frontend/
│   ├── mobile/             # React Native / Expo app
│   │   ├── App.js
│   │   ├── app.json        # Expo configuration
│   │   ├── screens/        # Screen components
│   │   ├── store/          # Redux store
│   │   ├── context/        # React context (theming)
│   │   ├── utils/          # Utility functions
│   │   └── package.json
│   │
│   └── src/                # React web app (future)
│       ├── components/
│       ├── composants/
│       └── package.json
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- (Optional) Expo Go app for mobile testing

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Arhrid-Hamza/Gestion_RH.git
cd Gestion_RH
```

2. **Backend Setup**
```bash
cd backend
npm install
npm start
```
The backend server will run on `http://localhost:5000`

3. **Mobile App Setup**
```bash
cd frontend/mobile
npm install
npm start
```
Scan the QR code with Expo Go on your phone or press:
- `a` - Android emulator
- `i` - iOS simulator  
- `w` - Web browser

### Environment Configuration
Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/gestion_rh
```

## 📱 Mobile App Usage

### Starting the Development Server
```bash
cd frontend/mobile
npm start
```

### Testing Options
- **Expo Go App**: Scan QR code on your mobile device
- **Android Emulator**: Press `a` in terminal
- **iOS Simulator**: Press `i` in terminal
- **Web Browser**: Press `w` in terminal

### Building for Production
```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

## 🔐 Security

- Role-based access control (RBAC)
- Secure authentication with session management
- Data validation on both client and server
- Protected API endpoints
- XSS and CSRF protection

## 🎯 Key Screens

### Authentication
- Login Screen - User authentication

### Admin Features
- Admin Dashboard - System overview and management
- User Management - Add, edit, delete users
- Employee Management - Manage employee records
- Department Management - Organize departments
- Project Management - Track projects
- Reports - Generate system reports
- Settings - System configuration

### User Features
- User Dashboard - Personal workspace
- Profile Management - View and edit profile
- Project Access - View assigned projects
- Reports - Access personal reports

## 🌐 API Endpoints

### Authentication
- `POST /api/login` - User login

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create new department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports` - Create new report

## 🎨 Theme System

The application supports both light and dark themes with:
- **Persistent Storage** - Theme preference saved locally
- **System Integration** - Respects device color scheme preference
- **Dynamic Colors** - Real-time theme switching
- **Consistent Design** - Unified color palette across all screens

### Theme Colors
- **Primary**: #2e7d32 (Green)
- **Secondary**: #f9f9f9 / #1a1a1a
- **Text**: #333333 / #e0e0e0
- **Border**: #cccccc / #333333

## 🐛 Bug Fixes & Recent Updates

### Version 1.0.0 - Current
- ✅ Fixed theme styling and manifest errors
- ✅ Resolved blank page issues with proper color definitions
- ✅ Fixed staticTheme import errors across components
- ✅ Updated expo-updates manifest configuration
- ✅ Improved theme context with light/dark mode support
- ✅ Professional code structure and organization

## 📝 Development Guidelines

### Code Standards
- ES6+ JavaScript
- Functional components with React Hooks
- Redux for state management
- Consistent file naming conventions
- Proper error handling and validation

### File Organization
- Screen components in `screens/` folder
- Reusable components in `components/` folder
- Redux actions/reducers in `store/` folder
- Context providers in `context/` folder
- Utilities in `utils/` folder

### Git Workflow
1. Create feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -m "feat: description"`
3. Push to branch: `git push origin feature/feature-name`
4. Create Pull Request

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Authors

- **Hamza Arhrid** - Initial development
- EMSI 4ème année - Big Data Program

## 📞 Support & Documentation

For additional documentation:
- See [MOBILE_SETUP.md](frontend/mobile/MOBILE_SETUP.md) for mobile setup guide
- See [QUICK_START.md](frontend/mobile/QUICK_START.md) for quick start guide
- See [API Documentation](#-api-endpoints) for API details

## 🗺️ Roadmap

- [ ] Advanced reporting features
- [ ] Employee performance tracking
- [ ] Leave/Vacation management
- [ ] Payroll integration
- [ ] Multi-language support (i18n)
- [ ] Calendar integration
- [ ] Email notifications
- [ ] Two-factor authentication (2FA)
- [ ] Analytics dashboard

## 📊 System Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Expo SDK**: 48.0.0
- **React**: 18.0.0 or higher
- **React Native**: 0.71.0 or higher

## 🔄 Recent Improvements

### Bug Fixes
- Fixed undefined `staticTheme` references in multiple screen components
- Resolved expo-updates manifest parsing errors
- Fixed blank page issues with proper theme color initialization
- Improved theme consistency across the application

### Enhancements
- Added comprehensive theme color definitions
- Improved component styling with dynamic theme support
- Better error handling and validation
- Enhanced code organization and documentation

## ❓ FAQ

**Q: How do I run the app on my phone?**
A: Install Expo Go, then run `npm start` from the mobile directory and scan the QR code.

**Q: Can I deploy this to production?**
A: Yes! Use EAS Build for native apps or deploy the web version to a hosting service.

**Q: How do I customize the theme?**
A: Edit the color values in `frontend/mobile/context/ThemeContext.js`

**Q: What's the default admin credentials?**
A: Check the seedData.js file for initial credentials.

---

**Last Updated**: January 12, 2026  
**Status**: ✅ Active Development  
**Version**: 1.0.0
