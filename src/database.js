const mongoose = require('mongoose');
const db_ = process.env.DB_url

//console.log('esta es la base de datos de logs: ', db);

mongoose.connect(db_, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('db logs are connected 🥵🥵🥵🥵🥵🥵');
});