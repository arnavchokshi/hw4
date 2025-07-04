# Blockchain Analysis Web App

A React-based web application showcasing blockchain analysis and Ethereum transaction data visualization.

## Features

- Interactive blockchain data visualization
- Real-time statistics and analytics
- Responsive design with Tailwind CSS
- Code snippet display with copy functionality
- Tabbed interface for different data views

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment Options

### Option 1: Deploy to Netlify (Recommended)

1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Drag and drop the `build` folder to deploy
   - Or connect your GitHub repository for automatic deployments

### Option 2: Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 3: Deploy to GitHub Pages

1. Add homepage to package.json:
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name"
}
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add deploy script to package.json:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

4. Deploy:
```bash
npm run deploy
```

### Option 4: Deploy to Firebase

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase:
```bash
firebase init hosting
```

4. Build and deploy:
```bash
npm run build
firebase deploy
```

## Project Structure

```
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js          # Main application component
│   ├── index.js        # Entry point
│   └── index.css       # Global styles with Tailwind
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## Technologies Used

- React 18
- Tailwind CSS
- Create React App
- PostCSS
- Autoprefixer

## Customization

To customize the blockchain data or add your own images:

1. Replace the placeholder image URLs in `src/App.js`
2. Update the transaction data arrays
3. Modify the methodology steps and code snippets
4. Add your own blockchain graph and price chart images

## Support

For issues or questions, please check the React documentation or create an issue in the repository. 