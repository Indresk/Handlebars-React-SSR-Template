# Handlebars + React SSR Template

This is a template for a server-side rendering (SSR) that combines Express.js with Handlebars for server-side templating and React for interactive client-side components. Currently allows hydrated and root rendered island components. All contributions are welcome.

## Features

- **Server-Side Rendering (SSR)**: Pages are rendered on the server using Handlebars templates for fast initial load times.
- **React Integration**: React components can be embedded within Handlebars views and hydrated on the client for interactivity.
- **Webpack Bundling**: React components are bundled using Webpack for optimized delivery.
- **SASS Styling**: Modular SCSS architecture for maintainable stylesheets.
- **Authentication & Sessions**: Secure user authentication with session management using express-session and file-based storage.
- **Development Tools**: Hot reloading for CSS, JS, and server changes during development.
- **Modular Architecture**: Organized structure for views, components, routes, and utilities.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Templating**: Handlebars (express-handlebars)
- **Frontend**: React 19, React DOM
- **Build Tools**: Webpack 5, Babel
- **Styling**: SASS/SCSS
- **Authentication**: express-session, session-file-store, argon2
- **Development**: Concurrently, Nodemon-like watching

## Project Structure

```
├── src/
│   ├── middlewares/            # Express middleware
│   │   └── auth.js             # Authentication middleware
│   ├── reactIsolated/          # React components and hydration logic
│   │   ├── componentMap.js     # Maps React components to DOM elements with page-specific rendering
│   │   ├── index.jsx           # Client-side hydration entry point
│   │   └── components/         # Individual React components
│   ├── routes/                 # Express routes
│   │   ├── api.routes.js       # API routes
│   │   ├── auth.routes.js      # Authentication routes (login/logout)
│   │   └── views.routes.js     # View routes with component data and pre-render validations
│   ├── sass/                   # SCSS stylesheets
│   │   ├── index.scss          # Main stylesheet entry
│   │   └── [partials]/         # Modular style components
│   ├── util/                   # Utility functions
│   │   ├── dirname.js          # Directory utilities
│   │   ├── handlebarsExtraConfig.js # Handlebars helpers
│   │   └── sessionConfig.js    # Session configuration
│   └── views/                  # Handlebars templates
│       ├── index.handlebars    # Main page template
│       ├── login.handlebars    # Login page template
│       ├── protected.handlebars # Protected page template
│       ├── layouts/            # Layout templates
│       └── partials/           # Reusable template parts
├── localData/                  # Local data storage
│   └── sessions/               # Session files
├── public/                     # Static assets
│   ├── assets/                 # Images, fonts, etc.
│   ├── css/                    # Compiled CSS
│   └── js/                     # Bundled JavaScript
├── babel.config.js             # Babel configuration
├── webpack.config.js           # Webpack configuration
├── package.json                # Dependencies and scripts
└── index.js                    # Server entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- SASS (v1.9 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
PORT=10100
SECRET_SESSION=your-secret-key-here
```

### Development

To start the development server with hot reloading:

```bash
npm run dev
```

This command runs:

- Webpack in watch mode for React components
- Express server with file watching
- SASS compiler in watch mode

The application will be available at `http://localhost:10100`

### Production Build

To build for production all is seted as prestart script, but you can also run:

```bash
npm run build && npm run build:css
```

This compiles and minifies all assets.

To start the production server:

```bash
npm start
```

## Usage

### Authentication

The application includes built-in authentication with session management:

- **Login**: POST to `/auth/login` with `email` and `password` fields
- **Logout**: POST to `/auth/logout`
- **Protected Routes**: Use `requireAuth` middleware to protect routes
- **Session State**: Available in templates via `isAuthenticated` and `sessionUser` locals

Default test credentials: `test@example.com` / `asdasd`

### Adding React Components

1. Create your React component in `src/reactIsolated/components/`
2. Add it to the component map in `src/reactIsolated/componentMap.js`:

```javascript
[
	// ... existing components
	{
		id: 'your-component',
		component: () =>
			import(
				/* webpackChunkName: "your-component" */ './components/YourComponent.jsx'
			),
		hydrate: true, // Set to true for client-side hydration
		pages: ['/'], // Specify which pages this component should render on, or ['global'] for all pages
		props: {}, // Optional props to pass to the component
	},
];
```

3. Include the component in your Handlebars template:

```handlebars
<div id='your-component'></div>
```

The system now includes pre-render validations that automatically filter and render only the components specified for each view, improving performance and organization.

## Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build production assets
- `npm run build:watch` - Build assets in watch mode
- `npm run start` - Start production server
- `npm run dev:css` - Watch and compile SASS in development mode
- `npm run build:css` - Compile and compress SASS for production

## Working on:

- Fix the spacing rendering issue on handlebars to allow easily hydratation
- Implement database integration for user management
- Add more authentication features (registration, password reset)

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or improvements.

## License

This project is licensed under the MIT License.
