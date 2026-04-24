import express from 'express';
import componentMap from '../reactIsolated/componentMap.js';
import {
	requireAuth,
	requireGuest,
	sessionState,
} from '../middlewares/auth.js';

const viewsRoutes = express.Router();

// Global Nav links
const globalObject = {
	styles: '/css/styles.css',
	navLinks: [
		{ link: '/', name: 'home' },
		{ link: '/protected', name: 'protected' },
		{ link: '/login', name: 'login' },
	],
};

// Set global info for handlebars

viewsRoutes.use((req, res, next) => {
	res.locals.globalInfo = globalObject;
	next();
});

// Get props to render for react components

const components = componentMap.filter((e) => e.props);
const componentsDataGlobal = components.map((e) => {
	if (e.id === 'nav-dropdown') return { ...e, props: globalObject.navLinks };
	return { ...e };
});

function renderWithReact(res, viewName, pagePath, options = {}) {
	const components = componentsDataGlobal.filter(
		(e) => e.pages.includes(pagePath) || e.pages.includes('global'),
	);

	return res.render(viewName, {
		components,
		...options,
	});
}

// Set global session state

viewsRoutes.use(sessionState);

// Views

viewsRoutes.get('/', (req, res) => {
	renderWithReact(res, 'index', '/', {
		metaInfo: {
			title: 'Home',
		},
	});
});

viewsRoutes.get('/test1', (req, res) => {
	renderWithReact(res, 'test1', '/test1', {
		metaInfo: {
			title: 'Test01',
		},
	});
});

viewsRoutes.get('/test2', (req, res) => {
	renderWithReact(res, 'test2', '/test2', {
		metaInfo: {
			title: 'Test02',
		},
	});
});

// Login management

viewsRoutes.get('/login', requireGuest, (req, res) => {
	const { error } = req.query;
	renderWithReact(res, 'login', '/login', {
		metaInfo: {
			title: 'Login',
		},
		error: error,
	});
});

viewsRoutes.get('/protected', requireAuth, (req, res) => {
	renderWithReact(res, 'protected', '/protected', {
		metaInfo: {
			title: 'ProtectedRoute',
		},
	});
});

export default viewsRoutes;
