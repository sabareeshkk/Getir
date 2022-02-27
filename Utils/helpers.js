/**
* this function give the query for mongodb to find records
* @param {Object} params filtering conditons
* @returns {Array} the array of query pipeline parameters
*/
const findRecords = (params) => ([
    { $unwind: "$counts" },
    {
        $match: {
            createdAt: {
                $gte: new Date(params.startDate),
                $lte: new Date(params.endDate)
            }
        }
    },
    {
        $group: {
            _id: '$key',
            // key: '$key',
            createdAt: { $first: "$createdAt" },
            totalCount: { $sum: "$counts" }
        }
    },
    {
        $match: {
            totalCount: {
                $gte: params.minCount,
                $lte: params.maxCount
            }
        }
    },
    { $project: { _id: 0, key: "$_id", totalCount: 1, createdAt: 1 } }
])

module.exports = {
    findRecords
}