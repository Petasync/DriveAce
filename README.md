# 🚗 DriveAce - Fahrschul-Lern-App

Moderne Lern-App für die theoretische Führerscheinprüfung (Klasse B) mit Freemium-Modell.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-Expo-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎯 Features

### FREE Version
- ✅ 100 Fragen verfügbar (wird auf 150+ erweitert)
- ✅ Lernen nach Kategorien (7 Kategorien)
- ✅ 5 Lernmodi (Alle Fragen, Nach Kategorie, Zufällig, Schwierige, Favoriten)
- ✅ Live-Statistiken & Fortschritt
- ✅ Streak-Tracking
- ✅ Offline-First Funktionalität
- ✅ Dark Mode Support
- ⚡ Mit Werbung (planned)

### PREMIUM Abo
- ✅ Werbefrei
- ✅ **Prüfungssimulation (30 Fragen, 45 Min, Timer)**
- ✅ **Erweiterte Statistiken mit Kategorieanalyse**
- ✅ **Detaillierte Prüfungsauswertung**
- ✅ Dark Mode
- 🔄 Cloud-Sync (in Entwicklung)
- 🔄 Fehlertraining (geplant)

## 🛠️ Tech Stack

- **Frontend:** React Native (Expo SDK 54)
- **Language:** TypeScript
- **Database:** SQLite (lokal, offline-first)
- **Backend:** Supabase (Auth & Cloud Sync)
- **State Management:** Zustand
- **Navigation:** React Navigation v7
- **UI Components:** React Native Paper + Custom Components
- **Monetization:** RevenueCat + AdMob (planned)

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm oder yarn
- Expo CLI
- iOS Simulator (macOS) oder Android Emulator

### Setup

```bash
# Repository klonen
git clone https://github.com/Petasync/DriveAce.git
cd DriveAce

# Dependencies installieren
npm install

# Environment Variables konfigurieren
cp .env.example .env
# Fülle .env mit deinen Credentials aus

# Development Server starten
npx expo start
```

### Run on Device/Simulator

```bash
# iOS Simulator (macOS only)
npx expo run:ios

# Android Emulator
npx expo run:android

# Expo Go (Development)
npx expo start
# Dann QR-Code scannen mit Expo Go App
```

## 🗄️ Database Setup

Die App verwendet SQLite für lokale Datenspeicherung:

1. Schema wird automatisch beim ersten Start erstellt
2. 100 Seed-Fragen werden automatisch geladen (50 initial + 50 expansion)
3. Alle Daten bleiben offline verfügbar
4. AsyncStorage für Settings-Persistenz

### Database Schema

- **categories** - Fragenkategorien (Verkehrszeichen, Vorfahrt, etc.)
- **questions** - Prüfungsfragen mit Punkten
- **answers** - Antwortoptionen (Multiple Choice)
- **user_progress** - Lernfortschritt pro Frage
- **exam_sessions** - Prüfungsergebnisse
- **favorites** - Markierte Fragen
- **streaks** - Täglicher Lernstreak
- **settings** - App-Einstellungen

## 📁 Projektstruktur

```
DriveAce/
├── src/
│   ├── components/
│   │   ├── common/         # ErrorBoundary, LoadingSpinner
│   │   ├── questions/      # AnswerButton, ProgressBar
│   │   └── categories/     # CategoryCard
│   ├── screens/
│   │   ├── home/           # DashboardScreen (Live-Stats)
│   │   ├── learning/       # QuestionScreen, CategoryScreen, QuestionListScreen
│   │   ├── exam/           # ExamScreen, ExamQuestionScreen, ExamResultScreen
│   │   ├── stats/          # StatsScreen (Live-Daten)
│   │   └── profile/        # ProfileScreen (Settings, Premium)
│   ├── navigation/
│   │   ├── AppNavigator    # Root Navigator
│   │   ├── MainNavigator   # Bottom Tabs
│   │   ├── LearnNavigator  # Learning Stack
│   │   └── ExamNavigator   # Exam Stack (NEW)
│   ├── services/
│   │   ├── database/       # DatabaseService (SQLite)
│   │   └── auth/           # AuthService (Supabase)
│   ├── hooks/              # useDatabase, useProgress, useFavorites, useStreak
│   ├── store/              # authStore, questionsStore, settingsStore
│   ├── contexts/           # ThemeContext (Dark Mode)
│   ├── utils/              # helpers.ts (20+ functions)
│   ├── types/              # TypeScript Interfaces
│   ├── constants/          # theme.ts, config.ts
│   └── assets/             # Images, Icons, Fonts
├── database/
│   ├── schema.sql          # Database Schema
│   ├── seed.sql            # 50 Initial Questions
│   └── seed_expansion.sql  # 50 Additional Questions
├── docs/                   # Documentation
├── .env.example            # Environment Template
└── README.md
```

