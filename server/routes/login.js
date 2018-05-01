const express = require("express");
const router = express.Router();
const auth = require("../auth");

router.post("/", function (req, res, next) {
	auth.localAuthenticate(req, res, next, function (err, user) {
		if (err) { return next(err); }
		if (!user) {
			return res.render("login", {
				message: "帳號或密碼錯誤",
			});
		}
		req.logIn(user, function(err) {
			if (err) { return next(err); }
			return res.redirect("/");
		});
	});
});
router.get("/", function (req, res) {
	if (req.user) {
		return res.redirect("/");
	}
	res.render("login");
});

module.exports = router;
