

const connectDB = require('../services/database');

async function getTotalSales(req, res) {
  const db = await connectDB();
  const collection = db.collection('shopifyOrders');

  // Parse the interval from the query parameter
  const interval = req.query.interval || 'daily';

  // Define the date format and group stages based on the interval
  let dateFormat;
  let groupStage;

  switch (interval) {
    case 'monthly':
      dateFormat = "%Y-%m";
      groupStage = {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAtDate" } },
      };
      break;
    case 'quarterly':
      dateFormat = "%Y-Q%q"; // Quarters
      groupStage = {
        _id: {
          year: { $year: "$createdAtDate" },
          quarter: { $switch: {
              branches: [
                  { case: { $lte: [{ $month: "$createdAtDate" }, 3] }, then: "Q1" },
                  { case: { $lte: [{ $month: "$createdAtDate" }, 6] }, then: "Q2" },
                  { case: { $lte: [{ $month: "$createdAtDate" }, 9] }, then: "Q3" }
              ],
              default: "Q4"
            }
          }
        },
      };
      break;
    case 'yearly':
      dateFormat = "%Y";
      groupStage = {
        _id: { $dateToString: { format: "%Y", date: "$createdAtDate" } },
      };
      break;
    case 'daily':
    default:
      dateFormat = "%Y-%m-%d";
      groupStage = {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAtDate" } },
      };
      break;
  }

  const sales = await collection.aggregate([
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
