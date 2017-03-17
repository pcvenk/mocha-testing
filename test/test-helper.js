const mongoose = require('mongoose');
const User     = require('../src/user');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/mocha');
    mongoose.connection
        .on('error', (error) => {
            console.warn(error);
        })
        .once('open', () => {
            console.log('Good to go');
            done();
        });
});

//empty db on every run of the test
// beforeEach((done) => {
//    mongoose.connection.collections.users.drop(() =>{
//        //Ready to run the next test!
//        done();
//    });
// });

beforeEach((done) => {
   User.remove({}, () => {
      done();
   });
});