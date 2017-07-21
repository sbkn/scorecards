import SaveScorecard from "./save-scorecard.es6";

const index = (event, context, callback) => {

	console.log("Event:", JSON.stringify(event, null, 2));

	SaveScorecard.processEvent(event.body)
		.then(response => callback(null, response))
		.catch(err => {
			console.error(err);
			const errorObj = {
				success: false
			};
			callback(JSON.stringify(errorObj));
		});

};

module.exports = {
	index
};
