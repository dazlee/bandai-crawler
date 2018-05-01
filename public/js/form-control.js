$(function () {
	$(".radio-wrapper input[type='radio']").on("change", onChangeRadio);
	$("form.qs").on("submit", onSubmitForm);
	$("form.qs-html").on("submit", onSubmitFormForHtml);
	$(".btn.qs-action").on("click", onClickQSActionButton);

	function onChangeRadio (e) {
		var input = e.target;
		var wrapper = input.parentNode;
		var upperWrapper = wrapper.parentNode;

		$(upperWrapper).find("label.active").removeClass("active");
		$(wrapper).addClass("active");
	}

	function onSubmitForm (e) {
		var form = e.target;
		e.preventDefault();

		var body = generateBody(form);
		$.ajax({
			url: form.action,
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(body),
			success: function() {
				location.reload();
			},
			error: function (xhr, textStatus, error) {
				console.error("[form-control] onSubmitForm", error);
			}
		});
	}
	function onSubmitFormForHtml (e) {
		var form = e.target;
		e.preventDefault();

		var body = generateBody(form);
		$.ajax({
			url: form.action,
			type: 'POST',
			dataType: 'html',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(body),
			success: function(html) {
				document.querySelector("#" + form.dataset.for).innerHTML = html;

				if ($._NotificationCenter) {
					$._NotificationCenter("html").publish();
				}
			},
			error: function (xhr, textStatus, error) {
				console.error("[form-control] onSubmitForm", error);
			}
		});
	}

	function onClickQSActionButton (e) {
		e.preventDefault();
		var button = e.target,
			dataset = button.dataset,
			method = dataset.method,
			action = dataset.action,
			id = dataset.for;
		var form = document.querySelector("#" + id);

		var body = generateBody(form);
		$.ajax({
			url: action,
			type: method,
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(body),
			success: function() {
				alert("完成", function () {
					location.reload();
				});
			},
			error: function (xhr, textStatus, error) {
				console.error("[form-control] onClickQSActionButton", error);
			}
		});
	}
});