## 🎨 Design System

Die App nutzt ein konsistentes Design System:

- **Primary Color:** `#2E7D32` (Grün - Fahrschule)
- **Secondary Color:** `#1976D2` (Blau)
- **Success:** `#4CAF50`
- **Error:** `#F44336`
- **Warning:** `#FF9800`

Siehe `src/constants/theme.ts` für Details.

## 🚀 Development

### Aktuelle Phase: MVP+ (v1.0)

✅ **Phase 1 - MVP Setup (Completed):**
- Projekt Setup & Struktur
- Database Schema & Services (SQLite)
- Auth Integration (Supabase)
- Navigation Structure (Tabs + Stacks)
- Design System & Theme
- 50 Initial Seed-Fragen

✅ **Phase 2 - Core Learning (Completed):**
- Question Screen mit Live-Feedback
- 5 Learning Modes
- Custom Hooks (useDatabase, useProgress, useFavorites, useStreak)
- Category System (7 Kategorien)
- Progress Tracking & Favorites
- UI Components (AnswerButton, ProgressBar, CategoryCard)

✅ **Phase 3 - Premium Features (Completed):**
- **Exam Simulation** (30 Fragen, 45 Min Timer, Premium-Gate)
- **Statistics Screen** mit Live-Daten
- **Profile Screen** mit Settings
- Premium Badge & Upgrade Flow

✅ **Phase 4 - Gründliche Verbesserungen (Completed):**
- **Dark Mode** mit ThemeContext & Auto-Detection
- **Enhanced Dashboard** mit Kategoriefortschritt & Live-Stats
- **AsyncStorage** für Settings-Persistenz
- **Error Boundary** für Crash Prevention
- **20+ Helper Functions** (formatTime, calculatePercentage, etc.)
- **Exam Flow komplett**: ExamQuestionScreen, ExamResultScreen, Navigation
- **50 zusätzliche Fragen** (100 total)

🔄 **In Arbeit:**
- Weitere 50 Fragen (Ziel: 150 Fragen)
- Onboarding Flow für neue User
- Dedicated Premium Screen

📅 **Geplant:**
- AdMob Integration
- RevenueCat Premium Subscriptions
- Cloud Sync (Supabase)
- Erweiterte Fehleranalyse
- Push Notifications
- 500+ Fragen

Siehe `TODO.md` für detaillierte Roadmap.

## 📝 Scripts

```bash
# Development
npm start              # Starte Expo Dev Server
npm run android        # Starte auf Android
npm run ios            # Starte auf iOS

# Build
npm run build          # Production Build
eas build --platform all  # EAS Build für Stores

# Testing (coming soon)
npm test               # Run Tests
npm run test:watch     # Watch Mode
```

## 🔐 Environment Variables

Benötigte Environment Variables (siehe `.env.example`):

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
EXPO_PUBLIC_REVENUECAT_API_KEY=your_revenuecat_key
EXPO_PUBLIC_ADMOB_ANDROID_APP_ID=your_admob_id
```

## 🤝 Contributing

Contributions are welcome! Bitte erstelle einen Pull Request oder Issue.

## 📄 License

MIT © 2024 PetaSync

## 👨‍💻 Author

**Phillip** - PetaSync

## 🔗 Links

- [GitHub Repository](https://github.com/Petasync/DriveAce)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)

---

**Status:** 🎯 MVP+ Complete - Ready for Testing

**Aktuelle Version:** v1.0.0 (MVP+)

**Highlights:**
- ✅ Vollständiger Exam Flow mit Timer & Auswertung
- ✅ Dark Mode Support
- ✅ 100 Deutsche Fahrschulfragen
- ✅ Live-Statistiken & Dashboard
- ✅ 5 Lernmodi
- ✅ Offline-First Architecture

**Nächste Schritte:**
- Weitere 50 Fragen hinzufügen
- AdMob & RevenueCat Integration
- App Store Deployment

Letzte Aktualisierung: 30. Dezember 2024
