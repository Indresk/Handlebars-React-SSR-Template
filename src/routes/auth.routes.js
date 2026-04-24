import express from 'express';

const authRoutes = express.Router();
authRoutes.use(express.urlencoded({ extended: true }));

authRoutes.post('/login', (req, res) => {
	try {
		const { email, password } = req.body;

		// Get user from DB - Check password
		const isValidUser = email === 'test@example.com' && password === 'asdasd';

		if (!isValidUser) {
			return res.status(401).redirect('/login?error=invalid%20credentials');
		}

		const user = { id: 123, email: 'test@example.com', role: 'user' }; // Object expected if everything is OK

		req.session.regenerate((err) => {
			if (err) return next(err);

			req.session.user = {
				id: user.id,
				email: user.email,
				role: user.role,
			};

			req.session.isAuthenticated = true;

			req.session.save((err) => {
				if (err) return next(err);
				res.redirect('/');
			});
		});
	} catch (error) {
		res.status(401).redirect('/login?error=error%20processing%20the%20login');
	}
});

authRoutes.post('/logout', (req, res, next) => {
	req.session.destroy((err) => {
		if (err) return next(err);

		res.clearCookie('connect.sid');
		res.redirect('/login');
	});
});

export default authRoutes;
