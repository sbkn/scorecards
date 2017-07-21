import moment from "moment";
import S3Handler from "../aws/s3-handler.es6";

export default class SaveScorecard {

	/**
	 * Save data to S3.
	 * @param {Object} data Given data.
	 * @param {string?} data.date Date if present, if not will be set to current date.
	 * @returns {Promise} Resolves in case of success, rejects otherwise.
	 */
	static processEvent(data) {

		const updatedData = SaveScorecard._addDateIfMissing(data);

		let year;
		let month;
		try {
			year = SaveScorecard._getYear(updatedData);
			month = SaveScorecard._getMonth(updatedData);
		} catch (err) {
			return Promise.reject(err);
		}

		return S3Handler.saveJsonToS3(updatedData, year, month);
	}

	/**
	 * Add a date to given data if none is present.
	 * @param {Object} data Given data.
	 * @param {string?} data.date Date if present, if not will be set to current date.
	 * @returns {Object} Updated data.
	 * @private
	 */
	static _addDateIfMissing(data) {

		const updatedData = JSON.parse(JSON.stringify(data));

		if (!updatedData.date) {
			updatedData.date = moment().format();
		}

		return updatedData;
	}

	static _getYear(data) {

		if (data.date) {
			return moment(data.date).year();
		}

		throw new Error("data.date is missing");
	}

	static _getMonth(data) {

		if (data.date) {
			return moment(data.date).month() + 1;
		}

		throw new Error("data.date is missing");
	}
}
