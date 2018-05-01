$(function () {
	$(".btn-range").on("click", onClickBtnRange);
	$("#lottery-select").on("change", onChangeLotterySelect);
	$("#lottery-debate").on("change", onChangeLotteryDebate);

	function onClickBtnRange (e) {
		e.preventDefault();
		var button = e.target;
		var range = button.dataset.range;
		var startDate = new Date(), endDate = new Date();
		switch (range) {
			case "today":
				startDate = moment().startOf('day').format("YYYY-MM-DD HH:mm");
				endDate = moment().endOf('day').format("YYYY-MM-DD HH:mm");
				break;
			case "yesterday":
				startDate = moment().subtract(1, "d").startOf('day').format("YYYY-MM-DD HH:mm");
				endDate = moment().subtract(1, "d").endOf('day').format("YYYY-MM-DD HH:mm");
				break;
			case "thismonth":
				startDate = moment().startOf('month').format("YYYY-MM-DD HH:mm");
				endDate = moment().endOf('month').format("YYYY-MM-DD HH:mm");
				break;
			default:
				break;
		}
		document.querySelector("#daterange-from").value = startDate;
		document.querySelector("#daterange-to").value = endDate;
	}

	function onChangeLotterySelect(e) {
		const select = e.target;
		var periodSelect = document.querySelector("#period-select");
		periodSelect.innerHTML = "";
		if (select.value) {
			var option = select.selectedOptions[0];
			var periods = [""].concat(JSON.parse(option.dataset.periods));
			periods.forEach(function (period) {
				var periodOption = getPeriodOptionDOM(period);
				periodSelect.appendChild(periodOption);
			});
			periodSelect.disabled = false;
		} else {
			periodSelect.disabled = true;
		}
	}
	function getPeriodOptionDOM(period) {
		var option = document.createElement("option");
		option.innerHTML = period;
		option.value = period;
		return option;
	}

	function onChangeLotteryDebate(e) {
		var input = e.target;
		var value = input.value || 0;
		var reward;
		if (value > 15) {
			input.value = 15;
			reward = 2000;
			alert("返點不能 > 15");
		} else if (value < 0) {
			input.value = 0;
			reward = 1700;
			alert("返點不能 < 0");
		} else {
			reward = 1700 + value*20;
		}
		document.querySelector("#lottery-reward-holder").innerHTML = reward;
		document.querySelector("#lottery-reward").value = reward;
	}
});
