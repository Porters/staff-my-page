# Staff My Page

A modern staff management application built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form
- **Routing**: React Router
- **Tables**: TanStack Table
- **Drag & Drop**: @dnd-kit
- **HTTP Client**: Axios
- **Date Utilities**: date-fns

## Code Quality Tools

- ESLint (TypeScript + React rules)
- Prettier
- Husky (Git hooks)
- lint-staged

## Project Structure

```
src/
├── components/       # Reusable UI components (Dialog, Input, DatePicker, Button)
├── pages/           # Page components (Login, Dashboard, Tables, Forms)
├── hooks/           # Custom React hooks
├── store/           # Zustand state management
├── services/        # API service layer
├── utils/           # Utility functions
└── types/           # TypeScript type definitions
```

## Features

- **Authentication Flow**: Login with username/password + OTP verification
- **Dashboard**: Header + sidebar navigation with 4 menu items
- **Table Pages**: With pagination, filtering, and sorting capabilities
- **Dynamic Form**: Drag-and-drop form builder
- **Shared Components**: Reusable Dialog, Input, DatePicker, and Button components

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the environment variables in `.env` as needed

### Development

Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:
```bash
yarn build
```

Preview production build:
```bash
yarn preview
```

### Linting & Formatting

Run ESLint:
```bash
yarn lint
```

Fix ESLint issues:
```bash
yarn lint:fix
```

Format code with Prettier:
```bash
yarn format
```

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues
- `yarn format` - Format code with Prettier

## Git Hooks

The project uses Husky for git hooks:
- **pre-commit**: Runs lint-staged to check and fix code before committing



```
