# 📱 Mobile App Setup Guide

## Running the HR Management Mobile App on Your Phone

This guide will help you run the mobile app on your physical device using Expo Go.

---

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **Expo Go App** on your phone:
   - **Android**: [Download from Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - **iOS**: [Download from App Store](https://apps.apple.com/app/expo-go/id982107779)

### Step 1: Install Dependencies

Open your terminal/PowerShell and navigate to the mobile app folder:

```bash
cd "c:\Users\itsme\OneDrive\Bureau\emsi\4eme anne\big_Data\Gestion_RH\frontend\mobile"
```

Install the required packages:

```bash
npm install
```

### Step 2: Start the Development Server

Start the Expo development server:

```bash
npm start
```

Or:

```bash
npx expo start
```

This will open Expo DevTools in your browser and show a QR code in the terminal.

### Step 3: Connect Your Phone

#### For Android:
1. Open the **Expo Go** app on your Android device
2. Tap **"Scan QR Code"**
3. Scan the QR code displayed in your terminal or browser
4. The app will load on your device

#### For iOS:
1. Open the **Camera** app on your iPhone
2. Point it at the QR code displayed in your terminal or browser
3. Tap the notification that appears
4. The app will open in **Expo Go**

---

## 🔧 Troubleshooting

### Connection Issues

**Problem**: Can't connect to the development server

**Solutions**:
1. Make sure your phone and computer are on the **same WiFi network**
2. Try using the **Tunnel** connection method:
   ```bash
   npx expo start --tunnel
   ```
3. Disable any VPN or firewall that might block the connection
4. Try using **LAN** mode:
   ```bash
   npx expo start --lan
   ```

### Backend Connection

**Problem**: The app can't connect to the backend server

**Solution**: Update the API endpoint to use your computer's local IP address instead of `localhost`.

1. Find your computer's local IP address:
   - **Windows**: Run `ipconfig` in PowerShell (look for IPv4 Address)
   - **Mac**: Run `ifconfig | grep inet` in Terminal
   - **Linux**: Run `hostname -I` in Terminal

2. Example: If your IP is `192.168.1.100`, update the API URLs in the mobile app files:

   Replace `http://localhost:5000` with `http://192.168.1.100:5000`

   Files to update:
   - `screens/LoginScreen.js`
   - `screens/AddEmployee.js`
   - `store/actions.js`
   - Any other files making API calls

### App Crashes on Launch

**Problem**: App crashes immediately after opening

**Solutions**:
1. Clear Expo cache:
   ```bash
   npx expo start -c
   ```
2. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```
3. Check if all dependencies are installed correctly

---

## 📦 Building a Standalone App (APK/IPA)

To build a standalone app that doesn't require Expo Go:

### For Android (APK)

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Login to Expo:
   ```bash
   eas login
   ```

3. Configure the build:
   ```bash
   eas build:configure
   ```

4. Build the APK:
   ```bash
   eas build --platform android --profile preview
   ```

5. Download the APK file from the link provided and install it on your Android device

### For iOS (requires macOS and Apple Developer Account)

```bash
eas build --platform ios
```

---

## 🎨 Features of the Enhanced Mobile App

### ✨ Visual Improvements

- **Modern Gradient Designs**: Beautiful gradient backgrounds on key screens
- **Icon Integration**: Intuitive icons throughout the app using Ionicons
- **Card-Based UI**: Clean card layouts for better organization
- **Responsive Design**: Adapts to different screen sizes
- **Professional Animations**: Smooth transitions and feedback

### 🔐 Enhanced Security

- **Email Validation**: Real-time email format checking
- **Password Visibility Toggle**: Show/hide password feature
- **Form Validation**: Client-side validation before submission

### 🚀 Better User Experience

- **Loading States**: Clear loading indicators for all actions
- **Error Handling**: User-friendly error messages
- **Touch Feedback**: Visual feedback on button presses
- **Keyboard Management**: Smart keyboard handling in forms
- **Quick Actions**: Fast access to common tasks from home screen

### 📊 Dashboard Features

- **Role-Based Access**: Different views for admin and employees
- **Feature Cards**: Quick overview of app capabilities
- **Quick Actions**: One-tap access to add employees, projects, etc.
- **User Profile**: Personalized greeting with user info

---

## 🔄 Development Workflow

### Making Changes

1. Edit any file in the mobile app
2. Save the file
3. The app will automatically reload on your device (Fast Refresh)

### Viewing Logs

Check the terminal where you ran `npm start` to see logs and errors.

### Debugging

1. Shake your device to open the developer menu
2. Select "Debug Remote JS" to use Chrome DevTools
3. Use `console.log()` statements to debug

---

## 📱 Network Configuration for Backend

### Starting the Backend Server

Make sure your backend is accessible from your mobile device:

1. Navigate to the backend folder:
   ```bash
   cd "c:\Users\itsme\OneDrive\Bureau\emsi\4eme anne\big_Data\Gestion_RH\backend"
   ```

2. Start the server with your local IP (if needed):
   ```bash
   node server.js
   ```

3. Verify the server is running by visiting `http://YOUR_LOCAL_IP:5000` in your browser

### Updating API Endpoints

Create a config file for easy API endpoint management:

**File**: `frontend/mobile/config/api.js`

```javascript
// Get your local IP address and update this
const LOCAL_IP = '192.168.1.100'; // Replace with your actual IP

export const API_BASE_URL = __DEV__ 
  ? `http://${LOCAL_IP}:5000/api`
  : 'https://your-production-api.com/api';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  EMPLOYEES: `${API_BASE_URL}/employees`,
  DEPARTMENTS: `${API_BASE_URL}/departments`,
  PROJECTS: `${API_BASE_URL}/projects`,
  REPORTS: `${API_BASE_URL}/reports`,
  USERS: `${API_BASE_URL}/users`,
};
```

---

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Go App Guide](https://expo.dev/client)

---

## 💡 Tips for Best Experience

1. **Keep Your Device Unlocked**: Prevents disconnection during development
2. **Use WiFi**: More stable than mobile data
3. **Close Other Apps**: Frees up memory for better performance
4. **Enable Developer Mode** (Android): For better debugging options
5. **Regular Updates**: Keep Expo Go app updated to the latest version

---

## 🆘 Need Help?

If you encounter any issues:

1. Check the [Expo Forums](https://forums.expo.dev/)
2. Review [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting)
3. Clear cache and restart: `npx expo start -c`
4. Check that backend server is running and accessible

---

## 🎉 You're All Set!

Your HR Management mobile app should now be running smoothly on your phone. Enjoy managing your workforce on the go!
