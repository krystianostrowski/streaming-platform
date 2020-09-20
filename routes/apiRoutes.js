const mediaAPI = require('../API/mediaAPI');
const fs = require('fs');

module.exports = function(server, app) {
    server.get('/api/media', (req, res) => {
        const media = mediaAPI.GetAll();
        res.send(media);
    });

    server.get('/api/media/:type', (req, res) => {
        const results = mediaAPI.GetMediaByType(req.params.type);
        res.send(results);
    });

    server.get('/player/:id', (req, res) => {
        if(!req.isAuthenticated())
            res.redirect('/');

        const page = '/player';
        const media = mediaAPI.SearchByID(req.params.id);

        if(media)
        {
            if(!media.released)
                res.redirect('/browse');

            const queryParams = media;
            queryParams.user = req.user;
            app.render(req, res, page, queryParams);
        } 
        else
        {
            res.redirect('/browse');
        }
    });

    server.get('/play/:id', (req, res) => {
        if(!req.isAuthenticated())
            res.redirect('/');

        const media = mediaAPI.SearchByID(req.params.id);

        if(media)
        {
            const path = `./media/${media.fileName}`;
            const stat = fs.statSync(path);
            const fileSize = stat.size;
            const range = req.headers.range;
            let type = null;

            switch(media.type)
            {
                case 'music':
                    type = 'audio/mpeg'
                    break;

                case 'video':
                    type = 'video/mp4'
                    break;
            }

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
                    'Content-Type': type,
                }
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
                res.redirect('/player/' + req.params.id);
            }
        }
    });
}

