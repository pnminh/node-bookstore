const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");

//router.get("/fake-books",bookController.fakeBook)

router.get("/books", bookController.index);

module.exports = router;





