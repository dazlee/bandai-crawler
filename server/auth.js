const logger = require("ljit-logger");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy
	, ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require('jsonwebtoken');

const { getUserById, getUser, getUserWithPriviledge } = require("./stores/user");
const config = require("./config").get();

initializeLocalStrategy();
initializeJWTStrategy();

exports.initialize = function () {
	return passport.initialize();
};
exports.session = function () {
	return passport.session();
};
exports.localAuthenticate = function (req, res, next, callback) {
	passport.authenticate("local", callback)(req, res, next);
};
exports.jwtAuthenticate = function () {
	return passport.authenticate("jwt", config.jwtSession);
};

exports.validateMobileLogin = async function (req, res, next) {
	const { username, password } = req.body;
	if (username && password) {
		try {
			const user = await getUserWithPriviledge({username});
			if (!user) {
				invalidUser(res);
				return;
			}
			if (!user.validPassword(password)) {
				invalidUser(res);
				return;
			}

			var payload = {
				id: user._id
			};
			const token = jwt.sign(payload, config.jwtSecret, {
				expiresIn: 86400
			});
			const returnUser = await getUser({username});
			req.user = returnUser;
			req.jwt_token = token;
			next();
		} catch (error) {
			logger.error("[server/auth.js]", error);
			invalidUser(res, error);
		}
	} else {
		invalidUser(res);
	}
};

function invalidUser(res, error) {
	const _error = error || {
		reason: "invalid",
		message: "username or password is incorrect"
	};
	res.status(401);
	res.set("Content-Type", "application/json");
	res.send(JSON.stringify(_error));
}

function initializeLocalStrategy () {
	passport.use(new LocalStrategy(
		async function(username, password, done) {
			try {
				const user = await getUserWithPriviledge({ username: username });
				if (!user) {
					return done(null, false, { message: 'Incorrect username.' });
				}
				if (!user.validPassword(password)) {
					return done(null, false, { message: 'Incorrect password.' });
				}
				const returnUser = {
					_id: user._id,
					username: user.username,
					role: user.role,
					photos: user.photos,
				};
				return done(null, returnUser);
			} catch (error) {
				return done(error);
			}
		}
	));

	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});
	passport.deserializeUser(async function(_id, done) {
		try {
			const user = await getUserById(_id);
			if (user) {
				done(null, user);
			} else {
				done({
					reason: "user_not_found",
					message: "No such user"
				}, null);
			}
		} catch (error) {
			done(error, null);
		}
	});
}
function initializeJWTStrategy() {
	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
		secretOrKey: config.jwtSecret
	};
	const mobileStrategy = new JwtStrategy(options, async function (jwt_payload, done) {
		try {
			const user = await getUserById(jwt_payload.id);
			if (user) {
				return done(null, user);
			} else {
				return done({
					reason: "user_not_found",
					message: "No such user"
				}, null);
			}
		} catch (error) {
			return done(error, null);
		}
	});
	passport.use(mobileStrategy);
}
