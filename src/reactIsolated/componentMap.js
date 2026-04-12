const componentMap = [
	{
		id: 'test1',
		hydrate: false,
		component: () =>
			import(/* webpackChunkName: "test1" */ './components/App.jsx'),
	},
	{
		id: 'test2',
		hydrate: false,
		component: () =>
			import(/* webpackChunkName: "test2" */ './components/Test2.jsx'),
	},
	{
		id: 'nav-dropdown',
		hydrate: true,
		component: () =>
			import(/* webpackChunkName: "test2" */ './components/NavDropdown.jsx'),
	},
];
export default componentMap;
