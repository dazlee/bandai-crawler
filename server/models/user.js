const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {compareHashedPassword} = require("ljit-salt-hash-password");

const ModelSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: String,
	displayName: String,
	salt: String,
	role: {
		type: String,
		required: true,
		enum: ["admin", "member"]
	},
	status: {
		type: String,
		required: true,
		enum: ["away", "online", "busy", "offline"]
	},
}, {
	timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
});

ModelSchema.methods.validPassword = function (password) {
	return compareHashedPassword(this.password, password, this.salt);
};

const Model = mongoose.model("users", ModelSchema);

module.exports = {
	find: function (...theArgs) {
		return Model.find(...theArgs)
			.sort({createdAt: -1})
			.exec();
	},
	findPagination: function (limit = 15, skip = 0, ...theArgs) {
		return Model.find(...theArgs)
			.sort({createdAt: -1})
			.limit(limit)
			.skip(skip)
			.exec();
	},
	findOne: function (...theArgs) {
		return Model.findOne(...theArgs)
			.exec();
	},
	findLatestOne: function (...theArgs) {
		return Model.findOne(...theArgs)
			.sort({createdAt: -1})
			.exec();
	},
	findOneAndUpdate: function (...theArgs) {
		return Model.findOneAndUpdate(...theArgs)
			.exec();
	},
	findAndUpdate: function (...theArgs) {
		return Model.updateMany(...theArgs)
			.exec();
	},
	findFromCache: function (...theArgs) {
		return Model.find(...theArgs)
			.sort({createdAt: -1})
			.lean()
			.exec();
	},
	findPaginationFromCache: function (limit = 15, skip = 0, ...theArgs) {
		return Model.find(...theArgs)
			.sort({createdAt: -1})
			.limit(limit)
			.skip(skip)
			.lean()
			.exec();
	},
	findOneFromCache: function (...theArgs) {
		return Model.findOne(...theArgs)
			.lean()
			.exec();
	},
	findLatestOneFromCache: function (...theArgs) {
		return Model.findOne(...theArgs)
			.sort({createdAt: -1})
			.lean()
			.exec();
	},
	findOneAndUpdateFromCache: function (...theArgs) {
		return Model.findOneAndUpdate(...theArgs)
			.lean()
			.exec();
	},
	findAndUpdateFromCache: function (...theArgs) {
		return Model.updateMany(...theArgs)
			.lean()
			.exec();
	},
	findJoin: function (refs, ...theArgs) {
		const model = Model.find(...theArgs);

		refs.forEach(ref => {
			model.populate(ref);
		});

		return model.sort({createdAt: -1}).exec();
	},
	findOneJoin: function (refs, ...theArgs) {
		const model = Model.findOne(...theArgs);

		refs.forEach(ref => {
			model.populate(ref);
		});

		return model.sort({createdAt: -1}).exec();
	},
	findJoinFromCache: function (refs, ...theArgs) {
		const model = Model.find(...theArgs);

		refs.forEach(ref => {
			model.populate(ref);
		});

		return model.sort({createdAt: -1})
			.lean()
			.exec();
	},
	findOneJoinFromCache: function (refs, ...theArgs) {
		const model = Model.findOne(...theArgs);

		refs.forEach(ref => {
			model.populate(ref);
		});

		return model.sort({createdAt: -1})
			.lean()
			.exec();
	},
	create: function (...theArgs) {
		return Model.create(...theArgs);
	},
	insertMany: function (...theArgs) {
		return Model.insertMany(...theArgs);
	},
	remove: function (...theArgs) {
		return Model.remove(...theArgs);
	},
	aggregate: function (...theArgs) {
		return Model.aggregate(...theArgs);
	},
	ensureIndexes: function() {
		return Model.ensureIndexes();
	},
	// 沒事別用
	getInstance: function () {
		return Model;
	}
};
