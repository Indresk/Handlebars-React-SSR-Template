import dotenv from 'dotenv';
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './src/util/dirname.js';
import viewsRoutes from './src/routes/views.routes.js';
import handlebarsHelpers from './src/util/handlebarsExtraConfig.js';
import session from 'express-session';
import { sessionConfig } from './src/util/sessionConfig.js';
import apiRoutes from './src/routes/api.routes.js';
import authRoutes from './src/routes/auth.routes.js';

dotenv.config();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET_SESSION;

const sessionConfigOpt = sessionConfig(session, __dirname, SECRET);

const app = express();

app.use(session(sessionConfigOpt));
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

app.engine('handlebars', handlebars.engine(handlebarsHelpers));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views');
app.set('partials', __dirname + '/src/views/partials');

app.use(express.static(__dirname + '/public'));

app.use('/', viewsRoutes);
app.use('/auth', authRoutes);
