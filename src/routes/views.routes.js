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

const components = componentMap.filter((e) => e.hydrate);
const data = components.map((e) => {
	if (!e.props) return { ...e, props: globalObject.navLinks };
	return { ...e };
});

viewsRoutes.get('/', (req, res) => {
	res.render('index', {
		metaInfo: {
			title: 'Test01',
		},
		globalInfo: globalObject,
		components: data,
	});
});

export default viewsRoutes;
