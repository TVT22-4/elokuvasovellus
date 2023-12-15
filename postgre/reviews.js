
const pgPool = require('./connection');

const sql = {
    INSERT_REVIEW: 'INSERT INTO review (username, revtext, rating, targetid) VALUES ($1, $2, $3, $4)',
    GET_REVIEWS: 'SELECT username, revtext, rating, targetid, idreview FROM review',
    GET_REVIEW: 'SELECT username, revtext, rating FROM review WHERE idreview = $1',
    DELETE_REVIEW: 'DELETE FROM review WHERE idreview = $1'
}

async function addReview(username, revtext, rating, targetid){
    await pgPool.query(sql.INSERT_REVIEW, [username, revtext, rating, targetid]);
};

async function getReviews(){
    const result = await pgPool.query(sql.GET_REVIEWS);
    const rows = result.rows;
    return rows;
};

async function getReview(idreview){
    const result2 = await pgPool.query(sql.GET_REVIEW, [idreview]);
    const rows2 = result2.rows;
    return rows2;
};

async function deleteReview(idreview){
    await pgPool.query(sql.DELETE_REVIEW, [idreview]);
};


module.exports = {addReview, getReviews, getReview, deleteReview};

const pgPool = require('./connections');

const sql = {
    INSERT_REVIEW: 'INSERT INTO review (username, revtext, rating, targetid) VALUES ($1, $2, $3, $4)',
    GET_REVIEWS: 'SELECT username, revtext, rating FROM review',
    GET_REVIEW: 'SELECT username, revtext, rating FROM review WHERE idreview = $1',
    DELETE_REVIEW: 'DELETE FROM review WHERE idreview = $1'
}

async function addReview(username, revtext, rating, targetid){
    await pgPool.query(sql.INSERT_REVIEW, [username, revtext, rating, targetid]);
};

async function getReviews(){
    const result = await pgPool.query(sql.GET_REVIEWS);
    const rows = result.rows;
    return rows;
};

async function getReview(idreview){
    const result2 = await pgPool.query(sql.GET_REVIEW, [idreview]);
    const rows2 = result2.rows;
    return rows2;
};

async function deleteReview(idreview){
    await pgPool.query(sql.DELETE_REVIEW, [idreview]);
};


module.exports = {addReview, getReviews, getReview, deleteReview};

