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

    function evaluateAssertion(operation, done){
        operation
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    }

    it('Remove a model instance', (done) => {
        evaluateAssertion(joe.remove(), done);
    });

    it('Remove class method', (done) => {
        evaluateAssertion(User.remove({name: 'Joe'}), done);
    });

    it('Remove method finddOneAndRemove', (done) => {
        evaluateAssertion(User.findOneAndRemove({name: 'Joe'}), done);
    });

    it('Remove method findByIdAndRemove', (done) => {
        evaluateAssertion(User.findByIdAndRemove(joe._id), done);
    });
});