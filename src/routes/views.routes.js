import express from 'express';
import componentMap from '../reactIsolated/componentMap.js';

const viewsRoutes = express.Router();

const globalObject = {
	styles: '/css/styles.css',
	navLinks: [
		{ link: '/', name: 'home' },
		{ link: '/test1', name: 'test1' },
		{ link: '/test2', name: 'test2' },
	],
};

const components = componentMap.filter((e) => e.props);
const componentsDataGlobal = components.map((e) => {
	if (e.id === 'nav-dropdown') return { ...e, props: globalObject.navLinks };
	return { ...e };
});

viewsRoutes.get('/', (req, res) => {
	const componentesFiltered = componentsDataGlobal.filter(
		(e) => e.pages.includes('/') || e.pages.includes('global'),
	);
	res.render('index', {
		metaInfo: {
			title: 'Home',
		},
		globalInfo: globalObject,
		components: componentesFiltered,
	});
});

viewsRoutes.get('/test1', (req, res) => {
	const componentesFiltered = componentsDataGlobal.filter(
		(e) => e.pages.includes('/test1') || e.pages.includes('global'),
	);
	res.render('test1', {
		metaInfo: {
			title: 'Test01',
		},
		globalInfo: globalObject,
		components: componentesFiltered,
	});
});

viewsRoutes.get('/test2', (req, res) => {
	const componentesFiltered = componentsDataGlobal.filter(
		(e) => e.pages.includes('/test2') || e.pages.includes('global'),
	);
	res.render('test2', {
		metaInfo: {
			title: 'Test02',
		},
		globalInfo: globalObject,
		components: componentesFiltered,
	});
});

export default viewsRoutes;
