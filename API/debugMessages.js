const LogTypes = {
    Log: 'log',
    Error: 'error',
    Warning: 'warning'
}; 

const Colors = {
    Default: '\x1b[0m',
    Green: '\x1b[32m',
    Red: '\x1b[31m',
    Yellow: '\x1b[33m'
}

const Time = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    month = (month < 10) ? "0" + month : month;
    hour = (hour < 10) ? "0" + hour : hour;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;

    return `${day}.${month}.${year} ${hour}:${min}:${sec}`;
};

const Log = (message, LogType = LogTypes.Log) => {
    
    let color = Colors.Default;

    switch(LogType)
    {
        case LogTypes.Log:
            color = Colors.Green;
            break;

        case LogTypes.Warning:
            color = Colors.Yellow;
            break;

        case LogTypes.Error:
            color = Colors.Error
            break;
    }


    console.log(`${color}${Time()} [${LogType.toUpperCase()}] ${message}${Colors.Default}`);
};

module.exports = {
    LogTypes: LogTypes,
    Log: Log
}