const mongoose = require('mongoose');

const connectDB = async () => {
  try {

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Connection failed:', err));

mongoose.connection.on('connected', () => {
  console.log('Connected to the database');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to the database:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Database connection closed');
});

  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
