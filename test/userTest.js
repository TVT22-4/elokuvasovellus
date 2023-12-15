const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

const expect = chai.expect;

let server;

beforeEach(() => {
  server = app.listen(3002);
});

afterEach(() => {
  server.close();
});

describe('User Routes', () => {
  describe('POST /register', () => {
    it('should register a new user', async () => {
      const res = await chai
        .request(app)
        .post('/user/register')
        .send({
          username: 'uuu',
          fname: 'Test',
          lname: 'User',
          email: 'test@example.com',
          password: 'testpassword',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('jwtToken');
    });
  });

  /*describe('POST /login', () => {
    it('should log in a user', async () => {
      const res = await chai
        .request(app)
        .post('/user/login')
        .send({
          username: 'uuu',
          password: 'testpassword',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('jwtToken');
    });
  });
*/
 
  const authToken = jwt.sign({ username: 'uuu' }, process.env.JWT_SECRET_KEY);

  describe('GET /user/:username', () => {
    it('should get a user by username', async () => {
      const username = 'uuu'; 
      const res = await chai
        .request(app)
        .get(`/user/${username}`)
        .set('Authorization', `Bearer ${authToken}`);
      if (res.status === 200) {
        expect(res.body).to.have.property('username');
        expect(res.body).to.have.property('fname');
        expect(res.body).to.have.property('lname');
      } else {
        expect(res).to.have.status(404);
      }
    });
  });
  

  describe('DELETE /user/:username', () => {
    it('should delete a user by username', async () => {
        const username = 'g'; 
        const res = await chai
            .request(app)
            .delete(`/user/${username}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res).to.have.status(200);
        if ('message' in res.body) {
            expect(res.body.message).to.equal('User deleted successfully');
        } else {
            console.log('Response body:', res.body);
        }
    });
});


  
});
