const httpStatus = require('http-status');
const express = require('express');
const { getDb } = require('../Utils/dbConn')
const { findRecords } = require('../Utils/helpers')

const router = express.Router();

/**
 * generates the success response
 * @param {Array} data 
 * @returns 
 */
const response = (data) => {
  return { code: 0, msg: 'success', records: data }
}

/**
 * @api {post} /v1/records Get records
 * @apiName GetRecords
 * @apiGroup RecordsApi
 *
 * @apiParamExample {json} Request Body Example:
 *     {
 *       "startDate": "2016-01-26",
 *       "endDate": "2018-02-02",
 *       "minCount": 2700,
 *       "maxCount": 3000
 *     }
 *
 * @apiSuccess {Number} code response code.
 * @apiSuccess {String} msg response message.
 * @apiSuccess {Array} records records
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *       "code": 0,
 *       "msg": "success",
 *       "records": [
 *         {
 *           "createdAt": "2016-04-17T01:06:48.972Z",
 *           "totalCount": 2942,
 *           "key": "MhXsNtaT"
 *        }
 *       ]
 *    }
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *    {
 *       "code": 404,
 *       "msg": "Not found",
 *     }
 * 
 * @apiExample {curl} Example usage:
 *     curl --location --request POST 'https://dry-island-28133.herokuapp.com/v1/records' \
 *          --header 'Content-Type: application/json' \
 *           --data-raw '{
 *                 "startDate": "2016-01-26",
 *                 "endDate": "2018-02-02",
 *                 "minCount": 2700,
 *                 "maxCount": 3000
 *           }'
 */
router.post('/records', async (req, res) => {
  const params = req.body
  const collection = getDb().collection('records');
  const result = await collection.aggregate(findRecords(params)).toArray();
  res.json(response(result));
});

module.exports = router;
