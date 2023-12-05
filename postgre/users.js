const pgPool = require ('./connection');

const sql = {
    INSERT_USERS: 'INSERT INTO users (username, fname, lname, email, password) VALUES ($1, $2, $3, $4, $5)',
    GET_USERS: 'SELECT username, fname, lname, email FROM users',
    DELETE_USERS: 'DELETE FROM users where username =$1'
};

addUsers('jappe', 'Jasper', 'Paakkonen', 'jappe@gmail.com', 'jappe123');

async function addUsers( userName, fname, lname, email, password){
    await pgPool.query(sql.INSERT_USERS, [userName, fname, lname, email, password]);
}

async function getUsers(){
    const result = await pgPool.query(sql.GET_USERS);
    const rows = result.rows;
    return rows;
}

async function deleteUsers(usernameToDelete) {
    await pgPool.query(sql.DELETE_USERS, [usernameToDelete]);
}

module.exports = {addUsers, getUsers, deleteUsers};