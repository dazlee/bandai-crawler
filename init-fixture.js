const fixture = require("./server/fixtures");
fixture.init()
	.then(function () {
		console.log("done");
		process.exit();
	});
