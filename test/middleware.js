const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
    let joe, blogPost;

    //creating a new user and a blogpost
    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost(
            {
                title: 'JS is Great!',
                content: "Yuup, it really is!!!"
            }
        );
        //pushing the blogpost to the users array of blogposts
        joe.blogPosts.push(blogPost);

        //on completion call the done function
        Promise.all([joe.save(), blogPost.save()])
            .then(() => done());

        // console.log(joe);
    });

    it('Users blogpost clean up prior to remove', (done) => {
       joe.remove()
           .then(() => {
               return BlogPost.count()
           })
           .then((counter) => {
               assert(counter === 0);
               done();
           });
    });

});