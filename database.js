const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admine05@cluster0.37vb5.mongodb.net/app?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(db => console.log('Database conected')).catch(err => console.log(err))