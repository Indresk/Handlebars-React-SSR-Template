import sessionFileStore from 'session-file-store';
export function sessionConfig(session, __dirname, SECRET) {
	const FileStore = sessionFileStore(session);
	return {
		store: new FileStore({
			path: __dirname + '/localData/sessions',
			ttl: 3600,
			retries: 2,
			logFn: function () {},
		}),
		secret: SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 3600000, httpOnly: true, secure: false },
	};
}
