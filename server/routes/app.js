const express = require("express");
const router = express.Router();

router.get("/", async function (req, res) {
	res.redirect("/bandai-stock");
});

module.exports = router;
