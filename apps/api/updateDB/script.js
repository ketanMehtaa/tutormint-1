const mongoose = require('mongoose');
const Course = require('../src/models/courseModel'); // Import your Course model

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://ketan:ketan@cluster0.nfjpfhs.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Remove the 'price' field from all documents
    return Course.updateMany({}, { $unset: { price: 1 } });
  })
  .then((result) => {
    console.log('Price field removed from existing documents:', result);
  })
  .catch((error) => {
    console.error('Error updating documents:', error);
  })
  .finally(() => {
    // Close the database connection
    mongoose.connection.close();
  });
