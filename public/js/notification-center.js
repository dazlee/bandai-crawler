function __init_notification_center() {
	var _notificationCenters = {};
	$._NotificationCenter = function (id) {
		var callbacks, _notificationCenter = id && _notificationCenters[id];
		if (!_notificationCenter) {
			callbacks = $.Callbacks();
			_notificationCenter = {
				publish: callbacks.fire,
				subscribe: callbacks.add,
				unsubscribe: callbacks.remove
			};
			if (id) {
				_notificationCenters[id] = _notificationCenter;
			}
		}
		return _notificationCenter;
	};
}
__init_notification_center();
