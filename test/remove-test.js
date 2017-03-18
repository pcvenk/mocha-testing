const assert = require('assert');
const User   = require('../src/user');

describe('Deleting data from the DB', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        joe.save()
            .then(() => {
                done();
            });

    });

    it('Remove a model instance', (done) => {
        joe.remove()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('Remove class method', (done) => {
        User.remove({name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('Remove method finddOneAndRemove', (done) => {
       User.findOneAndRemove({name: 'Joe'})
           .then(() => User.findOne({_id: joe._id}))
           .then((user) => {
               assert(user === null);
               done();
           });
    });

    it('Remove method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({_id: joe._id}))
            .then((user) => {
                assert(user === null);
                done();
            });
    })
});