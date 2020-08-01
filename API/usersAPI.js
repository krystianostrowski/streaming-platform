const fs = require('fs');
const Permissions = require('./userPermission');

const usersDBPath = './db/users.json';

const GetData = () => {
    let json = fs.readFileSync(usersDBPath, (err, data) => {
        if(err)
            console.log(err.message);

        return data;
    });

    json = JSON.parse(json);

    return json;
};

const SearchUserByName = name => {
    const users = GetData();

    for(let user of users)
    {
        if(user.login.toLowerCase() == name.toLowerCase())
        {
            const userData = {
                id: user.id,
                login: user.login,
                lv: user.permission
            };
            
            return userData;
        }
    }
};

const SearchUserByID = id => {
    const users = GetData();

    for(let user of users)
    {
        if(user.id == id)
        {
            const userData = {
                id: user.id,
                login: user.login,
            };
            
            return userData;
        }
    }
};

const VerifyPassword = (userID, password) => {
    const users = GetData();

    for(let user of users)
    {
        if(user.id == userID)
        {
            if(user.password == password)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
};

const AssignID = () => {

};

const IsLoginAvailable = login => {
    return false;
};

const AddUser = user => {

};

const RemoveUser = id => {

};

const GetPermissionLvl = id => {

};

const SetPermissionLvl = id => {

};

module.exports = {
    GetData,
    SearchUserByName,
    SearchUserByID,
    VerifyPassword
} 
    