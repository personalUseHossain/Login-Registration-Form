const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Login", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('success'))
    .catch((err) => console.log(err));

module.exports = mongoose