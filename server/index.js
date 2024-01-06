const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const User = require('./models/User')
const Content = require('./models/Content')
const grammarRoutes = require('./routes/grammarRoute');
const bardRoutes = require('./routes/bardRoute');
const userRoutes = require('./routes/userRoute');
const contentRoutes = require('./routes/contentRoute');
const session = require('express-session');
const passport = require('passport');
const server = require('http').createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());  
app.use(session({
  secret: process.env.JWT_SECRET_KEY,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


mongoose.connect('mongodb://127.0.0.1:27017/spear')

app.use('/grammar', grammarRoutes);
app.use('/ai', bardRoutes);
app.use('/user', userRoutes);
app.use('/content', contentRoutes);

app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
});

const port = 8000;

server.listen(port, () => {
  console.log(`The server is running at ${port}`)
})