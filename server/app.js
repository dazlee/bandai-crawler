const express = require("express");
const app = express();
const path = require("path");
const connectionLogger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const auth = require("./auth");
const session = require("./session");

app.use(connectionLogger("dev"));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
	secret: "secret"
}));
app.use(auth.initialize());
app.use(auth.session());
app.use(require("./middlewares/pug-extension"));
app.use(require('stylus').middleware( {
	src: path.join(__dirname, '../client'),
	dest: path.join(__dirname, '../public'),
	compress: true,
}));
app.use(express.static(path.join(__dirname, '../public')));

app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use(require("ljit-express-middlewares/check-login"));
app.use(require("ljit-express-middlewares/check-error"));
app.use("/", require("./routes/app"));
app.use("/bandai-stock", require("./routes/bandai-stock"));

// catch 404 and handle it
app.use(function (req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});


if (global.MODE === "local" || global.MODE === "development") {
	app.use(function (err, req, res) {
		res.status(err.status || 500);
		res.render("error", {
			message: err.message,
			error: err.stack,
		});
	});
}

module.exports = app;
