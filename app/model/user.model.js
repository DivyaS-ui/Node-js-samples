module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
	//   uuid: {
	// 	type: Sequelize.UUID,
	// 	defaultValue: Sequelize.UUIDV1,
	// 	primaryKey: true
	//   },
	  name: {
		  type: Sequelize.STRING
	  },
	  city:{
		  type: Sequelize.STRING
	  },
	  street: {
		  type: Sequelize.STRING
	  },
	  phone: {
		  type: Sequelize.STRING
	  }
	});

	return User;
}