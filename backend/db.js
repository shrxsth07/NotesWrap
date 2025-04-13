const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/noteswrap?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1';

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
            console.log('coonected to Mongoose');
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = connectToMongo;