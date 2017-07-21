import {expect} from "chai";
import Promise from "promise";
import sinon from "sinon";
import AWS from "aws-sdk";
import S3Handler from "../../src/aws/s3-handler.es6";

let sandbox;

describe("S3Handler", () => {

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
	});

	it("should build request correctly", done => {

		const data = {date: "foo"};

		sandbox.stub(AWS, "S3").callsFake(() => ({
			putObject: params => {

				expect(params.Key).to.equal(data.date);
				expect(params.Bucket).to.equal(process.env.BUCKET_SCORECARDS);
				expect(params.Body).to.deep.equal(data);
				expect(params.ContentType).to.deep.equal("application/json");

				return ({
					promise: () => (
						Promise.resolve({})
					)
				});
			}
		}));

		S3Handler.saveJsonToS3(data)
			.then(() => {
				done();
			})
			.catch(err => done(new Error(err)));
	});
});
