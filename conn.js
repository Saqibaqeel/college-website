const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Register', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connection successful");
}).catch((e) => {
    console.log("Failed to connect", e);
});
