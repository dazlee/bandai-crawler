$(function () {
	$(".transfer-user-button").on("click", onClickTransferUserButton);

	function onClickTransferUserButton(e) {
		var button = e.target;
		var username = button.dataset.username;
		var uplineUsername = button.dataset.uplineusername;

		document.querySelector("#username-input").value = username;
		document.querySelector("#uplineUsername-input").value = uplineUsername;
		$("#transfer-user-form").submit();
	}
});
