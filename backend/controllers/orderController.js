const connectDB = require('../services/database');
const moment = require('moment-timezone');



async function getTotalSales(req, res) {
  const db = await connectDB();
  const collection = db.collection('shopifyOrders');

  const interval = req.query.interval || 'daily';
  const timeZone = req.query.timezone || 'UTC' ;

  let groupStage;

  switch (interval) {
    case 'monthly':
      groupStage = {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAtDate", timezone: timeZone } },
      };
      break;
    case 'quarterly':
      groupStage = {
        _id: {
          year: { $year: { date: "$createdAtDate", timezone: timeZone } },
          quarter: {
            $switch: {
              branches: [
                { case: { $lte: [{ $month: { date: "$createdAtDate", timezone: timeZone } }, 3] }, then: "Q1" },
                { case: { $lte: [{ $month: { date: "$createdAtDate", timezone: timeZone } }, 6] }, then: "Q2" },
                { case: { $lte: [{ $month: { date: "$createdAtDate", timezone: timeZone } }, 9] }, then: "Q3" }
              ],
              default: "Q4"
            }
          }
        },
      };
      break;
    case 'yearly':
      groupStage = {
        _id: { $dateToString: { format: "%Y", date: "$createdAtDate", timezone: timeZone } },
      };
      break;
    case 'daily':
    default:
      groupStage = {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAtDate", timezone: timeZone } },
      };
      break;
  }

  const sales = await collection.aggregate([
    {
      $addFields: {
        createdAtDate: {
          $dateFromString: {
            dateString: "$created_at", 
            format: "%Y-%m-%dT%H:%M:%S%z", 
          }
        }
      }
    },
    {
      $group: {
        ...groupStage,
        totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
      }
    },
    { $sort: { _id: 1 } }
  ]).toArray();

  res.json(sales);
}



module.exports = {
  getTotalSales,
};
