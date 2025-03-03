# Soar Task Dashboard

Soar Task Dashboard is a modern, responsive financial dashboard application built with React, React-Router and Redux. It provides users with an overview of their financial data, including credit cards, transactions, and expense statistics.

## Features

- **Real-time Financial Updates**: APIs are mocked to simulate real-time updates, seamlessly integrated with Redux state management.
- **Centralized State Management**: Redux handles application state, ensuring consistent data flow across components.
- **Smooth User Experience**: Initial loading screens enhance UX during data fetching or page transitions.
- **Quick Transfer Functionality**: Add recent transactions with a simple amount input, featuring toast notifications for successful transfers.
- **Profile Upload Feature**: Upload a profile picture directly from the Settings page, stored in Redux state.
- **Edit User Profiles**: Update user details (e.g., name, email) with real-time feedback in the Settings page.
- **Weekly Activity Navigation**: View financial transactions by week, with options to navigate to the previous or next week.
- **Data Visualization with Chart.js**: Visualize financial data (e.g., weekly transactions) using interactive charts powered by Chart.js.
- **Load Optimization with React.lazy and Suspense**: Optimize performance by lazy-loading components like Dashboard and Settings, with Suspense for fallback UI.
- Multi-page navigation with React Router
- Responsive design styled with Tailwind CSS

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (v14.0.0 or later)
- [npm](https://www.npmjs.com/) (v8 or higher) or [yarn](https://yarnpkg.com/)
- [Vercel CLI](https://vercel.com/docs/cli) (for deployment)

## Installation

1. Clone the repository (when available):

   ```bash
   git clone https://github.com/giddyupyup/soar-financial-dashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd soar-financial-dashboard
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

## Usage

### Development

Start the development server with hot-reloading:

```bash
npm run dev
```

or

```bash
yarn dev
```

Visit `http://localhost:5173` in your browser (port may vary—check terminal output).

### Build

Generate an optimized production build:

```bash
npm run build
```

or

```bash
yarn build
```

Output is in the `dist` folder.

### Preview

Preview the production build locally:

```bash
npm run preview
```

or

```bash
yarn preview
```

Visit `http://localhost:4173` in your browser (port may vary—check terminal output).

## Deployment to Vercel

Deploy your dashboard to Vercel for a live, hosted version.

### Prerequisites

- A Vercel account
- [Vercel CLI](https://vercel.com/docs/cli) installed:

  ```bash
  npm install -g vercel
  ```

### Steps

1. **Login to Vercel CLI**:

   ```bash
   vercel login
   ```

   Follow the authentication prompts.

2. **Deploy the Project**: Run from the project root:

   ```bash
   vercel
   ```

   - Vercel auto-detects the Vite.js setup.
   - Respond to prompts (e.g., project name, dist directory).

3. **Environment Variables** (Optional): Add variables (e.g., API keys) in the Vercel dashboard:

   - Go to your project in Vercel.
   - Navigate to Settings > Environment Variables.
   - Example: VITE_API_KEY=your-api-key.

4. **Custom Domain** (Optional):

   - In the Vercel dashboard, under Domains, add your custom domain.

5. **Access Your Deployment**: Vercel provides a URL (e.g., https://soar-financial-dashboard.vercel.app) after deployment.
