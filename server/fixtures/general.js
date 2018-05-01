const mongoose = require("mongoose");

exports.dropCollection = function (collection) {
	return new Promise((resolve, reject) => {
		mongoose.connection.db.listCollections({name: collection})
		.next(function(err, collinfo) {
			if (collinfo) {
				console.log(`[info][dropping] collection '${collection}'`);
				mongoose.connection.db.dropCollection(collection, function(error, result) {
					if (error) {
						reject(error);
						return;
					}
					console.log(`[info][dropped]  collection '${collection}'`);
					resolve();
				});
			} else {
				console.log(`[info][skipped]  collection '${collection}'`);
				resolve();
			}
		});
	});
};

exports.ensureIndexes = async function (model, collection) {
	console.log(`[info][indexing] collection '${collection}'`);
	await model.ensureIndexes();
	console.log(`[info][indexed]  collection '${collection}'`);
};
