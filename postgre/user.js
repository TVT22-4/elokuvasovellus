const pgPool = require('./connection');

const sql ={
    INSERT_USER: 'INSERT INTO users VALUES ($1, $2, $3, $4, $5)',
    GET_USERS: 'SELECT username,fname,lname,email FROM users',
    DELETE_USERS: 'DELETE FROM users where username = $1'
};

async function createUser(username,fname,lname,email,password){
    await pgPool.query(sql.INSERT_USER, [username,fname,lname,email,password]);
}

async function getUsers(){
    const result = await pgPool.query(sql.GET_USERS);
    const rows = result.rows;
    return rows;
}

async function deleteUsers(usernameToDelete) {
    await pgPool.query(sql.DELETE_USERS, [usernameToDelete]);
}

module.exports = {createUser, getUsers, deleteUsers};