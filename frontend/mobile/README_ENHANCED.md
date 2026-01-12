# HR Management Mobile App

A modern, feature-rich mobile application for managing human resources, built with React Native and Expo.

## 🎨 Features

### Enhanced UI/UX
- **Modern Design**: Beautiful gradient backgrounds and card-based layouts
- **Intuitive Icons**: Clear visual indicators using Ionicons
- **Responsive**: Works seamlessly on different screen sizes
- **Smooth Animations**: Professional transitions and loading states
- **Dark Status Bar**: Polished status bar integration

### Functionality
- ✅ **User Authentication**: Secure login with email validation
- ✅ **Employee Management**: Add, view, and update employee records
- ✅ **Department Organization**: Manage company departments
- ✅ **Project Tracking**: Monitor ongoing projects
- ✅ **Report Generation**: Create and view reports
- ✅ **Role-Based Access**: Different views for admin and regular users
- ✅ **Real-time Validation**: Client-side form validation
- ✅ **Error Handling**: User-friendly error messages

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Expo Go app on your phone ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779))
- Backend server running (see backend setup)

### Installation

1. **Navigate to the mobile app directory:**
   ```bash
   cd frontend/mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open the app on your phone:**
   - **Android**: Open Expo Go app and scan the QR code
   - **iOS**: Use Camera app to scan the QR code

📖 **For detailed setup instructions, see [MOBILE_SETUP.md](./MOBILE_SETUP.md)**

## 📱 Running on Physical Device

### Method 1: Using Expo Go (Recommended for Development)

1. Install Expo Go on your device
2. Make sure your phone and computer are on the same WiFi
3. Run `npm start` and scan the QR code
4. The app will load instantly

### Method 2: Building Standalone App

For a production-ready app that doesn't require Expo Go:

```bash
# Install EAS CLI
npm install -g eas-cli

# Build for Android
eas build --platform android --profile preview

# Build for iOS (requires macOS)
eas build --platform ios
```

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6
- **State Management**: Redux with Redux Thunk
- **UI Components**: Custom components with Expo Vector Icons
- **Styling**: StyleSheet API with theme system
- **Status Bar**: Expo Status Bar
- **Gradients**: Expo Linear Gradient
- **Storage**: AsyncStorage

## 📂 Project Structure

```
mobile/
├── assets/                 # App icons and images
├── auth/
│   └── AuthContext.js     # Authentication context
├── screens/
│   ├── LoginScreen.js     # Enhanced login with gradient
│   ├── HomeScreen.js      # Feature-rich home dashboard
│   ├── AddEmployee.js     # Improved employee form
│   ├── AdminDashboard.js  # Admin management panel
│   └── ...                # Other screens
├── store/
│   ├── actions.js         # Redux actions
│   ├── reducer.js         # Redux reducers
│   └── store.js           # Redux store configuration
├── utils/
│   └── alerts.js          # Alert utilities
├── App.js                 # Main app component
├── theme.js               # Enhanced theme system
├── app.json               # Expo configuration
└── package.json           # Dependencies
```

## 🎨 Theme System

The app uses a centralized theme system for consistent styling:

```javascript
import { theme } from './theme';

// Colors
theme.colors.primary        // Main brand color
theme.colors.primaryLight   // Lighter variant
theme.colors.surface        // Card/surface color

// Spacing
theme.spacing.md           // Standard spacing

// Typography
theme.typography.h1        // Heading styles
theme.typography.body1     // Body text styles

// Shadows
theme.shadows.medium       // Elevation shadows
```

## 🔧 Configuration

### Backend Connection

Update API endpoints in your screen files to match your backend server:

```javascript
// For local development with physical device
const API_URL = 'http://YOUR_LOCAL_IP:5000';

// Example
const API_URL = 'http://192.168.1.100:5000';
```

### App Settings

Edit `app.json` to customize:
- App name and slug
- Icon and splash screen
- Platform-specific settings
- Build configurations

## 📱 Screen Highlights

### Login Screen
- Beautiful gradient background
- Email validation
- Password visibility toggle
- Loading indicators
- Error handling with icons

### Home Screen
- Personalized welcome message
- Feature cards with icons
- Quick action buttons for admins
- Role-based content
- Smooth navigation

### Add Employee Screen
- Intuitive form layout
- Real-time validation
- Visual feedback
- Department selection chips
- Role selection cards
- Success/error alerts

## 🔐 Security Features

- Client-side form validation
- Secure password input
- JWT token authentication (via backend)
- Role-based access control
- Protected routes

## 🧪 Testing

```bash
# Run in development mode
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Clear cache
npx expo start -c
```

## 📝 Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Open on Android device/emulator
- `npm run ios` - Open on iOS device/simulator
- `npm run web` - Run in web browser

## 🐛 Troubleshooting

### Can't connect to backend
- Ensure backend server is running
- Update API endpoints to use your local IP address
- Check that phone and computer are on same WiFi network

### App won't load
- Clear Expo cache: `npx expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Update Expo Go app on your device

### Blank screen
- Check console for errors
- Verify all dependencies are installed
- Ensure backend server is accessible

For more help, see [MOBILE_SETUP.md](./MOBILE_SETUP.md)

## 🚀 Deployment

### Android (APK)
1. Configure app.json with proper identifiers
2. Run `eas build --platform android`
3. Download and distribute the APK

### iOS (IPA)
1. Requires Apple Developer account
2. Configure app.json with bundle identifier
3. Run `eas build --platform ios`
4. Submit to App Store or distribute via TestFlight

## 📦 Dependencies

Key dependencies:
- expo: ^48.0.0
- react-native: 0.71.14
- @react-navigation/native: ^6.1.7
- @expo/vector-icons: ^13.0.0
- expo-linear-gradient: ^12.1.2
- expo-status-bar: ^1.4.4
- react-redux: ^8.1.3
- redux: ^4.2.1

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is part of the HR Management System.

## 🙏 Acknowledgments

- Expo team for the amazing framework
- React Navigation for smooth navigation
- Ionicons for beautiful icons

---

Made with ❤️ for efficient HR management
