const {create, find, findOne} = require("../models/user") ;
const {getSaltHashPassword} = require("ljit-salt-hash-password");

const UserFields = "username role displayName status createdAt updatedAt";
const PrivilegedUserFields = "username password role salt displayName createdAt updatedAt";

function createUser(attributes) {
	const {password, salt} = getSaltHashPassword(attributes.password);
	const _attributes = Object.assign({}, attributes, {
		password, salt
	});
	return create(_attributes);
}

function getUserById(userId) {
	return findOne({
		_id: userId
	}, UserFields);
}
function getUserWithPriviledge(attributes) {
	return findOne(attributes, PrivilegedUserFields);
}
function getUser(attributes) {
	return findOne(attributes, UserFields);
}

module.exports = {
	createUser,

	getUserById,
	getUserWithPriviledge,
	getUser,
};
