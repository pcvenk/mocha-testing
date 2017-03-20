const assert = require('assert');
const User  = require('../src/user');

describe('Recrods validation', () => {
    it('Requires a user name', (done) => {
        const user = new User({name: undefined});
        const validationRes = user.validateSync();
        const {message} = validationRes.errors.name;

        assert(message === 'Name is required');
        done();
    });

    it('Requires a name longer than 2 characters', (done) => {
        const user = new User({name: 'Al'});
        const validationRes = user.validateSync();
        const {message} = validationRes.errors.name;

        assert(message === 'Name must be longer than 2 characters');
        done();
    });

    it('Disallows saving of an invalid record', (done) => {
        const user = new User({name: 'Al'});
        user.save()
            .then(() => console.log('User successfully saved!!!'))
            .catch((errMsg) => {
                const {message} = errMsg.errors.name;
                // console.log(errMsg);

                assert(message === 'Name must be longer than 2 characters');
                done();
            })
    });
});