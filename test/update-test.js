const assert   = require('assert');
const User     = require('../src/user');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name: 'Joe', postCount: 0});
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

    it('Updating a model instance with the update method', (done) => {
        assertName(joe.update({name: 'Magnifico'}), done);
    });

    it('Updating model class (all instances matching the given criteria', (done) => {
        assertName(User.update({name: 'Joe'}, {name: 'Magnifico'}), done);
    });

    it('Updating model class (findByIdAndUpdate)', (done) => {
        assertName(User.findByIdAndUpdate(joe._id, {name: 'Magnifico'}), done);
    });

    it('Updating model class (findOneAndUpdate', (done) => {
        assertName(User.findOneAndUpdate({name: 'Joe'}, {name: 'Magnifico'}), done);
    });

    xit('Updating a model class property with the update operator', (done) => {
        //use of inc update operator
        User.update({name: 'Joe'}, {$inc: {postCount: 1}})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user.postCount === 1);
                done();
            });
    });
});