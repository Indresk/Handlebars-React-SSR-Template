# Handlebars + React SSR Template

A server-side rendering (SSR) template that combines Express.js with Handlebars for server-side templating and React for interactive client-side components. This setup allows for efficient rendering of pages on the server while enabling React components to hydrate on the client for dynamic behavior.

## Features

- **Server-Side Rendering (SSR)**: Pages are rendered on the server using Handlebars templates for fast initial load times.
- **React Integration**: React components can be embedded within Handlebars views and hydrated on the client for interactivity.
- **Webpack Bundling**: React components are bundled using Webpack for optimized delivery.
- **SASS Styling**: Modular SCSS architecture for maintainable stylesheets.
- **Development Tools**: Hot reloading for CSS, JS, and server changes during development.
- **Modular Architecture**: Organized structure for views, components, routes, and utilities.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Templating**: Handlebars (express-handlebars)
- **Frontend**: React 19, React DOM
- **Build Tools**: Webpack 5, Babel
- **Styling**: SASS/SCSS
- **Development**: Concurrently, Nodemon-like watching

## Project Structure

```
├── src/
│   ├── reactIsolated/          # React components and hydration logic
│   │   ├── componentMap.js     # Maps React components to DOM elements
│   │   ├── index.jsx           # Client-side hydration entry point
│   │   └── components/         # Individual React components
│   ├── routes/                 # Express routes
│   │   └── views.routes.js     # View routes with component data
│   ├── sass/                   # SCSS stylesheets
│   │   ├── index.scss          # Main stylesheet entry
│   │   └── [partials]/         # Modular style components
│   ├── util/                   # Utility functions
│   │   ├── dirname.js          # Directory utilities
│   │   └── handlebarsExtraConfig.js # Handlebars helpers
│   └── views/                  # Handlebars templates
│       ├── index.handlebars    # Main page template
│       ├── layouts/            # Layout templates
│       └── partials/           # Reusable template parts
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

### Adding React Components

1. Create your React component in `src/reactIsolated/components/`
2. Add it to the component map in `src/reactIsolated/componentMap.js`:

```javascript
import YourComponent from './components/YourComponent.jsx';

export default [
	// ... existing components
	{
		id: 'your-component',
		component: () => import('./components/YourComponent.jsx'),
		hydrate: true, // Set to true for client-side hydration
	},
];
```

3. Include the component in your Handlebars template:

```handlebars
<div id='your-component'></div>
```

4. For better organization, only hydrated components use props. If your component needs props, add them with the `props` key in `componentMap.js`:

```javascript
{
    id: 'your-component',
    component: () => import(/* webpackChunkName: "your-component" */ './components/YourComponent.jsx'),
    hydrate: true,
    props: {
        title: 'Hello World',
    },
},
```

### Styling

Add styles in the `src/sass/` directory. The main entry point is `index.scss`, which forwards variables and mixins and uses partials.

### Routes

Add new routes in `src/routes/views.routes.js` as express endpoints.
`globalObject` will set the primary navigation links and styles for the entire site.
`metaInfo`, `globalInfo` and `components` keys in render options for handlebars are required as used in the main layout, but you can add as many as you want and use them in your templates.

## Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build production assets
- `npm run build:watch` - Build assets in watch mode
- `npm run start` - Start production server
- `npm run dev:css` - Watch and compile SASS in development mode
- `npm run build:css` - Compile and compress SASS for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
