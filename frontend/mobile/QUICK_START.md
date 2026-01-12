# 🎯 Quick Start Guide - Mobile App

## Run the App on Your Phone in 5 Minutes!

### Step 1: Install Expo Go App
📱 Download **Expo Go** on your phone:
- **Android**: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

### Step 2: Install Dependencies
Open PowerShell in the mobile folder and run:

```powershell
cd "c:\Users\itsme\OneDrive\Bureau\emsi\4eme anne\big_Data\Gestion_RH\frontend\mobile"
npm install
```

### Step 3: Configure Backend Connection

1. Find your computer's IP address:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., `192.168.1.100`)

2. Open `config/api.js` and update:
   ```javascript
   const LOCAL_IP = '192.168.1.100'; // Your IP here
   ```

### Step 4: Start Backend Server

Open a new PowerShell window:
```powershell
cd "c:\Users\itsme\OneDrive\Bureau\emsi\4eme anne\big_Data\Gestion_RH\backend"
node server.js
```

### Step 5: Start Mobile App

In the mobile folder terminal:
```powershell
npm start
```

### Step 6: Open on Your Phone

1. Make sure your phone and computer are on the **same WiFi**
2. Open **Expo Go** app on your phone
3. **Android**: Tap "Scan QR Code" and scan the QR from terminal
4. **iOS**: Use Camera app to scan the QR code

### 🎉 Done! Your app should now be running!

---

## 🔥 What's New and Improved?

### ✨ Enhanced Visual Design
- **Beautiful Gradients**: Modern gradient backgrounds
- **Professional Icons**: Intuitive icons everywhere
- **Card Layouts**: Clean, organized information display
- **Smooth Animations**: Professional loading and transitions

### 🚀 Better Functionality
- **Real-time Validation**: Instant feedback on forms
- **Password Toggle**: Show/hide password feature
- **Error Messages**: Clear, helpful error displays
- **Loading States**: Visual feedback during operations
- **Touch Feedback**: Responsive button interactions

### 📱 Mobile-First Features
- **Responsive Design**: Works on all screen sizes
- **Keyboard Handling**: Smart keyboard management
- **Status Bar**: Polished status bar integration
- **Quick Actions**: Fast access to common tasks

---

## 🐛 Quick Troubleshooting

### Can't Connect?
- ✅ Check both devices on same WiFi
- ✅ Try tunnel mode: `npx expo start --tunnel`
- ✅ Disable VPN/Firewall temporarily

### App Loads But Shows Errors?
- ✅ Make sure backend server is running
- ✅ Verify IP address in `config/api.js`
- ✅ Check backend logs for errors

### Need to Restart?
```powershell
# Stop the server (Ctrl+C)
# Clear cache and restart
npx expo start -c
```

---

## 📚 Next Steps

1. **Explore the App**: Try logging in and navigating around
2. **Read Full Documentation**: See `MOBILE_SETUP.md` for detailed info
3. **Customize**: Modify colors in `theme.js` to match your brand
4. **Build APK**: Follow steps in `MOBILE_SETUP.md` to create standalone app

---

## 💡 Pro Tips

- Keep your phone unlocked while developing
- Shake your device to open the developer menu
- Use `console.log()` for debugging (check terminal)
- Changes auto-reload on your device (Fast Refresh)

---

**Need Help?** Check `MOBILE_SETUP.md` for comprehensive troubleshooting!
