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

'''
📦 zenfamy
/src
/api
api.ts
/app
store.ts
rootReducer.ts
rootSaga.ts
persistConfig.ts
/features
/auth
authSlice.ts
authSaga.ts
authTypes.ts
authSelectors.ts
/navigation
AppNavigator.tsx
AuthStack.tsx
MainStack.tsx
/utils
secureStorage.ts
navigationReset.ts
/components/
Home/index.tsx
Header/index.tsx

'''

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
