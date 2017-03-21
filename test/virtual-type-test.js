const assert = require('assert');
const User   = require('../src/user');

describe('Virtual types', () => {
    it('postCount represents the number of posts', (done) => {
        let joe = new User({
            name: 'Joe',
            posts: [{title: 'PostCount title'}]
        });

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user.postCount === 1);
                done();
        });
    });
});