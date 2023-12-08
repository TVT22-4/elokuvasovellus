const pgPool = require('./connection');

const sql ={
    INSERT_USER: 'INSERT INTO users VALUES ($1, $2, $3, $4, $5)',
    GET_PASSWORD: 'SELECT password FROM users WHERE username=$1',
    GET_USERS: 'SELECT username,fname,lname,email FROM users',
    GET_USER: 'SELECT username,fname,lname,email FROM users WHERE username = $1',
    DELETE_USERS: 'DELETE FROM users where username = $1',
    GET_GROUPS_WHERE_USER_BELONGS: 'SELECT groups.idgroup, groups.groupname FROM groups JOIN group_users ON groups.idgroup = group_users.idgroup WHERE group_users.username = $1'
};

async function createUser(username,fname,lname,email,password){
    await pgPool.query(sql.INSERT_USER, [username,fname,lname,email,password]);
}

async function checkUsername(username){
    const result = await pgPool.query(sql.GET_PASSWORD, [username]);

    if(result.rows.length > 0){
        return result.rows[0].password;
    }else{
        return null;
    }
}

async function getUsers(){
    const result = await pgPool.query(sql.GET_USERS);
    const rows = result.rows;
    return rows;
}

async function getUser(username){
    const result = await pgPool.query(sql.GET_USER, [username]);
    const rows = result.rows;
    return rows;
}

async function deleteUsers(usernameToDelete) {
    await pgPool.query(sql.DELETE_USERS, [usernameToDelete]);
}

async function getUsersGroups(username){
    const result = await pgPool.query(sql.GET_GROUPS_WHERE_USER_BELONGS, [username]);
    const rows = result.rows;
    return rows;
}


module.exports = {createUser, checkUsername, getUsers, getUser, deleteUsers, getUsersGroups};