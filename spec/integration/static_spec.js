const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3004/"; //correct port 3000 to 3004 to make the test pass


describe("routes: static", ()=> {

    describe("GET /", () => {
        it("should return status code 200", (done) => {
          request.get(base, (err, res, body) => {
            expect(res.statusCode).toBe(200);   
            done();
          });
        });
      });

    
})