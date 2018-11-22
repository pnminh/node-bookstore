const User = require("./models").User;
const bcrypt = require("bcryptjs");

module.exports = {
// createUser takes object with email, password, passwordConfirmation properties, and a callback.
      createUser(newUser, callback){
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);
    
    // #4
        return User.create({
          email: newUser.email,
          password: hashedPassword
        })
        .then((user) => {
          callback(null, user);
        })
        .catch((err) => {
          callback(err);
        })
      }
    
    }