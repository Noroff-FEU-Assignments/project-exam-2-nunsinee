export const converTime = (time) => {
	return new Date(time).toLocaleDateString("en-GB", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

//Date: 2022-03-17T11:25:11
