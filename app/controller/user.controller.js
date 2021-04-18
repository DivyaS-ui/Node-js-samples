const db = require('../config/db.config.js');
const User = db.user;
const Order = db.order;
const Op = db.Sequelize.Op;
 
// Init data: Users & Orders
// exports.init = (req, res) => {	
	
	
// 	User.create({ 
// 		name: 'Divya', 
// 		city: 'Chennai',
// 		street: 'Cupertino, CA 95014', 
// 		phone: '1-408-996-1010',
// 	// 	orders: [
			
// 	// 		{
// 	// 			itemCode: "A-123",
// 	// 			itemName: "Iphone7",
// 	// 			quantity: "10"
// 	// 		},
// 	// 		// IPadPro
// 	// 		{
// 	// 			itemCode: "A-456",
// 	// 			itemName: "IPadPro",
// 	// 			quantity: "10"
// 	// 		}
// 	// 	]
// 	// }, {
// 	// 	include: [ Order ]
// 	// }
// 	}).then(() => {		
	
// 		console.log("-----------> User - Divya is created");
		
		
// 		User.create({ 
// 			name: 'Swetha', 
// 			city: 'Chennai',
// 			street: 'Seocho District, Seoul, South Korea', 
// 			phone: '+82-2-2053-3000',
// 		// 	orders: [
				 
// 		// 		{
// 		// 			itemCode: "S-012",
// 		// 			itemName: "GalaxyJ7",
// 		// 			quantity: "20"
// 		// 		},
				
// 		// 		{
// 		// 			itemCode: "S-456",
// 		// 			itemName: "GalaxyTabA",
// 		// 			quantity: "20"
// 		// 		}
// 		// 	]
// 		// }, {
// 		// 	include: [ Order ]
// 		// }
// 		}).then(() => {		
// 			console.log("-----------> User - Swetha is created");
// 		})
// 	}).then(() => {
// 		res.send("Done!");
// 	})
// };

// Fetch all Users include Orders
// exports.findAll = (req, res) => {
// 	User.findAll({
// 		attributes: [['uuid', 'userId'], 'name', 'city', 'street', 'phone'],
// 		include: [{
// 			model: Order,
// 			where: { fk_userid: db.Sequelize.col('user.uuid') },
// 			attributes: ['itemCode', 'itemName', 'quantity']
// 		}]
// 	}).then(users => {
// 	   res.send(users);
// 	});
// };

// exports.findAll = (req, res) => {
//     User.findAll({
//         attributes: [['uuid', 'userId'], 'name', 'city', 'street', 'phone'],
//         // include: [{
//         //     model: Order,
//         //     where: { fk_userid: db.Sequelize.col('user.uuid') },
//         //     attributes: ['itemCode', 'itemName', 'quantity']
//         // }]
//     }).then(users => {
//        res.send(users);
//     });
// };

exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
	  res.status(400).send({
		message: "Content can not be empty!"
	  });
	  return;
	}
  
	// Create a User
	const user = {
	  name: req.body.name,
	  city: req.body.city,
	  street: req.body.street,
	  phone: req.body.phone
	};
  
	// Save User in the database
	User.create(user)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Find a single User with a userId
exports.findOne = (req, res) => {
	const id = req.params.id;
  
	User.findByPk(id)
	  .then(data => {
		res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Error retrieving User with id=" + id
		});
	  });
  };

//   exports.findAll = (req, res) => {
// 	const name = req.query.name;
// 	var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
// 	Tutorial.findAll({ where: condition })
// 	  .then(data => {
// 		res.send(data);
// 	  })
// 	  .catch(err => {
// 		res.status(500).send({
// 		  message:
// 			err.message || "Some error occurred while retrieving tutorials."
// 		});
// 	  });
//   };

exports.findAll = (req, res) => {
	    User.findAll({
	        attributes: [['id', 'userId'], 'name', 'city', 'street', 'phone'],
	    }).then(users => {
	       res.send(users);
	    });
	};
  
  exports.update = (req, res) => {
	const id = req.params.id;
  
	User.update(req.body, {
	  where: { id: id }
	})
	  .then(num => {
		if (num == 1) {
		  res.send({
			message: "User was updated successfully."
		  });
		} else {
		  res.send({
			message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Error updating User with id=" + id
		});
	  });
  };

  exports.delete = (req, res) => {
	const id = req.params.id;
  
	User.destroy({
	  where: { id: id }
	})
	  .then(num => {
		if (num == 1) {
		  res.send({
			message: "User was deleted successfully!"
		  });
		} else {
		  res.send({
			message: `Cannot delete User with id=${id}. Maybe User was not found!`
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Could not delete User with id=" + id
		});
	  });
  };

  exports.deleteAll = (req, res) => {
	User.destroy({
	  where: {},
	  truncate: false
	})
	  .then(nums => {
		res.send({ message: `${nums} Users were deleted successfully!` });
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while removing all users."
		});
	  });
  };

