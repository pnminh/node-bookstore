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


    
    // describe("GET /", () => {
    //     it("should return a status code 200 and json data of all books", (done) => {
    //         request.get(base, (err, res, body) => {
    //             expect(res.statusCode).toBe(200);
    //             expect(err).toBeNull();
    //             expect(body).not.toBeNull();
    //             let books = JSON.parse(body);
    //             expect (books.length).toBe(1);
    //             expect(books[0].title).toBe("Harry Potter");
    //             let total = +res.headers[totalHeader];
    //             expect(total).toBe(1);
    //             done();
    //         });
    //     });
    // });

    // describe("admin user performing CRUD actions for Topic", () => {

    //     beforeEach((done) => {
    //       User.create({
    //         email: "admin@example.com",
    //         password: "123456",
    //         role: "admin"
    //       })
    //       .then((user) => {
    //         request.get({         // mock authentication
    //           url: "http://localhost:3000/auth/fake",
    //           form: {
    //             role: user.role,     // mock authenticate as admin user
    //             userId: user.id,
    //             email: user.email
    //           }
    //         },
    //           (err, res, body) => {
    //             done();
    //           }
    //         );
    //       });
    //     });
    
    //     describe("GET /books", () => {    
    //       it("should respond with all books", (done) => {
    //         request.get(base, (err, res, body) => {
    //           expect(err).toBeNull();
    //           expect(body).toContain("Books");
    //           expect(body).toContain("Harry Potter");
    //           done();
    //         });
    //       });   
    //     });
    
    //     describe("GET /books/new", () => {
    
    //       it("should render a view with a new book form", (done) => {
    //         request.get(`${base}new`, (err, res, body) => {
    //           expect(err).toBeNull();
    //           expect(body).toContain("New Book");
    //           done();
    //         });
    //       });  
    //     });
    
    //     describe("POST /books/create", () => {
    //       const options = {
    //         url: `${base}create`,
    //         form: {
    //             title: "Harry Potter",
    //             description: "The war against Voldemort is not going well",
    //             authors: "Rowling",
    //             price: 9
    //         }
    //       };
    
    //       it("should create a new book and redirect", (done) => {
    //         request.post(options,
    //           (err, res, body) => {
    //             Book.findOne({where: {title: "Harry Potter"}})
    //             .then((book) => {
    //               expect(book.title).toBe("Harry Potter");
    //               expect(book.description).toBe("The war against Voldemort is not going well");
    //               done();
    //             })
    //             .catch((err) => {
    //               console.log(err);
    //               done();
    //             });
    //           });
    //       });
    //     });
    
    //     describe("GET /books/:id", () => {
    
    //       it("should render a view with the selected books", (done) => {
    //         request.get(`${base}${this.book.id}`, (err, res, body) => {
    //           expect(err).toBeNull();
    //           expect(body).toContain("Harry Potter");
    //           done();
    //         });
    //       });
    
    //     });
    
    //     describe("POST /books/:id/destroy", () => { 
    //       it("should delete the book with the associated ID", (done) => {
    //         Book.all()
    //         .then((books) => {
    //           const bookCountBeforeDelete = books.length;
    
    //           expect(bookCountBeforeDelete).toBe(1);
    
    //           request.post(`${base}${this.book.id}/destroy`, (err, res, body) => {
    //             Book.all()
    //             .then((books) => {
    //               expect(err).toBeNull();
    //               expect(books.length).toBe(bookCountBeforeDelete - 1);
    //               done();
    //             })   
    //           });
    //         })    
    //       });   
    //     });
    
    //     describe("GET /books/:id/edit", () => {
    
    //       it("should render a view with an edit books form", (done) => {
    //         request.get(`${base}${this.book.id}/edit`, (err, res, body) => {
    //           expect(err).toBeNull();
    //           expect(body).toContain("Edit Book");
    //           expect(body).toContain("Harry Potter");
    //           done();
    //         });
    //       });  
    //     });
    
    //     describe("POST /books/:id/update", () => {
    
    //       it("should update the books with the given values", (done) => {
    //         request.post({
    //           url: `${base}${this.book.id}/update`,
    //           form: {
    //             title: "Harry Potter 1",
    //             description: "The war against Voldemort is not going well",
    //             authors: "Rowling",
    //             price: 9
    //           }
    //         }, (err, res, body) => {
    //           expect(err).toBeNull();
    //           Book.findOne({
    //             where: {id:1}
    //           })
    //           .then((book) => {
    //             expect(book.title).toBe("Harry Potter 1"); 
    //             done();
    //           });
    //         });
    //       });
    //     });  
    //   }); 

})

