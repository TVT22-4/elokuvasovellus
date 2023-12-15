const pgPool = require('./connection');

const sql ={
    CREATE_GROUP: 'INSERT INTO groups (groupname, description, creator_username) VALUES ($1, $2 , $3) RETURNING idgroup',
    GET_USERS: 'SELECT users.username FROM users JOIN group_users ON users.username = group_users.username WHERE group_users.idgroup = $1',
    GET_GROUPS: 'SELECT idgroup, groupname, description FROM groups',
    GET_GROUP: 'SELECT * FROM groups WHERE idgroup = $1',
    DELETE_GROUP: 'DELETE FROM groups where idgroup = $1',
    ADD_USER: 'INSERT INTO group_users (username, idgroup) VALUES ($1, $2)',
    DELETE_USER: 'DELETE FROM group_users WHERE username = $1 AND idgroup = $2 AND EXISTS (SELECT 1 FROM groups WHERE idgroup = $2 AND creator_username = $3)',
    ADD_NEWS: 'INSERT INTO group_page (idgroup, title, publishdate) VALUES ($1, $2, $3)',
    GET_NEWS: 'SELECT idgroup, title, publishdate FROM group_page WHERE idgroup = $1',
    DELETE_NEWS: 'DELETE FROM group_page where materialid = $1',
    CREATE_JOIN_REQUEST: 'INSERT INTO join_requests (idgroup, username) VALUES ($1, $2)',
    GET_JOIN_REQUESTS: 'SELECT * FROM join_requests WHERE idgroup = $1',
    ACCEPT_JOIN_REQUEST: 'INSERT INTO group_users (username, idgroup) VALUES ($1, $2)',
    DELETE_JOIN_REQUEST: 'DELETE FROM join_requests WHERE id = $1'
    
};

async function createGroup(groupname, description, username) {
    const result = await pgPool.query(sql.CREATE_GROUP, [groupname, description, username]);
    const createdGroup = result.rows[0];
    await pgPool.query(sql.ADD_USER, [username, createdGroup.idgroup])
    return createdGroup;
  }
  

async function getUsers(idGroup){
    const result = await pgPool.query(sql.GET_USERS, [idGroup]);
    const rows = result.rows;
    return rows;
}

async function getGroups(){
    const result = await pgPool.query(sql.GET_GROUPS);
    const rows = result.rows;
    return rows.map(groups => ({
    idGroup: groups.idgroup,
    groupname: groups.groupname,
    description: groups.description,
  }));
}

async function getGroup(idGroup){
    const result = await pgPool.query(sql.GET_GROUP, [idGroup]);
    const rows = result.rows;
    return rows;
}

async function deleteGroups(idGroup) {
    await pgPool.query(sql.DELETE_GROUP, [idGroup]);
}

async function addUser(username, idGroup, creator_username) {
    const isCreator = await isGroupCreator(idGroup, creator_username);
    if (!isCreator) {
        throw new Error('You are not authorized to add users to this group.');
    }

    await pgPool.query(sql.ADD_USER, [username, idGroup]);
}

async function isGroupCreator(idGroup, creator_username) {
    const result = await pgPool.query('SELECT 1 FROM groups WHERE idgroup = $1 AND creator_username = $2', [idGroup, creator_username]);
    return result.rows.length > 0;
}

async function deleteUser(username, idGroup, creator_username) {
  const isCreator = await isGroupCreator(idGroup, creator_username);
  if (!isCreator) {
    throw new Error('You are not authorized to delete users from this group.');
  }
  await pgPool.query(sql.DELETE_USER, [username, idGroup, creator_username]);
}
  
async function addNews(idGroup, title, publishDate) {
    await pgPool.query(sql.ADD_NEWS, [idGroup, title, publishDate]);
}

async function getNews(idGroup){
    const result = await pgPool.query(sql.GET_NEWS, [idGroup]);
    const rows = result.rows;
    return rows;
}

async function deleteNews(materialID) {
    await pgPool.query(sql.DELETE_NEWS, [materialID]);
}

async function createJoinRequest(idGroup, username) {
    const result = await pgPool.query(sql.CREATE_JOIN_REQUEST, [idGroup, username]);
    return result.rows[0];
}

async function getJoinRequests(idGroup) {
  const result = await pgPool.query(sql.GET_JOIN_REQUESTS, [idGroup]);
  const rows = result.rows;
  return rows;
}

async function acceptJoinRequest(idGroup, requestId) {
  try {
    const request = await pgPool.query('SELECT * FROM join_requests WHERE id = $1', [requestId]);
    if (request.rows.length > 0) {
      const username = request.rows[0].username;
      await pgPool.query(sql.ADD_USER, [username, idGroup]);
    } else {
      console.error('Join request not found.');
    }
  } catch (error) {
    console.error('Error accepting join request:', error.message);
    throw error;
  }
}

async function deleteJoinRequest(requestId) {
    await pgPool.query(sql.DELETE_JOIN_REQUEST, [requestId]);
}

async function isGroupMember(idGroup, username) {
  try {
      const result = await pgPool.query('SELECT 1 FROM group_users WHERE idgroup = $1 AND username = $2', [idGroup, username]);
      return result.rows.length > 0;
    } catch (error) {
      console.error('Error checking group membership:', error.message);
      throw error;
    }
  }
 
async function isGroupOwner(idGroup, username) {
  try {
      const result = await pgPool.query('SELECT 1 FROM groups WHERE idgroup = $1 AND creator_username = $2', [idGroup, username]);
      return result.rows.length > 0;
    } catch (error) {
      console.error('Error checking group ownership:', error.message);
      throw error;
    }
}

module.exports = {createGroup, getUsers, getGroups, getGroup, deleteGroups, addUser, deleteUser, addNews, getNews, deleteNews, createJoinRequest, getJoinRequests, acceptJoinRequest, deleteJoinRequest, isGroupMember, isGroupOwner};