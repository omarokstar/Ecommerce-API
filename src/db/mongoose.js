const mongoose = require('mongoose');

const uri = process.env.MongoDb;
console.log('MongoDB URI:', uri); // Add this line to debug
console.log('ok')

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});



