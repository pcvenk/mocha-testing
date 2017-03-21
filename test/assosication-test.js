const assert = require('assert');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');
const User = require('../src/user');

describe('Data associations', () => {
   let joe, blogPost, comment;

    beforeEach((done) =>{
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'Post Title', content: 'This really is a nice post'});
        comment = new Comment({content: 'Tottaly agree!'});

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it.only('Saves a relation between a user and a post', (done) => {
        User.findOne({name: 'Joe'})
            .then((user) => {
                console.log(user);
                done();
            })
    });
});

