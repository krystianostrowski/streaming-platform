const express = require('express')
const next = require('next');
const fs = require('fs');
const uuid = require('uuid').v4;
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usersAPI = require('./API/usersAPI');
const { query } = require('express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3001;

//console.log(usersAPI.VerifyPassword("0", 'dev'));

const media = [
    {
        title: "Dream of You",
        author: "Anne",
        type: "music",
        poster: "posters/AlbumCover.jpg"
    },
    {
        title: "Dream of You vid",
        author: "Anne",
        type: "video",
        poster: "posters/AlbumCover.jpg"
    },
    {
        title: "The Way I Fell For You",
        author: "Anne",
        type: "music",
        poster: "posters/AlbumCover.jpg"
    },
]

const users = [
    {id: '0', login: 'dev', password: 'dev'}
]

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
        store: new FileStore(),
        secret: 'AnneMunition',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 500000
        }
    }));
    server.use(passport.initialize());
    server.use(passport.session());

    server.get('/', (req, res) => {
        if(req.isAuthenticated())
        {
            res.redirect('/browse');
        }

        handle(req, res);
    });

    server.get('/browse', (req, res) => {
        const isLoggedIn = req.isAuthenticated();
        const queryParams = {loggedIn: isLoggedIn};

        if(isLoggedIn)
        {
            queryParams.user = req.user;
            app.render(req, res, '/browse', queryParams);
        }
        else
        {
            res.redirect('/');
        }

    });

    server.get('/login', (req, res) => {
        handle(req, res);
    });

    server.post('/login', (req, res) => {
        passport.authenticate('local', (err, user, info) => {
            req.login(user, err => {
                res.redirect('/browse');
            })
        })(req, res, next);
    });

    server.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    server.get('/api/media', (req, res) => {
        res.send(media);
    });

    server.get('/player/:title', (req, res) => {
        if(!req.isAuthenticated())
            res.redirect('/');

        const page = '/player';
        let index = null;

        for(let m of media)
        {
            if(m.title === req.params.title)
                index = media.indexOf(m);
        }

        const queryParams = (index != null) ? media[index] : media[0]; 
        queryParams.loggedIn = true;
        app.render(req, res, page, queryParams);
    });

    server.get('/play/:title', (req, res) => {
        if(!req.isAuthenticated())
            res.redirect('/');

        const title = req.params.title.replace(/\s/g, '')
        const path = `./media/${title}`;
        const stat = fs.statSync(path);
        const fileSize = stat.size;
        const range = req.headers.range;

        //console.log(req.headers.range);

        if(range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = (end - start) + 1;
            const file = fs.createReadStream(path, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': `bytes`,
                'Content-Length': chunkSize,
                'Content-Type': 'audio/mpeg',
            }
            console.log("object");
            res.writeHead(206, head);
            file.pipe(res);
        }
        else
        {
            // const head = {
            //     'Content-Length': fileSize,
            //     'Content-Type': 'audio/mpeg',
            // }
            // res.writeHead(200, head);
            // fs.createReadStream(path).pipe(res);
            //app.render(req, res, '/player', {});
            res.redirect('/player/' + req.params.title);
        }
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    //server.use(express.static('public'));

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