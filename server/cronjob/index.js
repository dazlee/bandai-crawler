const cron = require("node-cron");

let _emitter, _config;
exports.init = function (emitter, config) {
	_emitter = emitter;
	_config = config;
}
exports.start = function () {
	const {cronJobPeriodInMins} = _config;
	const cronJobExpression = `*/${cronJobPeriodInMins} * * * *`;
	cron.schedule(cronJobExpression, function () {
		_emitter.emit("period");
	});
};
