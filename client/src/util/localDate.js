export const localDate = (date) => {
	return new Date(date).toLocaleDateString('en-gb', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};
