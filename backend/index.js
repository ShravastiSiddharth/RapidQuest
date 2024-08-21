const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
