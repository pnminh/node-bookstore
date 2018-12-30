const request = require("request");
const server = require("../../src/server");
const PORT = process.env.PORT||3000;
const base = `http://localhost:${PORT}/users`;
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {

  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });


  describe("POST /users", () => {

        it("should create a new user with valid values and redirect", (done) => {
    
          const options = {
            url: base,
            //form: if submit form directly
            /* form: {
              email: "user@example.com",
              password: "123456789"
            } */
            //here we will use json body
            //https://stackoverflow.com/questions/16188137/how-should-i-pass-json-data-in-the-request-payload-of-http-post-request
            body: {
              email: "user@example.com",
              password: "123456789"
            },
            json: true,
          }
    
          request.post(options,
            (err, res, body) => {

              User.findOne({where: {email: "user@example.com"}})
              .then((user) => {
                expect(user).not.toBeNull();
                expect(user.email).toBe("user@example.com");
                expect(user.id).toBe(1);
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            });
        });
    
  
        it("should not create a new user with invalid attributes and redirect", (done) => {
          request.post(
            {
              url: base,
              body: {
                email: "no",
                password: "123456789"
              },
              json: true,
            },
            (err, res, body) => {
              expect(res.statusCode).toBe(400)
              expect(body.error).toBe("email must be valid");
              User.findOne({where: {email: "no"}})
              .then((user) => {
                expect(user).toBeNull();
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            });
        });  
      });
      

});