module.exports = (sequelize, Sequelize) => {
	const Order = sequelize.define('order', {
	  itemCode: {
		  type: Sequelize.STRING
	  },
	  itemName: {
		  type: Sequelize.STRING
	  },
	  quantity: {
		  type: Sequelize.STRING
	  }
	});
	
	return Order;
}