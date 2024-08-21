const connectDB = require('../services/database');
const { ObjectId } = require('mongodb');


async function getNewCustomersOverTime(req, res) {
    const { interval, startDate, endDate } = req.body;
    const db = await connectDB();
    const collection = db.collection('shopifyCustomers');


    let dateFormat;
    switch (interval) {
        case 'yearly':
            dateFormat = "%Y";
            break;
        case 'monthly':
            dateFormat = "%Y-%m";
            break;
        case 'quarterly':
            additionalFields = {
                quarter: {
                    $ceil: { $divide: [{ $month: "$createdAtDate" }, 3] }
                }
            };
            break;
        default:
            dateFormat = "%Y-%m-%d";
    }


    let matchQuery = {};
    if (startDate || endDate) {
        matchQuery = {
            createdAtDate: {}
        };
        if (startDate) matchQuery.createdAtDate.$gte = new Date(startDate);
        if (endDate) matchQuery.createdAtDate.$lte = new Date(endDate);
    }

    const customers = await collection.aggregate([
        {
            $addFields: {
                createdAtDate: {
                    $dateFromString: {
                        dateString: { $substr: ["$created_at", 0, 19] },
                        format: "%Y-%m-%dT%H:%M:%S"
                    }
                }
            }
        },
        { $match: matchQuery }, 
        {
            $group: {
                _id: { $dateToString: { format: dateFormat, date: "$createdAtDate" } },
                newCustomers: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]).toArray();

    res.json(customers);
}

// async function getNewCustomersOverTime(req, res) {
//     const { interval, startDate, endDate } = req.body; 
//     const db = await connectDB();
//     const collection = db.collection('shopifyCustomers');

//     let dateFormat;
//     let additionalFields = {};

//     switch (interval) {
//         case 'yearly':
//             dateFormat = "%Y";
//             break;
//         case 'monthly':
//             dateFormat = "%Y-%m";
//             break;
//         case 'quarterly':
//             additionalFields = {
//                 quarter: {
//                     $ceil: { $divide: [{ $month: "$createdAtDate" }, 3] }
//                 }
//             };
//             break;
//         default:
//             dateFormat = "%Y-%m-%d";
//     }

//     let matchQuery = {};
//     if (startDate || endDate) {
//         matchQuery = {
//             createdAtDate: {}
//         };
//         if (startDate) matchQuery.createdAtDate.$gte = new Date(startDate);
//         if (endDate) matchQuery.createdAtDate.$lte = new Date(endDate);
//     }

//     const customers = await collection.aggregate([
//         {
//             $addFields: {
//                 createdAtDate: {
//                     $dateFromString: {
//                         dateString: { $substr: ["$created_at", 0, 19] },
//                         format: "%Y-%m-%dT%H:%M:%S"
//                     }
//                 },
//                 ...additionalFields
//             }
//         },
//         { $match: matchQuery }, // Filtering based on date range
//         {
//             $group: interval === 'quarterly' 
//                 ? {
//                     _id: {
//                         year: { $year: "$createdAtDate" },
//                         quarter: "$quarter"
//                     },
//                     newCustomers: { $sum: 1 }
//                 }
//                 : {
//                     _id: { $dateToString: { format: dateFormat, date: "$createdAtDate" } },
//                     newCustomers: { $sum: 1 }
//                 }
//         },
//         { $sort: { _id: 1 } },
//         interval === 'quarterly' 
//             ? {
//                 $project: {
//                     _id: {
//                         $concat: [
//                             { $toString: "$_id.year" },
//                             "-Q",
//                             { $toString: "$_id.quarter" }
//                         ]
//                     },
//                     newCustomers: 1
//                 }
//             }
//             : {}
//     ]).toArray();

//     res.json(customers);
// }




async function getRepeatCustomers(req, res) {
    const db = await connectDB();
    const collection = db.collection('shopifyCustomers');

    const repeatCustomers = await collection.aggregate([
        {
            $match: {
                orders_count: { $gt: 1 }
            }
        },
        {
            $addFields: {
                createdAtDate: {
                    $dateFromString: {
                        dateString: { $substr: ["$created_at", 0, 19] },
                        format: "%Y-%m-%dT%H:%M:%S"
                    }
                }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAtDate" } },
                repeatCustomers: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]).toArray();

    res.json(repeatCustomers);
}




async function getCustomerDistribution(req, res) {
    const db = await connectDB();
    const collection = db.collection('shopifyCustomers');

    const distribution = await collection.aggregate([
        {
            $group: {
                _id: "$default_address.city",
                count: { $sum: 1 }
            }
        },
        { $sort: { count: -1 } }
    ]).toArray();

    res.json(distribution);
}

async function getCustomerLifetimeValue(req, res) {
    const db = await connectDB();
    const collection = db.collection('shopifyCustomers');

    const lifetimeValue = await collection.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$createdAtDate" } },
                totalSpent: { $sum: { $toDouble: "$total_spent" } },
                customers: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]).toArray();

    res.json(lifetimeValue);
}


module.exports = {
    getNewCustomersOverTime,
    getRepeatCustomers,
    getCustomerDistribution,
    getCustomerLifetimeValue


};
