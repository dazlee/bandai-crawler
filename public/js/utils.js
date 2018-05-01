function generateBody (formDOM) {
	if (Qs) {
		var query = $(formDOM).serialize();
		var body = Qs.parse(query);
		return body;
	} else {
		throw new Error("missing Qs library");
	}
}
