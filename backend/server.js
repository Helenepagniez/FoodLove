const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const recetteRoutes = require('./routes/recette.routes');
const ingredientRoutes = require('./routes/ingredient.routes');
const etapeRoutes = require('./routes/etape.routes');
const composantRoutes = require('./routes/composant.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const path = require('path');

const app = express();

//CORS
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));
app.use(cookieParser());
app.use(mongoSanitize()); // En prévention des injections
app.use(helmet()); // helmet

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});


//routes
app.use('/api/user', userRoutes);
app.use('/api/recette', recetteRoutes);
app.use('/api/recette', etapeRoutes);
app.use('/api/recette', composantRoutes);
app.use('/api/ingredient', ingredientRoutes);


app.use('/pictures', express.static(path.join(__dirname, 'pictures')));

//server
app.listen(process.env.PORT, ()=>{

    console.log(`listening on  port ${process.env.PORT}`);
})