const assert = require('assert');
const User   = require('../src/user');

describe('Query the user from the DB', () => {
    let joe, maria, maja, primoz, majcek;

    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        maria = new User({name: 'Maria'});
        maja = new User({name: 'Maja'});
        primoz = new User({name: 'Primoz'});
        majcek = new User({name: 'Majcek'});

        Promise.all([joe.save(), maria.save(), maja.save(), primoz.save(), majcek.save()])
            .then(() => done());
    });

    it('Find all the users by the name of Joe', (done) => {
        User.find({name: 'Joe'})
            .then((users) => {
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    });

    it('Finds all the users by the name of Joe', (done) => {
       User.findOne({_id: joe._id})
           .then((user) => {
               assert(user.name === 'Joe');
               done();
           });
    });

    it('Skip and limit search results', (done) => {
        User.find({})
            .sort({name: 1})
            .skip(2)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].name === 'Majcek');
                assert(users[1].name === 'Maria');
                done();
            });
    });
});
