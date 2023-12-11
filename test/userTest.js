const chai = require('chai');
const app = require('../app');
let chaiHttp = require('chai-http');
const pgPool = require('../postgre/connection');


chai.use(chaiHttp);
const expect = chai.expect;

beforeEach(async () => {
    server = app.listen(3002);
  });
  
  afterEach(async () => {
    server.close();
  });


describe('User Routes', () => {
  describe('POST /register', () => {
    it('should register a new user', async () => {
        const res = await chai
        .request(app)
        .post('/user/register')
        .send({
          username: 'rrrr',
          fname: 'Test',
          lname: 'User',
          email: 'test@example.com',
          password: 'testpassword',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('jwtToken');
    });
  });


  describe('POST /login', () => {
    it('should log in a user', async () => {
        const res = await chai
        .request(app)
        .post('/user/login')
        .send({
          username: 'testuser',
          password: 'testpassword',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('jwtToken');
    });
  });
});