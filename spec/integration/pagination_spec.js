const request = require("request");
const server = require("../../src/server");
const PORT = process.env.PORT||3000;
const base = `http://localhost:${PORT}/books`;

const sequelize = require("../../src/db/models/index").sequelize;
const Book = require("../../src/db/models").Book;
const totalHeader = 'x-total-count'; //total items from database

describe("routes: pagination", () => {

    beforeEach((done) => {
        this.books = [];
        sequelize.sync({ force: true }).then((res) => {
            let seededBooks = [
                {
                    title: "Harry Potter trump",
                    description: "The war against Voldemort is not going well",
                    authors: "Rowling",
                    price: 9
                },
                {
                    title: "Trump: The Art of the Deal",
                    description: "Trump reveals the business secretser",
                    authors: "Donald Trump",
                    price: 8
                },
                {
                    title: "1776",
                    description: "In this masterful book",
                    authors: "David McCullough",
                    price: 10
                }
            ]
            Book.bulkCreate(seededBooks).then((bookData) => {
                this.books = bookData
                done();
            })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });


    describe("GET /", () => {

        it("should return empty array for page 0", (done) => {
            let url = base + `?_page=0&_limit=4`
            request.get(url, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).not.toBeNull();
                let bookResults = JSON.parse(body); //server sends string data so we need to convert it to JS object
                expect(bookResults.length).toBe(0);
                testTotalHeader(res,3);
                done();
            });
        });

        it("should return 1 item for page 1 limit 1", (done) => {
            let url = base + `?_page=1&_limit=1`
            request.get(url, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).not.toBeNull();
                let bookResults = JSON.parse(body);
                expect(bookResults.length).toBe(1);
                let bookResult = bookResults[0];
                expect(bookResult.title).toBe("Harry Potter trump");
                testTotalHeader(res,3);
                done();
            });
        });

        it("should return 1 item for page 2 limit 1", (done) => {
            let url = base + `?_page=2&_limit=1`
            request.get(url, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).not.toBeNull();
                let books = JSON.parse(body);
                expect(books.length).toBe(1);
                expect(books[0].title).toBe("Trump: The Art of the Deal");
                testTotalHeader(res,3);
                done();
            })
        });


        it("should return 3 items for page 1 limit 4", (done) => {
            let url = base + `?_page=1&_limit=4`
            request.get(url, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).not.toBeNull();
                let books = JSON.parse(body);
                expect(books.length).toBe(3);
                expect(books[0].title).toBe("Harry Potter trump");
                expect(books[1].title).toBe("Trump: The Art of the Deal");
                expect(books[2].title).toBe("1776");
                testTotalHeader(res,3);
                done();
            })
        });
    });

    describe("Search books", () => {
        it("should return 1 book based on title", (done) => {
            let searchedTitle = "Harry Potter"
            let url = base + `?_page=1&_limit=4&title_like=${searchedTitle}`;
            request.get(url, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                let books = JSON.parse(body);
                expect(books.length).toBe(1);
                expect(books[0].title).toContain(searchedTitle);
                testTotalHeader(res,1);
                done();
            })
        }),
        it("should return 0 book based on title", (done) => {
            let searchedTitle = "Harry Potter 1"
            let url = base + `?_page=1&_limit=4&title_like=${searchedTitle}`;
            request.get(url, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                let books = JSON.parse(body);
                expect(books.length).toBe(0);
                testTotalHeader(res,0);
                done();
            })
        })
        ,
        it("should return 2 books based on title", (done) => {
            let searchedTitle = "trump"
            let url = base + `?_page=1&_limit=4&title_like=${searchedTitle}`;
            request.get(url, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                let books = JSON.parse(body);
                expect(books.length).toBe(2);
                testTotalHeader(res,2);
                done();
            })
        }),
        it("should return 1 books based on title", (done) => {
            let searchedTitle = "trump"
            let url = base + `?_page=1&_limit=1&title_like=${searchedTitle}`;
            request.get(url, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                let books = JSON.parse(body);
                expect(books.length).toBe(1);
                testTotalHeader(res,2);
                done();
            })
        })
    })



})
//pagination needs totalHeader = 'x-total-count' data (in this case total = 3)
function testTotalHeader(res,expectedTotal) {
    let total = +res.headers[totalHeader];
    expect(total).toBe(expectedTotal);
}