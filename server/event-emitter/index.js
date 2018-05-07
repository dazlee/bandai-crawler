const { EventEmitter } = require("events");

const emitter = new EventEmitter();
const events = [
	"period",
	"three-hours"
];

exports.emit = function(event, args) {
	if (events.indexOf(event) < 0) {
		throw new Error("[cronjob] event is not registerable for cronjob: \"" + event + "\"");
	}
	try {
		emitter.emit(event, args);
	} catch (error) {
		console.log(error.stack);
	}
}
exports.on = function (event, cb) {
	if (events.indexOf(event) < 0) {
		throw new Error("[cronjob] event is not registerable for cronjob: \"" + event + "\"");
	}

	emitter.on(event, cb);
}
