//create a group of functions to export that will validate a given resource. (POST)

module.exports = {
    validatePosts(req, res, next) {
      if(req.method === "POST") { //method used was POST
        req.checkParams("topicId", "must be valid").notEmpty().isInt();
        req.checkBody("title", "must be at least 2 characters in length").isLength({min: 2});
        req.checkBody("body", "must be at least 10 characters in length").isLength({min: 10});
      }
  //express "flash" module loads messages by using "req.flash"
      const errors = req.validationErrors();
      if (errors) {
        req.flash("error", errors);
        return res.redirect(303, req.headers.referer)
      } else {
        return next();
      }
    }
  }