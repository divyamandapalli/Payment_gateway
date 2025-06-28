require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Define Mongoose Schema
const PaymentSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  cardName: String,
  cardNumber: String,
  expMonth: String,
  expYear: String,
  cvv: String,
  createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model("Payment", PaymentSchema);

// POST endpoint to save data
app.post('/api/payment', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json({ message: 'Payment data stored successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to store payment data.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
