Gestion RH — Mobile scaffold

This folder contains a minimal Expo scaffold to run the app on iOS, Android and web using `react-native-web`.

Quick start

1. From `frontend` run:

```bash
cd mobile
npm install
# then to start the metro dev tools (choose web, ios, or android)
npm run start
```

2. To run specifically on web or device:

```bash
npm run web
npm run ios
npm run android
```

Notes & migration guidance

- This is a scaffold only. To reuse your existing web components:
  - Convert UI components to React Native (`View`, `Text`, `Image`, `StyleSheet`) or use `react-native-web`-compatible libraries.
  - Replace `react-router-dom` with `react-navigation` for mobile navigation.
  - Move shared logic (API calls, Redux store) into a portable folder and import from both web and mobile apps.
- We'll help migrate components in `src/composants` step-by-step if you want.
