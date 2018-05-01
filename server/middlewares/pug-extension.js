const { convertFromGMTToAsiaShanghai } = require("ljit-lib/moment-utils");

module.exports = function pugExtension(req, res, next) {
	res.locals.NAVIGATION = require("../../client/templates/navigation");
	res.locals.__pug_ext = {
		getFormattedDate: function (date) {
			return convertFromGMTToAsiaShanghai(date);
		},
	};
	next();
};
