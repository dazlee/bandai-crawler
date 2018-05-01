$(function () {
	var fileuploadData;
	var issueForm = $("#issue-form");
	issueForm.fileupload({
		url: issueForm.prop("action"),
		dataType: 'json',
		disableImageResize: false,
		imageMaxWidth: 1000,
		imageMaxHeight: 1000,
		previewMaxWidth: 300,
		previewMaxHeight: 300,
		done: function (e, data) {
			location.reload();
		},
		fail: function (e, data) {
			alert("上传失败，请联络客服。");
		}
	})
	.bind("fileuploadadd", function (e, data) {
		fileuploadData = data;
		var file = data.files[0];
		$("#image-holder #title").html(file.name);
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function(){
			$("#image-holder #preview").css("background-image", "url("+this.result+")");
		}

		e.preventDefault();
	});

	$(document).on("submit", "#issue-form", function (e) {
		e.preventDefault();
		if (fileuploadData) {
			fileuploadData.submit();
		}
	});
});
