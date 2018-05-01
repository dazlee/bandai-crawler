const express = require("express");
const router = express.Router();
const {
	getAllBandaiStocks,
	createBandaiStock,
	updateBandaiStockById,
	removeBandaiStockById,
	getBandaiStockById
} = require("../stores/bandai-stock");

router.get("/", async function (req, res) {
	const bandaiStocks = await getAllBandaiStocks();
	res.render("pages/bandai-stocks", {
		bandaiStocks
	});
});

router.get("/new", async function (req, res) {
	res.render("pages/new-bandai-stock", {
	});
});
router.post("/new", async function (req, res) {
	const {user} = req;
	let attributes = {
		name,
		url,
		notifyEmails,
	} = req.body;
	attributes.createdBy = user.username;
	await createBandaiStock(attributes);
	res.redirect("/bandai-stock");
});

router.get("/:bandaiStockId/edit", async function (req, res) {
	const {bandaiStockId} = req.params;

	const bandaiStock = await getBandaiStockById(bandaiStockId);

	res.render("pages/edit-bandai-stock", {
		bandaiStock
	});
});
router.post("/:bandaiStockId/edit", async function (req, res) {
	const {bandaiStockId} = req.params;
	let attributes = {
		name,
		url,
		notifyEmails,
	} = req.body;
	await updateBandaiStockById(bandaiStockId, attributes);
	res.redirect("back");
});
router.get("/:bandaiStockId/delete", async function (req, res) {
	const {bandaiStockId} = req.params;
	await removeBandaiStockById(bandaiStockId);
	res.redirect("back");
});


module.exports = router;
