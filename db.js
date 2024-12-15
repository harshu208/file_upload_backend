const mongoose = require('mongoose');
const MONGO_URI = require('./configs/db.json').MONGO_URI
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);

    }
};
module.exports = connectDB;