import AWS from "aws-sdk";

export default class S3Handler {

	static saveJsonToS3(data) {

		const s3 = new AWS.S3({apiVersion: "2006-03-01", region: "eu-west-1"});

		const params = {
			Bucket: process.env.BUCKET_SCORECARDS,
			Key: data.date,
			Body: data,
			ContentType: "application/json"
		};

		console.log(params.Key);

		const putObjectPromise = s3.putObject(params).promise();

		return putObjectPromise
			.then(() => {
				console.log(`Successfully saved ${params.Key} to ${params.Bucket}.`);
			})
			.catch(err => {
				console.error(`Failed to save ${params.Key} to ${params.Bucket}, error: ${JSON.stringify(err)}.`);
			});
	}
}
