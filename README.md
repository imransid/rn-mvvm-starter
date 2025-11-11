# Zenfamy React Native Boilerplate 🚀

A **full-featured React Native boilerplate** with **MVVM architecture**, **TypeScript**, **Redux Toolkit**, **Redux Saga**, **RTK Query**, and **React Navigation**, ready for **iOS & Android**.

---

## 🌟 Features

- 🏗 **Architecture**: MVVM (Model-View-ViewModel)
- 🧭 **Navigation**: React Navigation (Stack & Auth Flow)
- 📦 **State Management**: Redux Toolkit + Persist + Logger + Saga
- 🌐 **API Integration**: RTK Query for data fetching
- 🔐 **Auth**: Email/Password login
- 💻 **TypeScript**: Fully typed
- 🎨 **Reusable Components**: Clean & well-commented
- 📱 **Ready-to-run**: iOS & Android

---

## 🗂 Folder Structure
```
📦 zenfamy
└── 📂 src
    ├── 📂 api
    │   └── api.ts                     # RTK Query setup & base API configuration
    │
    ├── 📂 app
    │   ├── store.ts                   # Redux store configuration
    │   ├── rootReducer.ts             # Combines all feature reducers
    │   ├── rootSaga.ts                # Root saga watcher for side effects
    │   └── persistConfig.ts           # Redux Persist setup for state persistence
    │
    ├── 📂 features
    │   └── 📂 auth                    # Authentication feature (MVVM pattern)
    │       ├── authSlice.ts           # Redux slice for auth state (login/logout)
    │       ├── authSaga.ts            # Handles async auth side effects
    │       ├── authTypes.ts           # Strongly typed auth interfaces
    │       └── authSelectors.ts       # Selectors for accessing auth state
    │
    ├── 📂 navigation
    │   ├── AppNavigator.tsx           # Entry point handling stack and auth flow
    │   ├── AuthStack.tsx              # Stack navigator for auth screens
    │   └── MainStack.tsx              # Main app navigation (post-login)
    │
    ├── 📂 utils
    │   ├── secureStorage.ts           # Secure credential storage (Keychain/Keystore)
    │   └── navigationReset.ts         # Helper for navigation reset after login/logout
    │
    ├── 📂 components
    │   ├── 📂 Home
    │   │   └── index.tsx              # Home screen (data fetched via RTK Query)
    │   └── 📂 Header
    │       └── index.tsx              # Reusable header component
    │
    └── 📜 App.tsx                      # Root component initializing store & navigation
```

---

## ⚡ Setup

```bash
# Clone repository
git clone https://github.com/yourusername/zenfamy.git
cd zenfamy

# Install dependencies
yarn install

# Install iOS pods
cd ios && pod install && cd ..

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android
```

## 🤝 Contributing

We welcome contributions! To contribute, please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
