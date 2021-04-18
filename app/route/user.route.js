module.exports = function(app) {
 
    const users = require('../controller/user.controller.js');

  // Create a new User
  app.post("/user/add", users.create);

  // Retrieve all Users
   app.get("/users/all", users.findAll);

  // Retrieve a single User with id
  app.get("/user/find/:id", users.findOne);

  // Update a User with id
  app.put("/user/modify/:id", users.update);

  // Delete a User with id
  app.delete("/user/delete/:id", users.delete);

  // Delete all Users
  app.delete("/user/d-all/", users.deleteAll);

}