import dotenv from 'dotenv';
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './src/util/dirname.js';
import viewsRoutes from './src/routes/views.routes.js';
import handlebarsHelpers from './src/util/handlebarsExtraConfig.js';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

app.engine('handlebars', handlebars.engine(handlebarsHelpers));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views');
app.set('partials', __dirname + '/src/views/partials');

app.use(express.static(__dirname + '/public'));

app.use('/', viewsRoutes);
