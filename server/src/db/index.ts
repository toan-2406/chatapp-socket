const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost/your-database-name';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error:Error) => {
    console.error('Error connecting to MongoDB:', error);
  });