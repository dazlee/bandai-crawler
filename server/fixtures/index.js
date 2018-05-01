const mongoose = require("mongoose");

const initCollections = require("./init-collections");
const fixtureUsers = require("./fixture-users");

async function connectToDB() {
	const config = require("../config").get();
	mongoose.Promise = global.Promise;

	return new Promise((resolve, reject) => {
		mongoose.connect(config.mongoURL, {useMongoClient: true, config: { autoIndex: false }}, (error) => {
			if (error) {
				console.log("error to connect to mongoose db", error);
				reject();
				return;
			}
			console.log("successfully connect to db", config.mongoURL);
			resolve();
		});
	});
}

exports.init = async function () {
	try {
		await connectToDB();
		await initCollections.init();
		var promises = [
			fixtureUsers.init()];
		return Promise.all(promises);
	} catch (e) {
		console.log("[error] trying to create fixtures ", e);
	}
};
