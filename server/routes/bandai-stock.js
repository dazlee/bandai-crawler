const express = require("express");
const router = express.Router();
const {
	getAllBandaiStocks,
	createBandaiStock,
	updateBandaiStockById,
	removeBandaiStockById,
	getBandaiStockById
} = require("../stores/bandai-stock");
const csv = require("fast-csv");
const fs = require("fs");
const formidable = require("formidable");

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

const headers = [
	"name",
	"url",
];
router.post("/new/csv", async function (req, res) {
	try {
		var form = new formidable.IncomingForm();
		form.uploadDir = "./tmp";
		form.parse(req, function(error, fields, files) {
			if(error) {
				console.log("error", error);
				res.status(400).json(error.stack).end();
				return;
			}

			const {user} = req;
			const stream = fs.createReadStream(files.file.path);
			let bandaiStocks = [];

			csv.fromStream(stream, {headers})
			.on("data", function(data){
				try {
					bandaiStocks.push(data);
				} catch (error) {
					console.log("error", error);
					res.status(400).json(error.stack).end();
				}
			})
			.on("end", async function() {
				for (let i = 0, {length} = bandaiStocks; i < length; i++) {
					let bandaiStock = bandaiStocks[i];
					bandaiStock.notifyEmails = fields.notifyEmails;
					bandaiStock.createdBy = user.username;
					await createBandaiStock(bandaiStock);
				}
				res.redirect("/bandai-stock");
			});
		});
	} catch (error) {
		res.status(400).json(error.stack).end();
	}
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
