const fs = require('fs');
const { Log, LogTypes } = require('./debugMessages');

const mediaDBPath = './db/content.json';

const GetData = () => {
    let json = fs.readFileSync(mediaDBPath, (err, data) => {
        if(err)
            console.log(err.message);

        return data;
    });

    json = JSON.parse(json);

    return json;
};

const SaveData = data => {
    fs.writeFileSync(mediaDBPath, JSON.stringify(data, null, 2), err => {
        if(err)
        {
            return Log(err.message, LogTypes.Error);
        }
    });
};

const GetAll = () => {
    const result = [];
    const data = GetData();

    for(let d of data)
    {
        result.push(d);
    }

    return result;
};

const GetMediaByType = type => {
    const data = GetData();
    const result = [];

    for(let d of data)
    {
        if(d.type == type)
        {
            result.push(d);
        }
    }

    return result;
}

const SearchByID = id => {
    const data = GetData();
    let result;

    for(let d of data)
    {
        if(d.id == id)
            result = d;
    }

    return result;
};

const Release = () => {
    const data = GetData();

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;

    const dateString = `${date.getFullYear()}-${month}-${day}`
    const curretDate = new Date(dateString);

    for(media of data)
    {
        if(!media.released)
        {
            const releaseDate = new Date(media.releaseDate);

            if(releaseDate.getTime() <= curretDate.getTime())
            {
                const index = data.indexOf(media);
                data[index].released = true;
            }
        }
    }

    SaveData(data);
};

const Upload = () => {

};

module.exports = {
    GetAll,
    GetMediaByType,
    SearchByID,
    Release
}
