// export a function that initializes all our routes.

module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const bookRoutes = require("../routes/books");

      app.use(staticRoutes);
      app.use(bookRoutes);
      
    }

    
  }

