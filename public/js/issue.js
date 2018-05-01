$(function () {
	function showAlert(message) {
		alert(message);
	}

	var shouldReload;
	var clipboard1 = new Clipboard('#new-issue-modal .copy-issue-url-button', {
		container: document.getElementById('new-issue-modal')
	});
	var clipboard2 = new Clipboard('#edit-issue-modal .copy-issue-url-button', {
		container: document.getElementById('edit-issue-modal')
	});
	clipboard1.on('success', showAlert.bind(this, "已複製連結"));
	clipboard2.on('success', showAlert.bind(this, "已複製連結"));

	var newIssueQrcode = new QRCode($("#new-issue-modal #qrcode-holder").get(0), "");
	var editIssueQrcode = new QRCode($("#edit-issue-modal #qrcode-holder").get(0), "");

	$("#new-issue-button").on("click", function (e) {
		const body = {
			category: e.target.dataset.category
		};
		$.ajax({
			url: "/api/issues",
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify(body),
			contentType: 'application/json; charset=utf-8',
			success: function(data, status) {
				var issue = data.issue;
				var siteUrl = $("#new-issue-modal #issue-upload-url").data("siteUrl");
				var uploadUrl = siteUrl + "/is/upload/" + issue._id;

				$("#new-issue-modal #issue-number").html(issue.number);
				$("#new-issue-modal #issue-qrcode").attr("download", issue.number + ".png");
				$("#new-issue-modal #issue-upload-url").get(0).dataset.clipboardText = uploadUrl;
				$("#new-issue-modal #issue-form").data("issueid", issue._id);
				newIssueQrcode.clear();
				newIssueQrcode.makeCode(uploadUrl);
			},
			error: function (xhr, textStatus, error) {
				console.error("[issue.js]", error);
			}
		});
	});
	$('#new-issue-modal').on('hidden.bs.modal', function () {
		location.reload();
	});
	$('#edit-issue-modal').on('hidden.bs.modal', function () {
		if (shouldReload) {
			location.reload();
		}
	});
	$('#new-issue-modal').on('shown.bs.modal', function () {
		shouldReload = false;
	});
	$(".edit-issue-button").on("click", function (e) {
		e.preventDefault();
		var button = $(e.target);
		var issueid = button.data("issueid");
		var uploadUrl = button.data("uploadUrl");
		var viewUrl = button.data("viewUrl");
		var username = button.data("username");
		var number = button.data("number");
		var imagePath = button.data("imagePath") || "";

		$("#edit-issue-modal #issue-number").html(number + " (" + username + ")");
		$("#edit-issue-modal #issue-qrcode").attr("download", number + ".png");
		$("#edit-issue-modal #issue-upload-url").get(0).dataset.clipboardText = uploadUrl;
		$("#edit-issue-modal #issue-view-url").get(0).dataset.clipboardText = viewUrl;
		$("#edit-issue-modal #issue-form").data("issueid", issueid);
		$("#edit-issue-modal #issue-image").attr("src", imagePath);
		if (!imagePath) {
			$("#edit-issue-modal #issue-image").addClass("hidden");
		} else {
			$("#edit-issue-modal #issue-image").removeClass("hidden");
		}
		$("#edit-issue-modal #issue-username").val(username);

		editIssueQrcode.clear();
		editIssueQrcode.makeCode(uploadUrl);
	});

	$("form.issue").on("submit", function (e) {
		var form = e.target;
		e.preventDefault();
		var issueid = $(form).data("issueid");
		var body = generateBody(form);

		$.ajax({
			url: "/api/issues/" + issueid,
			type: 'PATCH',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(body),
			success: function(data, status) {
				console.log("ok");
				alert('更新完成!');
				shouldReload = true;
			},
			error: function (xhr, textStatus, error) {
				console.error("[issue.js] form.issue", error);
			}
		});
	});

	$(document).on("click", "#issue-qrcode", function (e) {
		var button = e.target;
		var target = button.dataset.target;
		var url = $(target).children("img").prop("src").replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
		button.href = url;
	});
});
