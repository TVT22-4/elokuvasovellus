const pgPool = require('./connection');

const sql ={
    CREATE_GROUP: 'INSERT INTO groups (groupname, description) VALUES ($1, $2)',
    GET_USERS: 'SELECT users.username FROM users JOIN groups_user ON users.username = groups_user.username WHERE groups_user.idgroup = $1',
    GET_GROUPS: 'SELECT groupname FROM groups',
    GET_GROUP: 'SELECT * FROM groups WHERE idgroup = $1',
    DELETE_GROUP: 'DELETE FROM groups where idgroup = $1',
    ADD_USER: 'INSERT INTO group_users (username, idgroup) VALUES ($1, $2)',
    DELETE_USER: 'DELETE FROM group_users WHERE username = $1',
    
};

async function createGroup(groupname,description){
    await pgPool.query(sql.CREATE_GROUP, [groupname,description]);
}

async function getUsers(idGroup){
    const result = await pgPool.query(sql.GET_USERS, [idGroup]);
    const rows = result.rows;
    return rows;
}

async function getGroups(){
    const result = await pgPool.query(sql.GET_GROUPS);
    const rows = result.rows;
    return rows;
}

async function getGroup(idGroup){
    const result = await pgPool.query(sql.GET_GROUP, [idGroup]);
    const rows = result.rows;
    return rows;
}

async function deleteGroups(idGroup) {
    await pgPool.query(sql.DELETE_GROUP, [idGroup]);
}

async function addUser(username,idGroup) {
    await pgPool.query(sql.ADD_USER, [username,idGroup]);
}

async function deleteUser(username) {
    await pgPool.query(sql.DELETE_USER, [username]);
}



module.exports = {createGroup, getUsers, getGroups, getGroup, deleteGroups, addUser, deleteUser};