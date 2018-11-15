const Topic = require("./models").Topic;

module.exports = {

//call from controller
  getAllTopics(callback){
    return Topic.all()

//Inside, it calls the callback method passed into getAllTopics with null and the topics that
// came from the database. 
    .then((topics) => {
      callback(null, topics);
    })
    .catch((err) => {
      callback(err);
    })
  }
}

