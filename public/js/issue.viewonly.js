$(function () {
	function showAlert(message) {
		alert(message);
	}

	var clipboard = new Clipboard('#edit-issue-modal .copy-issue-url-button', {
		container: document.getElementById('edit-issue-modal')
	});
	clipboard.on('success', showAlert.bind(this, "已複製連結"));

	$(".edit-issue-button").on("click", function (e) {
		e.preventDefault();
		var button = $(e.target);
		var viewUrl = button.data("viewUrl");
		var username = button.data("username");
		var number = button.data("number");
		var imagePath = button.data("imagePath") || "";

		$("#edit-issue-modal #issue-number").html(number + " (" + username + ")");
		$("#edit-issue-modal #issue-view-url").get(0).dataset.clipboardText = viewUrl;
		$("#edit-issue-modal #issue-image").attr("src", imagePath);
		if (!imagePath) {
			$("#edit-issue-modal #issue-image").addClass("hidden");
		} else {
			$("#edit-issue-modal #issue-image").removeClass("hidden");
		}
	});
});
