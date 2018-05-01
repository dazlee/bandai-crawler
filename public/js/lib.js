if (R) {
	var filterBy = R.curry(function (key, value, array) {
		return array.filter(function (item) {
			return getNestedPropertyByString(item, key) === value;
		});
	});
} else {
	console.error("no R");
}
function getNestedPropertyByString (o, s) {
	s = s.replace(/\[(\w+)\]/g, '.$1');
	s = s.replace(/^\./, '');
	var a = s.split('.');
	for (var i = 0, n = a.length; i < n; ++i) {
		var k = a[i];
		if (k in o) {
			o = o[k];
		} else {
			return;
		}
	}
	return o;
}
function getSeriesByAccessLogs(name, accessLogs) {
	var data = accessLogs.map(function (accessLog) {
		return [new Date(accessLog.date).getTime(), accessLog.count];
	});
	data.sort(function (a,b) {
		if(a[0] < b[0]) {
			return 1;
		} else if (a[0] > b[0]) {
			return -1;
		}
		return 0;
	});
	return {
		name: name,
		data: data
	};
}
function openDatetimeLineChart (target, title, series) {
	Highcharts.chart(target, {
        title: {
            text: title
        },
        xAxis: {
            type: "datetime"
        },

        yAxis: {
			title: {
				text: "次數"
			}
		},
        legend: {
            align: 'left',
            verticalAlign: 'top',
            y: 10,
            floating: true,
            borderWidth: 0
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                marker: {
                    lineWidth: 1
                }
            }
        },
        series: series
    });
}
