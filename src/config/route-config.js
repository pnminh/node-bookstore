// export a function that initializes all our routes.

module.exports = {
    init(app){
     
      const bookRoutes = require("../routes/books");
      const userRoutes = require("../routes/users"); 
      app.use('/api',bookRoutes,userRoutes);
    }

    
  }

