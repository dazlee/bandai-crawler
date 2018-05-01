$(function () {
	var uplineUsernames = [];
	$(document).on("click", ".view-downline-user", onClickViewDownlineUser);
	$("#back-to-upline-user").on("click", onClickBackToUplineUser)

	function onClickViewDownlineUser(e) {
		e.preventDefault();
		var button = e.target;
		var uplineUsername = button.dataset.uplineusername;
		var username = button.dataset.username;
		if (submitProfitLossSearchForm(username)) {
			uplineUsernames.push(uplineUsername)

			updateBackToUplineUserButton();
		}

	}
	function onClickBackToUplineUser(e) {
		e.preventDefault();
		var username = uplineUsernames[uplineUsernames.length - 1];
		if (submitProfitLossSearchForm(username)) {
			uplineUsernames.pop();
			updateBackToUplineUserButton();
		}
	}

	function updateBackToUplineUserButton() {
		if (uplineUsernames.length === 0) {
			$("#back-to-upline-user").addClass("hidden");
		} else {
			$("#back-to-upline-user").removeClass("hidden");
		}
	}
	function submitProfitLossSearchForm(username) {
		var form = document.querySelector("#profit-loss-search-form");
		if (form) {
			var input = form.querySelector("#input-username");
			input.value = username;
			$(form).submit();
			return true;
		}
		return false
	}
})
