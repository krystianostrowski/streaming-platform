const usersAPI = require('../API/usersAPI');
const { Log, LogTypes } = require('../API/debugMessages');

const IP_Whitelist = [
    '::ffff:127.0.0.1',
    '::ffff:192.168.0.102',
    '::ffff:192.168.0.108'
]

module.exports = function(server, handle, passport, next, app) {
    server.get('/', (req, res) => {

        const IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        if(!IP_Whitelist.includes(IP))
        {
            Log(`Unauthorized connection from ${IP}`, LogTypes.Warning);
            res.status(403).send("<h1>Error 403 - Forbidden</h1>You don't have permission to access this server.");
        }
        else
        {
            Log(`Connection from ${IP}`);
            if(req.isAuthenticated())
            {
                res.redirect('/browse');
            }

            handle(req, res);
        }
    });

    server.get('/browse', (req, res) => {
        const isLoggedIn = req.isAuthenticated();
        const queryParams = {};

        if(isLoggedIn)
        {
            queryParams.user = req.user;
            queryParams.user.lv = usersAPI.GetPermissionLvl(req.user.id);
            app.render(req, res, '/browse', queryParams);
        }
        else
        {
            res.redirect('/');
        }
    });

    server.get('/music', (req, res) => {
        const isLoggedIn = req.isAuthenticated();
        const queryParams = {};

        if(isLoggedIn)
        {
            queryParams.user = req.user;
            queryParams.user.lv = usersAPI.GetPermissionLvl(req.user.id);
            app.render(req, res, '/music', queryParams);
        }
        else
        {
            res.redirect('/');
        }
    }); 

    server.get('/video', (req, res) => {
        const isLoggedIn = req.isAuthenticated();
        const queryParams = {};

        if(isLoggedIn)
        {
            queryParams.user = req.user;
            queryParams.user.lv = usersAPI.GetPermissionLvl(req.user.id);
            app.render(req, res, '/video', queryParams);
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
                Log(`${user} logged in`);
                res.redirect('/browse');
            })
        })(req, res, next);
    });

    server.get('/logout', (req, res) => {
        Log(`${req.user.id} logged out`);
        req.logout();
        res.redirect('/');
    });

    server.get('/control-panel', (req, res) => {
        if(req.isAuthenticated())
        {
            const lv = usersAPI.GetPermissionLvl(req.user.id)
            
            if(lv < 1)
            {
                res.redirect('/browse');
            }
            else
            {
                let queryParams = {}; 
                queryParams = req.user;
                queryParams.lv = lv;
                console.log(queryParams);
                app.render(req, res, '/control-panel', queryParams);
            }
        }
        else
        {
            res.redirect('/');
        }
    });
}