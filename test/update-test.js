const assert   = require('assert');
const User     = require('../src/user');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        joe.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Magnifico');
                done();
            });
    }

    it('Updating a model instance with set and save method', (done) => {
        joe.set('name', 'Magnifico');
        assertName(joe.save(), done);

    });

});