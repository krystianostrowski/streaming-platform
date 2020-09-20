const express = require('express');
const next = require('next');
const uuid = require('uuid').v4;
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usersAPI = require('./API/usersAPI');
const { Release } = require('./API/mediaAPI');
const cron = require('node-cron');
//const bcrypt = require('bcrypt');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

const MAX_COOKIE_AGE = 1000 * 60 * 60;

//console.log(bcrypt.hashSync('dev', 10));

cron.schedule('0 0 * * *', () => { Release() });

passport.use(new LocalStrategy(
    { usernameField: 'login' },
    (login, password, done) => {
        const user = usersAPI.SearchUserByName(login);
        if(user)
        {
            if(usersAPI.VerifyPassword(user.id, password))
            {
                return done(null, user.id);
            }
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((id, done) => {
    const user = usersAPI.SearchUserByID(id);
    done(null, user);
});

app.prepare().then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
        extended: true
    }));
    server.use(session({
        genid: (req) => {
            return uuid();
        },
        name: 'loginSession',
        store: new FileStore(),
        secret: "Z!.pr;![8tA9hyJ8kN?4#&(g*K_'63Td",
        rolling: true,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: MAX_COOKIE_AGE
        }
    }));
    server.use(passport.initialize());
    server.use(passport.session());

    require('./routes/pages')(server, handle, passport, next, app);
    require('./routes/apiRoutes')(server, app);

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if(err)
            throw err

        console.log(`> Ready on http://localhost:${port}`);
    });

})
.catch(ex => {
    console.log(ex.stack);
    process.exit(1);
});