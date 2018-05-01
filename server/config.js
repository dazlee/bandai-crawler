const config = require("../config");
global.MODE = config.mode;

module.exports = {
	get: function () {
		return config[config.mode];
	}
};
