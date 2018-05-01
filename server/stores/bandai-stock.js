const {
	create,
	remove,
	find,
	findOne,
	findOneAndUpdate
} = require("../models/bandai-stock");

function createBandaiStock(attributes) {
	return create(attributes);
}
function updateBandaiStockById(_id, attributes) {
	return findOneAndUpdate({_id}, {
		$set: attributes
	}, {
		new: true
	});
}
function removeBandaiStockById(_id) {
	return remove({_id});
}

function getAllBandaiStocks() {
	return find();
}
function getBandaiStockById(_id) {
	return findOne({
		_id
	});
}

module.exports = {
	createBandaiStock,
	updateBandaiStockById,
	removeBandaiStockById,

	getAllBandaiStocks,
	getBandaiStockById,
};
