const pgPool = require('./connections');

const sql = {
    INSERT_REVIEW: 'INSERT INTO review (username, revtext, rating, targetid) VALUES ($1, $2, $3, $4)',
    GET_REVIEWS: 'SELECT username, revtext, rating FROM review'
}

async function addReview(username, revtext, rating, targetid){
    await pgPool.query(sql.INSERT_REVIEW, [username, revtext, rating, targetid]);
};

async function getReviews(){
    const result = await pgPool.query(sql.GET_REVIEWS);
    const rows = result.rows;
    return rows;
};

//getreview id:n mukaan  + delete

module.exports = {addReview, getReviews};