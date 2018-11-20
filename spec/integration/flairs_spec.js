const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;


describe("routes: flairs", () => {

  beforeEach((done) => {
    this.topic;
    this.flair;
    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "The winter games",
        description: "are great to play"
      }).
      then((topic) => {
        this.topic = topic;
        Flair.create({
          name: "Flair One",
          color: "Blue",
          topicId: this.topic.id
        }).
      then((flair) => {
        this.flair = flair;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
      });
    });
  });



  describe("GET /topics/:id/flairs/new", () => {

    it("should render a new flair form", (done) => {
      request.get(`${base}/${this.topic.id}/flairs/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Flair");
        done();
      });
    });

  });

  describe("POST /topics/:id/flairs/create", () => {

    it("should create and store a new flair", (done) => {
      const options = {
        url: `${base}/${this.topic.id}/flairs/create`,
        form: {
          name: "Hello World",
          color: "yellow"
        }
      };
      request.post(options, (err, res, body) => {
        Flair.findOne({
          where: {name: "Hello World"}
        })
        .then((flair) => {
          expect(flair).not.toBeNull();
          expect(flair.name).toBe("Hello World");
          expect(flair.color).toBe("yellow");
          expect(flair.topicId).not.toBeNull();
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });


  describe("GET /topics/:id/flairs/:id", () => {

    it("should render a view with the selected flair", (done) => {
      request.get(`${base}/${this.topic.id}/flairs/${this.flair.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Flair One");
        done();
      });
    });
  });


  describe("POST /topics/:topicId/flairs/:id/destroy", () => {

    it("should delete the flair with the associated ID", (done) => {
      expect(this.flair.id).toBe(1);
      let url = `${base}/${this.topic.id}/flairs/${this.flair.id}/destroy`;
      request.post(url, (err, res, body) => {
        Flair.findById(1)
        .then((flair) => {
          expect(err).toBeNull();
          expect(flair).toBeNull();
          done();
        });
      });
    });
  });


  describe("GET /topics/:topicId/flairs/:id/edit", () => {

    it("should render an edit form for the aassociated flair", (done) => {
      let url = `${base}/${this.topic.id}/flairs/${this.flair.id}/edit`;
      request.get(url, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Flair");
        expect(body).toContain("Flair One");
        done();
      });
    });
  });


  describe("POST /topics/:topicId/flairs/:id/update", () => {

    it("should update the selected flair", (done) => {
      let options = {
        url: `${base}/${this.topic.id}/flairs/${this.flair.id}/update`,
        form: {
          name: "Good Bye",
          color: "green"
        }
      };
      Flair.findOne({
        where: {name: "Flair One"}
      })
      .then((flair) => {
        expect(flair.name).toBe("Flair One");
        request.post(options, (err, res, body) => {
          expect(err).toBeNull();
          Flair.findOne({
            where: {id: this.flair.id}
          })
          .then((flair) => {
            expect(err).toBeNull();
            expect(flair.name).toBe("Good Bye");
            expect(flair.color).toBe("green");
            done();
          });
        });
      });
    });
  });




});