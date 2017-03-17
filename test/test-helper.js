const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mocha');
mongoose.connection
    .on('error', (error) => console.warn(error))
    .once('open', () => console.log('Good to go'));


// beforeEach((done) => {
//    mongoose.connection.collections.users.drop(() =>{
//        //Ready to run the next test!
//        done();
//    });
// });