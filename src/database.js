const mongoose = require('mongoose');
const db_ = process.env.DB_url

console.log('base de datos : ', db_);

mongoose.connect(db_, {
 
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', () => {
    console.log('db logs are connected 🥵🥵🥵🥵🥵🥵');
});
