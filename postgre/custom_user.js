const pgPool = require ('./connection');

const sql = {
    INSERT_POST: 'INSERT INTO custom_user (username, posttype, targetid) VALUES ($1, $2, $3)',
    GET_POST:'SELECT username, posttype, targetid FROM custom_user ',
    GET_USER: 'SELECT username, posttype, targetid FROM custom_user WHERE materialid = $1',
    DELETE_POST: 'DELETE FROM custom_user WHERE materialid=$1'
    
};

//addPost('jappe', 'movie', '3');

async function addPost( userName, postType, targetId){
   await pgPool.query(sql.INSERT_POST, [userName, postType, targetId]);
}

async function getPost(){
    const result = await pgPool.query(sql.GET_POST);
    const rows =result.rows;
    return rows;
}

async function getUser(materialID) {
    const result = await pgPool.query(sql.GET_USER, [materialID]);
    const rows = result.rows;
    return rows;
}


async function deletePost(materialID) {
    await pgPool.query(sql.DELETE_POST, [materialID]);
}

module.exports = { addPost, getPost, deletePost, getUser };

