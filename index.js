const fetch = require("fetch-everywhere");
const { checkStatus } = require("ljit-lib/fetch-utils");

async function checkBandai(url) {
	try {
		const res = await fetch(url, {
			method: "GET"
		});
		checkStatus(res);
		const html = await res.text();
		const hasStock = html.indexOf("全部沒有在庫") === -1;
		if (hasStock) {
			console.log(url);
			console.log("有庫存\n");
		} else {
			console.log(url);
			console.log("沒有庫存\n");
		}
	} catch (error) {
		console.log(error);
	}
}

setInterval(function () {
	checkBandai("http://p-bandai.tw/chara/c0053/item-1100007736/");
	checkBandai("http://p-bandai.tw/chara/c0053/item-1100007130/");
	checkBandai("http://p-bandai.tw/chara/c0009/item-1100007780/");
}, 10000);
