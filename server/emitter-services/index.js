const ServiceLocator = require("ljit-lib/service-locator");
const locator = new ServiceLocator();

locator.register("bandai-stock", require("./bandai-stock"));

module.exports = locator;
