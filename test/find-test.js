const assert = require('assert');
const User   = require('../src/user');

describe('Query the user from the DB', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        joe.save()
            .then(() => done());
    });

    it('Finds the user by the name of Joe', (done) => {
        User.findOne({name: 'Joe'})
            .then((user) => {
                console.log(user.name);
                done();
            });
    });
});
