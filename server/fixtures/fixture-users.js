const UserModel = require("../models/user");
const { users } = require("./fixtures");
const {getSaltHashPassword} = require("ljit-salt-hash-password");

async function createUserDocuments () {
	try {
		try {
			let user, userAttributes, password, salt;
			for (let i = 0; i < users.length; i++) {
				user = users[i];
				({password, salt} = getSaltHashPassword(user.password));
				userAttributes = {
					username: user.username,
					password, salt,
					role: user.role,
					status: user.status,
					displayName: user.displayName
				};
				await UserModel.create(userAttributes);
			}
		} catch (error) {
			console.log("[error] user document ", error);
		}
	} catch (error) {
		console.log("[error] user document ", error);
	}
}

async function initUsers() {
	try {
		await createUserDocuments();
		return Promise.resolve();
	} catch (error) {
		console.log("[error] user fixture", error);
	}
}

exports.init = initUsers;
