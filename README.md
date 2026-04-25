# Handlebars + React SSR Template

This is a template for server-side rendering (SSR) that combines Express.js with Handlebars templates and React for interactive client-side components. The project uses Webpack to bundle React, SASS for styling, and express-session for session-based authentication.

## Features

- **Server-Side Rendering (SSR)**: Pages are rendered on the server using Handlebars templates for faster first paint.
- **React Integration**: React components are loaded and optionally hydrated in the browser from Handlebars views.
- **Webpack Bundling**: React entry points and dynamic imports are bundled with Webpack 5.
- **SASS Styling**: Modular SCSS files compile into a single CSS output.
- **Authentication & Sessions**: Session-based authentication with protected routes and login/logout flow.
- **Development Tools**: Watch mode for JavaScript, CSS, and server changes in development.
- **Modular Architecture**: Clean separation of routes, views, components, middleware, and utilities.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Templating**: Handlebars (express-handlebars)
- **Frontend**: React 19, React DOM
- **Build Tools**: Webpack 5, Babel
- **Styling**: SASS/SCSS
- **Authentication**: `express-session`, `session-file-store`
- **Development**: `concurrently`, Node.js watch mode

## Project Structure

```
├── src/
│   ├── config/                 # Config helpers and session configuration
│   │   ├── handlebarsHelpers.js
│   │   └── sessionConfig.js
│   ├── middlewares/            # Express middleware
│   │   └── auth.js
│   ├── react/                  # React entrypoint, component map, and components
│   │   ├── componentMap.js
│   │   ├── index.jsx
│   │   └── components/
│   │       ├── App.jsx
│   │       ├── NavDropdown.jsx
│   │       └── Test2.jsx
│   ├── routes/                 # Express routes
│   │   ├── api.routes.js
│   │   ├── auth.routes.js
│   │   └── views.routes.js
│   ├── sass/                   # SCSS stylesheets
│   │   ├── index.scss
│   │   └── [partials].scss
│   ├── util/                   # Utility functions
│   │   ├── dirname.js
│   │   └── eraseSessions.js
│   └── views/                  # Handlebars templates
│       ├── index.handlebars
│       ├── login.handlebars
│       ├── protected.handlebars
│       ├── test1.handlebars
│       ├── test2.handlebars
│       ├── layouts/
│       └── partials/
├── localData/                  # Local data storage
│   └── sessions/               # Session files
├── public/                     # Static assets output
│   ├── assets/
│   ├── css/
│   └── js/
├── babel.config.js
├── webpack.config.js
├── package.json
└── index.js
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

- Webpack in watch mode for React bundles
- Node.js server in watch mode
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

The template includes a basic login flow with session management:

- **Login**: POST to `/auth/login` with `email` and `password` fields
- **Logout**: POST to `/auth/logout`
- **Protected Routes**: Use `requireAuth` middleware to protect routes
- **Session State**: Available in templates via `isAuthenticated` and `sessionUser` locals

Default test credentials: `test@example.com` / `asdasd`

### React Component Integration

1. Create a React component under `src/react/components/`.
2. Register it in `src/react/componentMap.js`.
3. Include a matching `<div id="your-component"></div>` in a Handlebars template.

Example mapping:

```js
{
  id: 'your-component',
  component: () => import(/* webpackChunkName: "your-component" */ './components/YourComponent.jsx'),
  hydrate: true,
  pages: ['/'],
  props: {},
}
```

The runtime loads only the components mapped for the current page and hydrates them when `hydrate: true`.

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
