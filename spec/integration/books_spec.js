const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/books/";

const sequelize = require("../../src/db/models/index").sequelize;
const Book = require("../../src/db/models").Book;
const totalHeader = 'x-total-count';

describe("routes: books", () => {
    beforeEach((done) => {
        this.book;
        sequelize.sync({force: true}).then((res) => {

            Book.create({
                title: "Harry Potter",
                description: "The war against Voldemort is not going well",
                authors: "Rowling",
                price: 9
            })
            .then((book) => {
                this.book = book;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    })

    describe("GET /", () => {
        it("should return a status code 200 and json data of all books", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).not.toBeNull();
                let books = JSON.parse(body);
                expect (books.length).toBe(1);
                expect(books[0].title).toBe("Harry Potter");
                let total = +res.headers[totalHeader];
                expect(total).toBe(1);
                done();
            });
        });
    });


})