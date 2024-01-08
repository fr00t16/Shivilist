const Table = require("cli-table");
const { logger, randomSleep } = require("./libs/utils");
const Action = require("./libs/action");

(async () => {
	console.log("SHOPEE LIVE BOT");
	console.log("Created by: An - Halim Faizal R");
	console.log(`Version: ${require("./package.json").version}`);
	console.log("Feature: ");
	console.log("1. Auto Pin Product");
	console.log("2. Auto Fake VOC (Lelang)");
	console.log("3. Auto Get Sales\n");

	let askedItems = "";

	const action = new Action();

	// Check User Login
	logger("Checking User Login...");
	let checkUserLogin = await action.checkAccountInfo();
	if (checkUserLogin?.userName) {
		logger(`User Login: ${checkUserLogin.userName}`);
	} else {
		logger("User Not Login");
		process.exit();
	}

	action.sessionID = await action.getSession();

	while (true) {
		try {
	
            logger(`Start Fake Voc (aution)...`);
            let FakeVOCresponse = await action.FakeVOC(
                JSON.stringify({
                    title: 'Voucher',
                    rule: 1,
                    participation: 1,
                    timer: 60,
                    price: '100000',
                })
            );

            logger(FakeVOCresponse.err_msg);

			logger("Geting Requested Items...");

			let requestedItems = await action.getRequestedItems();

			let table = new Table({
				head: ["Item Name", "Request By", "Request Count"],
				colWidths: [20, 15, 15],
			});

			table.push(
				...requestedItems.map((item) => {
					return [item.name, item.ask_username, item.ask_count];
				})
			);

			console.log(table.toString());

			let lastItemTime = requestedItems
				.map((item) => {
					return item.ask_time;
				})
				.sort((a, b) => {
					return b - a;
				})[0];

			let item = requestedItems.find((item) => {
				return item.ask_time === lastItemTime;
			});

			if (askedItems?.item_id !== item?.item_id) {
				logger("New Item Requested");
				askedItems = item;
				logger("Pin Item..." + item.name.slice(0, 20));
				let pinNewItem = await action.pinItem(
					JSON.stringify({ item: JSON.stringify(item) })
				);
				logger(pinNewItem.err_msg);
			}
			await action.getSales();
			await sleep(71000);
		} catch (error) {
			logger(error);
		}
	}
})();
