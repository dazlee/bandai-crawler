const logger = require("ljit-logger");
const fetch = require("fetch-everywhere");
const { checkStatus } = require("ljit-lib/fetch-utils");
const { getAllBandaiStocks, updateBandaiStockById } = require("../stores/bandai-stock");

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: "daz.lee1987@gmail.com",
		pass: "bttfvpfgkogrfhul"
	}
});

exports.subscribe = function (emitter) {
	emitter.on("period", async function() {
		const bandaiStocks = await getAllBandaiStocks();
		for (let i = 0, {length} = bandaiStocks; i < length; i++) {
			try {
				let bandaiStock = bandaiStocks[i];
				const status = await checkBandaiStatus(bandaiStock.url);
				if (bandaiStock.status !== status) {
					let attributes = { status };
					if (status === "IN_STOCK") {
						attributes.lastInStockAt = new Date();
					}
					if (status === "OUT_OF_STOCK") {
						attributes.lastOutOfStockAt = new Date();
					}
					bandaiStock = await updateBandaiStockById(bandaiStock._id, attributes);
					sendEmail(bandaiStock);

					console.log(bandaiStock);
				}
			} catch (error) {
				logger.error(error.stack);
			}
		}
	});
}

async function checkBandaiStatus(url) {
	const res = await fetch(url, {
		method: "GET"
	});
	checkStatus(res);
	const html = await res.text();
	const hasStock = html.indexOf("全部沒有在庫") === -1;
	return hasStock ? "IN_STOCK" : "OUT_OF_STOCK";
}

function sendEmail(bandaiStock) {
	const stockWord = bandaiStock.status === "IN_STOCK" ? "有庫存！" : "庫存沒了！";
	let mailOptions = {
		from: 'bitcrawler <daz.lee1987@gmail.com>',
		to: "daz.lee1987@gmail.com",
		subject: `${bandaiStock.name} ${stockWord}`,
		html: `${bandaiStock.name} ${stockWord}</br>時間：${new Date()}</br>網址：${bandaiStock.url}`
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
	});
}
