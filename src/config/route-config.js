// export a function that initializes all our routes.

module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const topicRoutes = require("../routes/books");

      app.use(staticRoutes);
      app.use(topicRoutes);
      
    }

    
  }

