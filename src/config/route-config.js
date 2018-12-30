// export a function that initializes all our routes.

module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const bookRoutes = require("../routes/books");
      const userRoutes = require("../routes/users");
      app.use(staticRoutes);
      app.use(bookRoutes);
      app.use(userRoutes);
    }

    
  }

