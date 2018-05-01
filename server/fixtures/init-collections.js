const { dropCollection } = require("./general");

exports.init = async function () {
	try {
		await dropCollection("users");
		return Promise.resolve();
	} catch (error) {
		console.log("[error] clean db", error);
	}
}
